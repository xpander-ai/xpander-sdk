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
        "python-dotenv>=1.2.1",
        "packaging>=25.0",
        "pydantic>=2.12.5",
        "loguru>=0.7.3",
        "httpx>=0.28.1",
        "httpx_sse>=0.4.3",
        "nest-asyncio>=1.6.0",
        "strands-agents>=1.20.0",
        "openai-agents>=0.6.4",
        "python-toon>=0.1.3",
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
