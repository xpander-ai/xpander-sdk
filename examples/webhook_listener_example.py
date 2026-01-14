"""
Example: Webhook listener for xpander events

================================================

WHAT THIS EXAMPLE SHOWS
-----------------------
✔ Receive xpander webhook events
✔ Verify HMAC signature (security)
✔ Parse task lifecycle updates
✔ Production-ready FastAPI server
✔ Real backend integration pattern

USE CASES
---------
• Backend notifications
• Event-driven workflows
• Server integrations
• Auditing & monitoring

================================================

INSTALLATION
------------

1) Create virtual environment

   python -m venv venv
   source venv/bin/activate

2) Install dependencies

   pip install fastapi uvicorn loguru

================================================

SETUP
-----

1) Create webhook secret

   (Use any strong random string)

2) Export secret

   export XPANDER_WEBHOOK_SECRET="your_webhook_secret"

================================================

RUN SERVER
----------

uvicorn examples.webhook_listener_example:app --reload

Server will run at:
http://127.0.0.1:8000

================================================

CONFIGURE IN XPANDER DASHBOARD
------------------------------

Webhook URL:

POST https://your-domain/webhook/xpander

Secret:
Use same value as XPANDER_WEBHOOK_SECRET

================================================

TEST LOCALLY
------------

Fake request (should FAIL):

curl -X POST http://127.0.0.1:8000/webhook/xpander \
  -H "Content-Type: application/json" \
  -H "x-xpander-signature: fake" \
  -d '{"type":"task.created","data":{"id":"123"}}'

Valid request (generate signature):

python - <<EOF
import hmac, hashlib

secret = b"your_webhook_secret"
payload = b'{"type":"task.created","data":{"id":"123"}}'

sig = hmac.new(secret, payload, hashlib.sha256).hexdigest()
print(sig)
EOF

Send signed request:

curl -X POST http://127.0.0.1:8000/webhook/xpander \
  -H "Content-Type: application/json" \
  -H "x-xpander-signature: <PASTE_SIGNATURE>" \
  -d '{"type":"task.created","data":{"id":"123"}}'

================================================

SECURITY NOTES
--------------
• Never log secrets
• Always verify signature
• Use HTTPS in production
• Rotate webhook secret periodically

================================================
"""

import os
import hmac
import hashlib
from fastapi import FastAPI, Request, HTTPException
from loguru import logger


app = FastAPI()

# Read webhook secret
WEBHOOK_SECRET = os.getenv("XPANDER_WEBHOOK_SECRET")


# ================= SECURITY ================= #

def verify_signature(payload: bytes, signature: str):
    """
    Verify webhook authenticity using HMAC SHA256
    """

    if not WEBHOOK_SECRET:
        raise HTTPException(500, "Webhook secret not set")

    expected_signature = hmac.new(
        WEBHOOK_SECRET.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(expected_signature, signature):
        raise HTTPException(401, "Invalid webhook signature")


# ================= WEBHOOK ================= #

@app.post("/webhook/xpander")
async def xpander_webhook(request: Request):

    raw_body = await request.body()
    signature = request.headers.get("x-xpander-signature")

    if not signature:
        raise HTTPException(400, "Missing signature header")

    # Security verification
    verify_signature(raw_body, signature)

    event = await request.json()

    logger.info("Received webhook event")
    logger.info(event)

    event_type = event.get("type")

    if event_type == "task.created":
        handle_task_created(event)

    elif event_type == "task.updated":
        handle_task_updated(event)

    elif event_type == "task.finished":
        handle_task_finished(event)

    return {"status": "ok"}


# ================= HANDLERS ================= #

def handle_task_created(event):
    logger.success("Task created event received")
    logger.info(event["data"])


def handle_task_updated(event):
    logger.warning("Task updated event")
    logger.info(event["data"])


def handle_task_finished(event):
    logger.success("Task finished event")
    logger.info("Result:")
    logger.info(event["data"].get("result"))


# ================= MAIN ================= #

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "webhook_listener_example:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
