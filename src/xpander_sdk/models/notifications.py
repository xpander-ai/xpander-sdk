"""Models for notification configurations and credentials.

This module provides data models for configuring various notification channels
including email, Slack, and webhooks, along with their authentication details.
"""

from typing import Dict, List, Literal, Optional, Union

from xpander_sdk.models.shared import XPanderSharedModel

class SlackCredentials(XPanderSharedModel):
    """Slack API authentication credentials.

    Attributes:
        authed_user_id: Authenticated user's Slack ID.
        access_token: OAuth access token for API calls.
        client_id: Slack app client ID.
        client_secret: Slack app client secret.
        verification_token: Token for verifying requests from Slack.
        signing_secret: Secret for validating webhook signatures.
        app_configuration_token: Token for app configuration.
        app_configuration_refresh_token: Refresh token for app configuration.
    """

    authed_user_id: Optional[str] = None
    access_token: Optional[str] = None
    client_id: Optional[str] = None
    client_secret: Optional[str] = None
    verification_token: Optional[str] = None
    signing_secret: Optional[str] = None
    app_configuration_token: Optional[str] = None
    app_configuration_refresh_token: Optional[str] = None
    
# Default values for HITL notifications
DEFAULT_HITL_BODY = "Hello, workflow {title} is waiting for your approval and will not continue until approved. The workflow request is: {content}. By clicking approve, the workflow will auto-execute."
DEFAULT_LOGO_URL = "https://assets.xpanderai.io/xpander-logo.png"
DEFAULT_APPROVE_BUTTON_TEXT = "Approve"
DEFAULT_DENY_BUTTON_TEXT = "Deny"


class NotificationSettingsBase(XPanderSharedModel):
    """Base class for notification settings with common customization fields.

    Attributes:
        subject: Optional custom subject line for notifications.
        body: Optional custom body content for notifications.
        approve_button_text: Text for approval button (HITL only). Defaults to "Approve".
        deny_button_text: Text for denial button (HITL only). Defaults to "Deny".
        logo_url: URL for logo image. Defaults to xpander logo.
    """

    subject: Optional[str] = None
    body: Optional[str] = None
    approve_button_text: Optional[str] = DEFAULT_APPROVE_BUTTON_TEXT
    deny_button_text: Optional[str] = DEFAULT_DENY_BUTTON_TEXT
    logo_url: Optional[str] = DEFAULT_LOGO_URL

class EmailNotificationSettings(NotificationSettingsBase):
    """Configuration for email notifications.

    Attributes:
        to: List of recipient email addresses.
    """

    to: List[str]
    
class SlackNotificationSettings(NotificationSettingsBase):
    """Configuration for Slack notifications.

    Attributes:
        channels: List of Slack channel IDs or names to post to.
        credentials: Slack API authentication credentials.
    """

    channels: List[str]
    credentials: SlackCredentials

class WebhookNotificationSettings(NotificationSettingsBase):
    """Configuration for webhook notifications.

    Attributes:
        url: Target webhook URL to POST notification data.
        headers: Optional HTTP headers to include in the webhook request.
    """

    url: str
    headers: Optional[Dict[str, str]] = {}

NotificationType = Literal["email", "slack", "webhook"]
"""Supported notification channel types."""

NotificationDetails = Union[
    EmailNotificationSettings,
    SlackNotificationSettings,
    WebhookNotificationSettings,
]
"""Union type for all notification detail configurations."""


class NotificationSettings(XPanderSharedModel):
    """Configuration for event-based notifications.

    Attributes:
        on_success: Notifications to send when an operation succeeds.
            Maps notification types to a list of notification configurations.
        on_error: Notifications to send when an operation fails.
            Maps notification types to a list of notification configurations.
    """

    on_success: Optional[Dict[NotificationType, List[NotificationDetails]]] = {}
    on_error: Optional[Dict[NotificationType, List[NotificationDetails]]] = {}
