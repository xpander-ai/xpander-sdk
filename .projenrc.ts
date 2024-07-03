import { cdk } from 'projen';
const project = new cdk.JsiiProject({
  author: 'xpander AI',
  authorAddress: 'opensource@xpander.ai',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  name: 'xpander-sdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/xpander-ai/xpander-sdk.git',
  // publishToPypi: {
  //   distName: 'xpander-sdk',
  //   module: 'xpander_sdk',
  // },
  // publishToMaven: {
  //   javaPackage: 'ai.xpander.sdk',
  //   mavenGroupId: 'ai.xpander',
  //   mavenArtifactId: 'sdk',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'Xpander.AI.Sdk',
  //   packageId: 'Xpander.AI.Sdk',
  // },
  deps: [] /* Runtime dependencies of this module. */,
  bundledDeps: ['axios'],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
