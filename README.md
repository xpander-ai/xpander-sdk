# Xpander SDK

Welcome to the Xpander SDK! This SDK is designed to help developers integrate seamlessly with various Large Language Model (LLM) providers and the Xpander AI App platform. The Xpander platform enables you to unlock AI use-cases securely, responsibly, and with zero-integration efforts into your existing tech stack. With the Xpander SDK, you can automate and simplify function calls, tool management, and the creation of sophisticated AI Agents and Assistants.

## Key Benefits

### Seamless Integration

The Xpander SDK abstracts away the complexities involved in integrating with different LLM providers. Instead of manually writing and maintaining code for each provider, developers can use a unified interface provided by Xpander, making the integration process straightforward and efficient.

### Simplified Function Calls

Manually handling function calls to different LLMs can be tedious and error-prone. The Xpander SDK automates this process, ensuring that function calls are correctly formatted and sent to the appropriate LLM provider. This automation includes managing request payloads, headers, and handling responses, thereby reducing the chances of errors and saving development time.

### Auto-Translator for LLM Specifics

One of the standout features of the Xpander SDK is its ability to auto-translate generic function calls into LLM-specific formats. This means that you don't have to worry about the nuances and specific requirements of each LLM provider. The SDK handles these translations internally, ensuring that your function calls are compatible with the provider you are using.

### Tool Management and Caching

The SDK provides robust tool management capabilities, including the ability to retrieve and cache agent tools. This ensures that tools are readily accessible, improving performance and efficiency.

### Intelligent Tool Invocation

When an LLM selects tools provided by the Xpander platform, the SDK handles the entire lifecycle of these tool interactions. Once the LLM selects a tool, Xpander will manage the response from the LLM, perform the actual interaction, and invoke the appropriate API. This intelligent tool invocation ensures seamless and accurate execution of tasks defined by the AI applications.

### Integration with Xpander AI App Platform

With the Xpander AI App platform and our Agentic interfaces, you can define domain-specific AI applications with limited access to a defined set of systems and data. Whether you need a Developer Assistant, DevOps Agent, or IT Assistant, Xpander allows you to create AI Apps that can securely interact with your existing tech stack. Each AI App has a clearly defined API Layer (Agentic Interfaces) that allows it to run, perform actions, and pull data from your existing systems or SaaS applications. Additionally, you can configure each AI App with different LLM providers and analyze the logs of all AI-Traffic between AI Apps, employees, and LLM providers.

### Example AI Apps

1. **Employee Onboarding and Off-boarding App**: This AI app can receive requests from Jira, HiBob, or Slack messages to start the process of onboarding or offboarding. It will navigate between various systems to perform the requested tasks using Agentic Interfaces, with authentication handled through the Xpander platform.

2. **Jira Message Sidekick**: This AI app can receive requests from Jira and edit tickets or create new ones with well-formatted templates and additional data.

## Installation

To install the SDK, use npm or yarn:

```bash
npm install xpander-sdk
```

or

```bash
yarn add xpander-sdk
```

## Usage

Here is a basic example of how to use the Xpander SDK:

### Without Xpander SDK

Manually writing function calls to interact with an LLM provider like OpenAI involves handling various aspects such as request formatting, headers, error handling, and managing responses. Here's an example of how you might do this:

```typescript
...
```

### With Xpander SDK

Using the Xpander SDK, you can achieve the same functionality with much less code and complexity, leveraging its built-in capabilities for tool management and function invocation:

```typescript
...
```

By using the Xpander SDK, you can significantly reduce the amount of boilerplate code and error handling needed, allowing you to focus on your core application logic and improving overall development efficiency.

## Project Structure

```plaintext
.
├── API.md
├── LICENSE
├── README.md
├── coverage
├── dist
│   ├── dotnet
│   ├── java
│   ├── js
│   └── python
├── lib
│   ├── constants
│   ├── core
│   ├── index.d.ts
│   ├── index.js
│   ├── llmProviders
│   ├── models
│   ├── plugins
│   └── tsconfig.tsbuildinfo
├── node_modules
├── package-lock.json
├── package.json
├── run.log
├── src
│   ├── constants
│   ├── core
│   ├── index.ts
│   ├── llmProviders
│   └── models
├── test
│   └── xpanderClient.test.ts
├── test-reports
│   └── junit.xml
├── tsconfig.dev.json
├── tsconfig.json
└── yarn.lock
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

*Note: This project uses Projen for project configuration and management. The code inside the `src` folder is published to different runtimes.*