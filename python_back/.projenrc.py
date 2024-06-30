from projen.python import PythonProject
from projen import ProjectType

project = PythonProject(
    author_email="opensource@xpander.ai",
    author_name="xpander AI",
    project_type=ProjectType.LIB,
    module_name="xpander_sdk",
    name="xpander-sdk",
    version="0.1.0",
)

project.add_dependency("requests")
project.add_dependency("langchain")
project.add_dependency("langchain_openai")
project.add_dependency("pydantic")
project.add_dependency("langchainhub")
project.add_dependency("python-dotenv")

project.synth()