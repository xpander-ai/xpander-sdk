import { cdk } from 'projen';

const project = new cdk.JsiiProject({
  author: 'xpander AI',
  authorAddress: 'opensource@xpander.ai',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  name: 'xpander-sdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/xpander-ai/xpander-sdk.git',
  publishToPypi: {
    distName: 'xpander-sdk',
    module: 'xpander_sdk',
  },
  // publishToMaven: {
  //   javaPackage: 'ai.xpander.sdk',
  //   mavenGroupId: 'ai.xpander',
  //   mavenArtifactId: 'sdk',
  // },
  publishToNuget: {
    dotNetNamespace: 'Xpander.AI.Sdk',
    packageId: 'Xpander.AI.Sdk',
  },
  publishDryRun: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  dependabot: true,
  deps: [] /* Runtime dependencies of this module. */,
  bundledDeps: [
    'sync-request',
    'openai',
    'dotenv',
    'axios',
    '@aws-sdk/client-bedrock-runtime',
  ],
  gitignore: ['.env'],
  jestOptions: {
    jestConfig: {
      detectOpenHandles: true,
    },
  },
});

// Adding custom tasks to generate documentation for each language
project.addTask('generate-docs', {
  exec: 'jsii-docgen -o API.md',
});

project.addTask('generate-docs-python', {
  exec: 'jsii-docgen -o API_python.md --language python',
});

project.addTask('generate-docs-node', {
  exec: 'jsii-docgen -o API_node.md --language typescript',
});

project.addTask('generate-docs-dotnet', {
  exec: 'jsii-docgen -o API_dotnet.md --language csharp',
});

// project.addTask('generate-docs-java', {
//   exec: 'jsii-docgen -o API_java.md --language java',
// });

// Helper function to safely spawn tasks
function safeSpawn(taskName: string) {
  const task = project.tasks.tryFind(taskName);
  if (task) {
    project.postCompileTask.spawn(task);
  } else {
    console.error(`Task ${taskName} not found`);
  }
}

// Extend the default build task to include generating and uploading docs
safeSpawn('generate-docs');
safeSpawn('generate-docs-python');
safeSpawn('generate-docs-node');
safeSpawn('generate-docs-dotnet');
// safeSpawn('generate-docs-java');

// run node uploadDocs.js manually
project.synth();
