# TypeScript API Documentation

This directory contains individual documentation files for each class in the xpander-sdk.

## Classes

- [Agent](Agent.md) - Represents an agent in xpanderAI, managing tools, sessions, and operational workflows.
- [AgentInstructions](AgentInstructions.md) - Represents the instructions provided to an agent within the xpander.ai framework.
- [AgenticInterface](AgenticInterface.md) - Represents an agentic interface with identifying and descriptive properties.
- [AgenticOperation](AgenticOperation.md) - Represents an agentic operation with metadata and execution details.
- [Agents](Agents.md) - Manages a collection of Agent instances in xpanderAI, providing methods to list, retrieve, and initialize agents, including custom agents.
- [Base](Base.md)
- [Configuration](Configuration.md) - Manages the configuration settings for the xpanderAI client.
- [Execution](Execution.md) - Represents an execution of an agent in xpanderAI, including its input, status, memory, and other related details.
- [ExecutionMetrics](ExecutionMetrics.md)
- [Graph](Graph.md) - Represents a graph structure containing nodes related to an agent.
- [GraphItem](GraphItem.md) - Represents a single item (node) in an agent's graph structure.
- [KnowledgeBase](KnowledgeBase.md)
- [KnowledgeBaseDocument](KnowledgeBaseDocument.md) - Represents a knowledge base document in the xpander.ai system. This is used to reference a document within a knowledge base.
- [KnowledgeBaseItem](KnowledgeBaseItem.md) - Represents a knowledge base in the xpander.ai system. Used to manage documents stored within the knowledge base.
- [KnowledgeBases](KnowledgeBases.md) - Manages a collection of knowledge bases in the xpander.ai system, providing methods to list, retrieve, and create individual knowledge bases.
- [LLMMetrics](LLMMetrics.md)
- [LLMTokens](LLMTokens.md) - Represents token usage statistics for a language model interaction.
- [Memory](Memory.md) - Represents a memory thread in xpanderAI, handling storage, retrieval, and processing of memory messages and related operations.
- [MemoryThread](MemoryThread.md)
- [MetricsBase](MetricsBase.md)
- [Tokens](Tokens.md) - Encapsulates token usage for different components of a task, typically an internal process and a worker/agent execution.
- [ToolCall](ToolCall.md) - Represents a tool call with its metadata and payload.
- [ToolCallResult](ToolCallResult.md) - Represents the result of a tool call execution.
- [UnloadedAgent](UnloadedAgent.md) - Represents an unloaded agent in the xpander.ai system. Used to reference agents that are not yet fully loaded.
- [UserDetails](UserDetails.md)
- [XpanderClient](XpanderClient.md) - XpanderClient provides methods for configuring and interacting with xpanderAI tools, managing agents, and extracting tool calls from LLM responses.

## Interfaces

- [IAgentGraphItemAdvancedFilteringOption](IAgentGraphItemAdvancedFilteringOption.md)
- [IAgentGraphItemMCPSettings](IAgentGraphItemMCPSettings.md)
- [IAgentGraphItemSchema](IAgentGraphItemSchema.md)
- [IAgentGraphItemSettings](IAgentGraphItemSettings.md)
- [IAgentTool](IAgentTool.md) - Interface representing a tool available to an agent.
- [IBedrockTool](IBedrockTool.md) - Interface representing a Bedrock tool.
- [IBedrockToolOutput](IBedrockToolOutput.md) - Output interface for a Bedrock tool.
- [IBedrockToolSpec](IBedrockToolSpec.md) - Interface representing the specification for a Bedrock tool.
- [IBedrockToolSpecInputSchema](IBedrockToolSpecInputSchema.md) - Interface representing the input schema for a Bedrock tool.
- [IConfiguration](IConfiguration.md) - Interface representing configuration settings for the xpanderAI client.
- [IExecutionInput](IExecutionInput.md)
- [ILocalTool](ILocalTool.md) - Interface for a local tool.
- [ILocalToolFunction](ILocalToolFunction.md) - Interface for a function within a local tool.
- [IMemoryMessage](IMemoryMessage.md)
- [INodeDescription](INodeDescription.md) - Represents a prompt group + node name node's description override.
- [INodeSchema](INodeSchema.md) - Represents the schema of a single node with defined input and output structures.
- [IOpenAIToolFunctionOutput](IOpenAIToolFunctionOutput.md) - Output interface for an OpenAI tool function.
- [IOpenAIToolOutput](IOpenAIToolOutput.md) - Output interface for an OpenAI tool.
- [IPGSchema](IPGSchema.md) - Represents a schema group for a prompt group session (PGSchema), containing multiple node schemas.
- [ISourceNode](ISourceNode.md) - Interface representing a source node in the agent's graph.
- [ITool](ITool.md) - Interface representing a general tool.
- [IToolCall](IToolCall.md)
- [IToolCallPayload](IToolCallPayload.md) - Interface representing the payload for a tool call.
- [IToolExecutionResult](IToolExecutionResult.md) - Represents the result of a tool execution, including status, data, and success indicator.
- [IToolInstructions](IToolInstructions.md) - Interface representing instructions for a tool.
- [IToolParameter](IToolParameter.md) - Interface representing a parameter for a tool.

## Enums

- [AgentAccessScope](AgentAccessScope.md)
- [AgentDelegationEndStrategy](AgentDelegationEndStrategy.md)
- [AgentDelegationType](AgentDelegationType.md)
- [AgentGraphItemSubType](AgentGraphItemSubType.md)
- [AgentGraphItemType](AgentGraphItemType.md)
- [AgentStatus](AgentStatus.md) - Enum representing the possible statuses of an agent.
- [AgentType](AgentType.md)
- [ExecutionStatus](ExecutionStatus.md)
- [KnowledgeBaseStrategy](KnowledgeBaseStrategy.md)
- [KnowledgeBaseType](KnowledgeBaseType.md)
- [LLMProvider](LLMProvider.md) - Enum representing different Large Language Model (LLM) providers.
- [MemoryStrategy](MemoryStrategy.md)
- [MemoryType](MemoryType.md)
- [SourceNodeType](SourceNodeType.md) - Enum representing different source node types for agents.
- [ToolCallType](ToolCallType.md) - Enum representing types of tool calls.

