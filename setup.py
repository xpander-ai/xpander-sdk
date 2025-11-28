from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="xpander-sdk",
    version="2.0.0",
    author="xpanderAI",
    author_email="dev@xpander.ai",
    description="xpander.ai Backend-as-a-service for AI Agents - SDK",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://www.xpander.ai",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "python-dotenv",
        "packaging",
        "pydantic",
        "loguru",
        "httpx",
        "httpx_sse",
        "nest-asyncio",
    ],
    extras_require={
        "agno": ["agno", "sqlalchemy" ,"psycopg[binary,pool]", "greenlet"],
        "dev": ["black", "pre-commit", "pytest", "anthropic", "mcp", "openai", "fireworks-ai", "aioboto3", "google-genai"],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.9",
)
