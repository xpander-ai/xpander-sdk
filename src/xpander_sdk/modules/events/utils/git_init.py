from os import getenv
import os
import subprocess
from loguru import logger

def configure_git_credentials():
    try:
        # Read from environment variables
        git_user = getenv("GIT_USERNAME", None)
        git_token = getenv("GIT_TOKEN", None)
        git_name = getenv("GIT_NAME", "xpander.ai")
        git_email = getenv("GIT_EMAIL", "agent@xpander.ai")

        if not git_user or not git_token:
            return

        logger.info(f"Setting up GIT for user {git_user}")
        # Set Git global config
        subprocess.run(["git", "config", "--global", "user.name", git_name], check=True)
        subprocess.run(["git", "config", "--global", "user.email", git_email], check=True)
        subprocess.run(["git", "config", "--global", "credential.helper", "store"], check=True)

        # Write credentials to ~/.git-credentials
        cred_line = f"https://{git_user}:{git_token}@github.com\n"
        git_credentials_path = os.path.expanduser("~/.git-credentials")
        with open(git_credentials_path, "w") as cred_file:
            cred_file.write(cred_line)

        logger.info("✅ Git configured with PAT")
    except Exception as e:
        logger.warning(f"Failed to configure git {str(e)}")

