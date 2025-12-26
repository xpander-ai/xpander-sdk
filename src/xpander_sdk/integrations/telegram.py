"""
Telegram integration for xpander SDK.

This module provides automatic handling of Telegram webhook data,
including message parsing, file downloads, voice transcription,
and response sending.
"""

import asyncio
import os
import re
import json
import base64
import aiohttp
from io import BytesIO
from typing import Any, Optional, TYPE_CHECKING
from loguru import logger

if TYPE_CHECKING:
    from xpander_sdk.modules.tasks.sub_modules.task import Task

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")


class TelegramContext:
    """
    Telegram context for handling webhook data and sending responses.

    This class is automatically populated when a Task contains Telegram
    webhook data. It provides methods for authentication callbacks,
    sending responses, and managing typing indicators.

    Attributes:
        chat_id (int): The Telegram chat ID.
        user_id (int): The Telegram user ID.
        input_text (str): The parsed message text.
        files (list): List of file objects for the agent.
        images (list): List of image objects for the agent.

    Example:
        >>> @on_task
        ... async def handler(task: Task):
        ...     if task.telegram:
        ...         result = await agent.arun(
        ...             input=task.telegram.input_text,
        ...             files=task.telegram.files,
        ...             images=task.telegram.images
        ...         )
        ...         await task.telegram.send_response(result)
    """

    def __init__(
        self,
        chat_id: int,
        user_id: int,
        input_text: str,
        files: list,
        images: list,
        bot_token: str,
    ):
        self.chat_id = chat_id
        self.user_id = user_id
        self.input_text = input_text
        self.files = files
        self.images = images
        self._bot_token = bot_token
        self._bot = None
        self._status_msg_ids: list[int] = []
        self._has_voice = False

    def _get_bot(self):
        """Lazy load the Telegram bot."""
        if self._bot is None:
            from telegram import Bot

            self._bot = Bot(token=self._bot_token)
        return self._bot

    async def send_typing(self):
        """Send typing indicator to the chat."""
        from telegram.constants import ChatAction

        try:
            await self._get_bot().send_chat_action(
                chat_id=self.chat_id, action=ChatAction.TYPING
            )
        except Exception as e:
            logger.error(f"Failed to send typing indicator: {e}")

    async def send_status(self):
        """Send typing or recording indicator based on voice state."""
        from telegram.constants import ChatAction

        action = ChatAction.RECORD_VOICE if self._has_voice else ChatAction.TYPING
        try:
            await self._get_bot().send_chat_action(chat_id=self.chat_id, action=action)
        except Exception as e:
            logger.error(f"Failed to send chat action: {e}")

    async def on_tool_start(self, tool):
        """Handle tool start event - show status message in chat."""
        tool_name = tool.tool_name or ""
        tool_args = tool.tool_args or {}
        if "payload" in tool_args:
            tool_args = tool_args["payload"]
        tool_title = tool_args.get("headers", {}).get("toolcallreasoningtitle")

        if tool_name.startswith("xpstart_"):
            emoji = "📋"
        elif tool_name.startswith("xpcomplete_"):
            emoji = "✅"
        elif tool_name.startswith("mcp_tool_"):
            emoji = "🔧"
            if not tool_title:
                service_name = tool_name.replace("mcp_tool_", "").split("-")[0].title()
                tool_title = f"Using {service_name}"
        elif "memory" in tool_name.lower():
            emoji = "🧠"
            if not tool_title:
                tool_title = "Updating memory"
        elif "search" in tool_name.lower():
            emoji = "🔍"
            if not tool_title:
                tool_title = "Searching"
        elif tool_title:
            emoji = "💭"
        else:
            emoji = "🔧"

        if any(x in tool_name.lower() for x in ["speech", "voice", "tts", "audio"]):
            self._has_voice = True

        if tool_title:
            try:
                msg = await self._get_bot().send_message(
                    chat_id=self.chat_id, text=f"{emoji} {tool_title}"
                )
                self._status_msg_ids.append(msg.message_id)
            except Exception as e:
                logger.warning(f"Failed to send tool status message: {e}")

        await self.send_status()

    async def cleanup_status_messages(self):
        """Delete all status messages."""
        for msg_id in self._status_msg_ids:
            try:
                await self._get_bot().delete_message(
                    chat_id=self.chat_id, message_id=msg_id
                )
            except Exception:
                pass
        self._status_msg_ids = []

    async def auth_callback(self, _agent, _task, event):
        """Handle MCP OAuth authentication events."""
        if event.data and hasattr(event.data, "url"):
            from telegram import InlineKeyboardButton, InlineKeyboardMarkup

            auth_url = event.data.url
            server_name = getattr(event.data, "server_name", "MCP Server")
            keyboard = InlineKeyboardMarkup(
                [[InlineKeyboardButton(text=f"🔐 Login to {server_name}", url=auth_url)]]
            )
            await self._get_bot().send_message(
                chat_id=self.chat_id,
                text=f"🔑 Authentication required for <b>{server_name}</b>\n\nPlease click the button below to login:",
                parse_mode="HTML",
                reply_markup=keyboard,
            )

    async def send_response(self, result, voice_data: str | None = None):
        """
        Send the agent response to Telegram.

        Args:
            result: The agent run result containing content.
            voice_data: Optional base64-encoded voice audio data.
        """
        from telegram import InlineKeyboardButton, InlineKeyboardMarkup

        await self.cleanup_status_messages()

        if result is None:
            return

        content = result.content
        if isinstance(content, str):
            content = {"text": content}
        elif hasattr(content, "model_dump"):
            content = content.model_dump()
        if isinstance(content, dict) and "result" in content:
            content = content["result"]

        voice = voice_data or (
            content.get("voice_url") if isinstance(content, dict) else None
        )

        text = content.get("text", "") if isinstance(content, dict) else str(content)
        buttons = content.get("buttons") if isinstance(content, dict) else None
        keyboard = None

        if buttons:
            kb = []
            for btn in buttons:
                if url := btn.get("url"):
                    kb.append([InlineKeyboardButton(text=btn.get("text", ""), url=url)])
                elif cb := btn.get("callback_data"):
                    kb.append(
                        [
                            InlineKeyboardButton(
                                text=btn.get("text", ""), callback_data=cb
                            )
                        ]
                    )
            keyboard = InlineKeyboardMarkup(kb) if kb else None

        if voice:
            caption = text if len(text) <= 1024 else None

            if not voice.startswith("http"):
                try:
                    await self._get_bot().send_voice(
                        chat_id=self.chat_id,
                        voice=BytesIO(base64.b64decode(voice)),
                        caption=caption,
                        parse_mode="HTML" if caption else None,
                        reply_markup=keyboard if not caption else None,
                    )
                except Exception as e:
                    logger.error(f"Failed to send voice: {e}")
            elif voice.endswith((".ogg", ".oga")):
                try:
                    await self._get_bot().send_voice(
                        chat_id=self.chat_id,
                        voice=voice,
                        caption=caption,
                        parse_mode="HTML" if caption else None,
                        reply_markup=keyboard if not caption else None,
                    )
                except Exception as e:
                    logger.error(f"Failed to send voice URL: {e}")
            else:
                try:
                    await self._get_bot().send_audio(
                        chat_id=self.chat_id,
                        audio=voice,
                        caption=caption,
                        parse_mode="HTML" if caption else None,
                        reply_markup=keyboard if not caption else None,
                    )
                except Exception as e:
                    logger.error(f"Failed to send audio URL: {e}")

            if len(text) > 1024:
                try:
                    await self._get_bot().send_message(
                        chat_id=self.chat_id,
                        text=text,
                        parse_mode="HTML",
                        reply_markup=keyboard,
                    )
                except Exception:
                    await self._get_bot().send_message(
                        chat_id=self.chat_id,
                        text=re.sub(r"<[^>]+>", "", text),
                        reply_markup=keyboard,
                    )
        elif text:
            try:
                await self._get_bot().send_message(
                    chat_id=self.chat_id,
                    text=text,
                    parse_mode="HTML",
                    reply_markup=keyboard,
                )
            except Exception:
                await self._get_bot().send_message(
                    chat_id=self.chat_id,
                    text=re.sub(r"<[^>]+>", "", text),
                    reply_markup=keyboard,
                )


async def parse_telegram_webhook(
    task: "Task",
    bot_token: str | None = None,
    speech_to_text_fn: Any = None,
) -> TelegramContext | None:
    """
    Parse Telegram webhook data from a task and prepare it for agent execution.

    This function detects if the task input contains Telegram webhook data,
    parses it, downloads any files, transcribes voice messages, and returns
    a TelegramContext with all the prepared data.

    Args:
        task: The xpander Task object.
        bot_token: Optional Telegram bot token. Defaults to TELEGRAM_BOT_TOKEN env var.
        speech_to_text_fn: Optional function for voice transcription.
            Should accept a data URL and return {'success': bool, 'result': str}.

    Returns:
        TelegramContext if the task contains Telegram data, None otherwise.

    Example:
        >>> telegram = await parse_telegram_webhook(task)
        >>> if telegram:
        ...     result = await agent.arun(input=telegram.input_text, ...)
        ...     await telegram.send_response(result)
    """
    token = bot_token or TELEGRAM_BOT_TOKEN
    if not token:
        return None

    raw = task.input.text
    if not raw:
        return None

    if isinstance(raw, dict):
        data = raw
    elif isinstance(raw, str):
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return None
    else:
        return None

    if not isinstance(data, dict) or "update_id" not in data or "message" not in data:
        return None

    # It's a Telegram message - process it
    message = data["message"]
    chat_id = message.get("chat", {}).get("id")
    user_id = message.get("from", {}).get("id")

    # Validate required fields - chat_id is essential for sending responses
    if chat_id is None:
        logger.warning("Telegram webhook missing chat_id, cannot process")
        return None

    input_text = message.get("text") or message.get("caption") or ""

    # Collect file IDs from various message types
    file_keys = ["photo", "document", "voice", "audio", "video", "video_note"]
    files_to_process = []
    for key in file_keys:
        if key in message:
            item = message[key][-1] if key == "photo" else message[key]
            if fid := (item.get("file_id") if item else None):
                files_to_process.append((fid, key))

    # Download files - for voice messages, transcribe automatically
    if files_to_process:
        async with aiohttp.ClientSession() as session:
            for file_id, msg_type in files_to_process:
                async with session.get(
                    f"https://api.telegram.org/bot{token}/getFile",
                    params={"file_id": file_id},
                ) as resp:
                    resp_data = await resp.json()
                    if resp.status == 200 and resp_data.get("ok"):
                        file_path = resp_data["result"]["file_path"]
                        original_file_url = (
                            f"https://api.telegram.org/file/bot{token}/{file_path}"
                        )
                        ext = (
                            file_path.split(".")[-1].lower() if "." in file_path else ""
                        )

                        # If photo has no extension, add .jpg so categorize_files recognizes it
                        if msg_type == "photo" and ext not in (
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "bmp",
                            "tiff",
                            "webp",
                        ):
                            file_url = f"{original_file_url}.jpg"
                        else:
                            file_url = original_file_url

                        # For voice/audio, download and transcribe automatically
                        if speech_to_text_fn and (
                            ext in ("ogg", "oga", "mp3", "wav", "m4a", "opus")
                            or msg_type in ("voice", "audio")
                        ):
                            async with session.get(original_file_url) as file_resp:
                                if file_resp.status == 200:
                                    audio_content = await file_resp.read()
                                    mime_type = {
                                        "ogg": "audio/ogg",
                                        "oga": "audio/ogg",
                                        "mp3": "audio/mpeg",
                                        "wav": "audio/wav",
                                        "m4a": "audio/mp4",
                                        "opus": "audio/opus",
                                    }.get(ext, "audio/ogg")
                                    b64_data = base64.b64encode(audio_content).decode(
                                        "utf-8"
                                    )
                                    data_url = f"data:{mime_type};base64,{b64_data}"
                                    # Handle both sync and async speech_to_text functions
                                    try:
                                        if asyncio.iscoroutinefunction(speech_to_text_fn):
                                            result = await speech_to_text_fn(data_url)
                                        else:
                                            result = speech_to_text_fn(data_url)
                                        # Validate result is a dict before accessing
                                        if isinstance(result, dict) and result.get("success") and result.get("result"):
                                            transcription = result["result"]
                                            voice_text = (
                                                f"[Voice message transcription]: {transcription}"
                                            )
                                            if input_text:
                                                input_text = f"{input_text}\n\n{voice_text}"
                                            else:
                                                input_text = voice_text
                                        else:
                                            error_msg = result.get("error") if isinstance(result, dict) else "Invalid result format"
                                            logger.error(f"Failed to transcribe: {error_msg}")
                                    except Exception as e:
                                        logger.error(f"Speech-to-text error: {e}")
                        else:
                            if task.input.files is None:
                                task.input.files = []
                            task.input.files.append(file_url)

    # Update task with processed input text
    task.input.text = input_text

    # Get files/images now (before aget_args potentially resets task.input.files)
    files = task.get_files()
    images = task.get_images()

    # Create context and send typing indicator
    ctx = TelegramContext(chat_id, user_id, input_text, files, images, token)
    await ctx.send_typing()

    return ctx
