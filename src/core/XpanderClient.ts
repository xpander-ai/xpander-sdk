import axios from 'axios';
import { Plugin } from '../constants/plugins';
import { OpenAI, LangChain } from '../plugins';

const PLUGIN_HANDLERS: PluginHandler[] = [OpenAI, LangChain];

interface PluginHandler {
  new(client: XpanderClient): any;
  shouldHandle(plugin: Plugin): boolean;
}

export class XpanderClient {
  agentKey: string;
  agentUrl: string;
  toolsCache: any;

  constructor(agentKey: string, agentUrl: string) {
    this.agentKey = agentKey;
    this.agentUrl = agentUrl;
  }

  async retrieveAgentTools(): Promise<any> {
    if (this.toolsCache) {
      return this.toolsCache;
    }

    try {
      const result = await axios.post(`${this.agentUrl}/tools`, {}, {
        headers: { 'x-api-key': this.agentKey },
      });

      if (result.status !== 200) {
        throw new Error(JSON.stringify(result.data));
      }

      this.toolsCache = result.data;

      if (!Array.isArray(this.toolsCache)) {
        throw new Error(`Returned tools are malformed - ${JSON.stringify(this.toolsCache)}`);
      }
    } catch (e) {
      throw new Error(`Failed to get agent's spec - ${(e as Error).message}`);
    }

    return this.toolsCache;
  }

  tools(plugin: Plugin): any {
    const handler = this.getPluginHandler(plugin);
    return handler.getTools();
  }

  getPluginHandler(plugin: Plugin): any {
    for (const PluginHandler of PLUGIN_HANDLERS) {
      if (PluginHandler.shouldHandle(plugin)) {
        return new PluginHandler(this);
      }
    }
    throw new Error(`Plugin ${plugin} handler not found`);
  }

  processChatResponse(messages: any[], plugin: Plugin, chatCompletionResponse: any, aiClient: any): any {
    try {
      const handler = this.getPluginHandler(plugin);
      if (handler.processChatResponse) {
        return handler.processChatResponse(messages, chatCompletionResponse, aiClient);
      } else {
        throw new Error('Handler implementation issue - ChatCompletion');
      }
    } catch (e) {
      throw new Error(`Failed to handle chat completion - ${(e as Error).message}`);
    }
  }
}