import { cdk } from 'projen';

const project = new cdk.JsiiProject({
  author: 'xpander AI',
  authorAddress: 'opensource@xpander.ai',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  tsconfig: {
    exclude: ['.env', '.env.template'],
    compilerOptions: {
      typeRoots: ['./node_modules/@types', './src/@types'],
    },
  },
  majorVersion: 1,
  name: 'xpander-sdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/xpander-ai/xpander-sdk.git',
  publishToPypi: {
    distName: 'xpander-ai',
    module: 'xpander_sdk',
  },
  // publishToMaven: {
  //   javaPackage: 'ai.xpander.sdk',
  //   mavenGroupId: 'ai.xpander',
  //   mavenArtifactId: 'sdk',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'Xpander.AI.Sdk',
  //   packageId: 'Xpander.AI.Sdk',
  // },
  publishDryRun: false,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  dependabot: true,
  deps: [] /* Runtime dependencies of this module. */,
  devDeps: [
    'openai',
    '@langchain/openai',
    'dotenv',
    '@aws-sdk/client-bedrock-runtime',
  ],
  bundledDeps: ['sync-request', 'axios', 'string-similarity'],
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

// project.addTask('generate-docs-dotnet', {
//   exec: 'jsii-docgen -o API_dotnet.md --language csharp',
// });

// project.addTask('generate-docs-java', {
//   exec: 'jsii-docgen -o API_java.md --language java',
// });
if (project?.github?.actions) {
  project.github.actions.set(
    'actions/upload-artifact',
    'actions/upload-artifact@v4.3.6',
  );
}

project.synth();
