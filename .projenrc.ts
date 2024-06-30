import { cdk } from 'projen';
const project = new cdk.JsiiProject({
  author: 'Dudu Twizer',
  authorAddress: 'dudutwizer@icloud.com',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  name: 'xpander-sdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/dudutwizer/xpander-sdk.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();