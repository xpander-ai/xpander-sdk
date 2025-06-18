import { cdk } from 'projen';

const project = new cdk.JsiiProject({
  author: 'xpander.ai',
  authorAddress: 'opensource@xpander.ai',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.7.0',
  gitignore: ['test/.env'],
  minNodeVersion: '22.15.0',
  tsconfig: {
    exclude: ['.env', '.env.template'],
    compilerOptions: {
      esModuleInterop: true,
      typeRoots: ['./node_modules/@types'],
    },
  },
  majorVersion: 1,
  name: 'xpander-sdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/xpander-ai/xpander-sdk.git',
  publishToPypi: {
    distName: 'xpander-sdk',
    module: 'xpander_sdk',
  },
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
    'openai@latest',
    '@langchain/openai',
    'dotenv',
    '@aws-sdk/client-bedrock-runtime',
  ],
  bundledDeps: ['sync-request'],
  jestOptions: {
    jestConfig: {
      injectGlobals: true,
      detectOpenHandles: true,
    },
  },
});

// Add beautiful per-class documentation generation (replaces monolithic docs)
project.addTask('generate-class-docs', {
  exec: 'node scripts/generate-class-docs.js',
  description:
    'Generate beautiful, individual markdown files per class for LLM-friendly consumption',
});

// Add LIVE documentation generation with real API calls! 🔥
project.addTask('docs:live', {
  exec: 'node scripts/live-docs-runner.js',
  description:
    '🔥 Generate LIVE documentation with real API calls and actual outputs! Requires API keys in .env',
});

// Add combined task for full documentation generation
project.addTask('docs:complete', {
  exec: 'npm run docs:live && node scripts/generate-class-docs.js',
  description:
    '🚀 Generate complete documentation: first capture live API data, then generate enhanced docs',
});

// Add per-class documentation to the post-compile step
project.postCompileTask.spawn(project.tasks.tryFind('generate-class-docs')!);

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

project.addDevDeps('ts-jest@latest');
project.addDevDeps('jest@latest');

project.synth();

project.addDevDeps('jsii-rosetta@~5.0.7');
