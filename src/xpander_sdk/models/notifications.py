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
    
class NotificationSettingsBase(XPanderSharedModel):
    """Base class for notification settings with common customization fields.

    Attributes:
        subject_suffix: Optional suffix to append to notification subjects.
        body_prefix: Optional prefix to prepend to notification bodies.
    """

    subject_suffix: Optional[str] = None
    body_prefix: Optional[str] = None

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
