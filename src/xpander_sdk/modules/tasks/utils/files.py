import base64
import mimetypes
from typing import List
from urllib.parse import urlparse
import os
from pydantic import BaseModel
import httpx
import asyncio

class FileCategorization(BaseModel):
    images: List[str]
    pdfs: List[str]
    files: List[str]


def categorize_files(file_urls: list[str]) -> FileCategorization:
    """
    Categorize a list of file URLs into images, PDFs, and human-readable files
    based on file extensions. Does not load the files.

    Args:
        file_urls (list[str]): List of file URLs

    Returns:
        FileCategorization: Pydantic model with categorized URLs
    """
    image_exts = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp", ".svg"}
    pdf_exts = {".pdf"}
    human_readable_exts = {
        ".txt", ".csv", ".json", ".xml", ".html", ".htm",
        ".md", ".rst", ".yaml", ".yml",
        ".py", ".js", ".ts", ".java", ".c", ".cpp", ".h", ".cs", ".go", ".rb", ".php", ".sh"
    }

    result = {"images": [], "pdfs": [], "files": []}

    for url in file_urls:
        path = urlparse(url).path
        _, ext = os.path.splitext(path.lower())

        if ext in image_exts:
            result["images"].append(url)
        elif ext in pdf_exts:
            result["pdfs"].append(url)
        elif ext in human_readable_exts:
            result["files"].append(url)

    return FileCategorization(**result)

async def fetch_urls(urls: list[str]) -> list[dict[str, str]]:
    """
    Fetches the content of multiple URLs asynchronously.

    Args:
        urls (list[str]): List of URLs to fetch.

    Returns:
        list[dict[str, str]]: A list of dictionaries containing the URL and its content.
                              Example: [{"url": "...", "content": "..."}]
    """
    async def fetch(client: httpx.AsyncClient, url: str) -> dict[str, str]:
        try:
            response = await client.get(url, timeout=10.0)
            response.raise_for_status()
            return {"url": url, "content": response.text}
        except Exception as e:
            return {"url": url, "content": f"Error: {str(e)}"}

    async with httpx.AsyncClient() as client:
        tasks = [fetch(client, url) for url in urls]
        return await asyncio.gather(*tasks)

def fetch_file(url: str):
    """
    Fetch a remote file from URL and wrap it as a File object.
    Automatically derives filename, name, format, and mime type.

    Args:
        url (str): Remote file URL.

    Returns:
        File: Wrapped File object with base64 content.
    """
    # Fetch the file
    with httpx.Client() as client:
        response = client.get(url)
        response.raise_for_status()
        content = response.content

    # Derive filename from URL
    filename = os.path.basename(url.split("?")[0])

    # Human-friendly name (strip extension, replace underscores)
    name = os.path.splitext(filename)[0].replace("_", " ")

    # Guess format and mime type
    ext = os.path.splitext(filename)[1].lstrip(".").lower()
    mime, _ = mimetypes.guess_type(filename)
    mime = mime or "application/octet-stream"

    # Encode content
    content_b64 = base64.b64encode(content).decode("utf-8")
    from agno.media import File
    
    return File.from_base64(
        base64_content=content_b64,
        filename=filename,
        name=name,
        format=ext,
        mime_type=mime
    )