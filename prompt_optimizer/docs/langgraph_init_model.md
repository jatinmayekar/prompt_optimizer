https://v03.api.js.langchain.com/functions/langchain.chat_models_universal.initChatModel.html?_gl=1*1l8wdkv*_ga*NjkxODUzOTMwLjE3NDk0OTg3NTA.*_ga_47WX3HKKY2*czE3NDk0OTg3NTAkbzEkZzEkdDE3NDk0OTg4NzYkajMxJGwwJGgw

v0.3
LangChain.js
LangChain.jslangchainchat_models/universalinitChatModel
Function initChatModel
Initialize a ChatModel from the model name and provider. Must have the integration package corresponding to the model provider installed.

Template: RunInput
The input type for the model.

Template: CallOptions
Call options for the model.

Param: model
The name of the model, e.g. "gpt-4", "claude-3-opus-20240229". Can be prefixed with the model provider, e.g. "openai:gpt-4", "anthropic:claude-3-opus-20240229".

Param: fields
Additional configuration options.

Param: fields.modelProvider
The model provider. Supported values include:

openai (@langchain/openai)
anthropic (@langchain/anthropic)
azure_openai (@langchain/openai)
google-vertexai (@langchain/google-vertexai)
google-vertexai-web (@langchain/google-vertexai-web)
google-genai (@langchain/google-genai)
bedrock (@langchain/aws)
cohere (@langchain/cohere)
fireworks (@langchain/community/chat_models/fireworks)
together (@langchain/community/chat_models/togetherai)
mistralai (@langchain/mistralai)
groq (@langchain/groq)
ollama (@langchain/ollama)
cerebras (@langchain/cerebras)
deepseek (@langchain/deepseek)
xai (@langchain/xai)
Param: fields.configurableFields
Which model parameters are configurable:

undefined: No configurable fields.
"any": All fields are configurable. (See Security Note in description)
string[]: Specified fields are configurable.
Param: fields.configPrefix
Prefix for configurable fields at runtime.

Param: fields.params
Additional keyword args to pass to the ChatModel constructor.

Returns
A class which extends BaseChatModel.

Throws
If modelProvider cannot be inferred or isn't supported.

Throws
If the model provider integration package is not installed.

Example: Initialize non-configurable models
import { initChatModel } from "langchain/chat_models/universal";

const gpt4 = await initChatModel("openai:gpt-4", {
  temperature: 0.25,
});
const gpt4Result = await gpt4.invoke("what's your name");

const claude = await initChatModel("anthropic:claude-3-opus-20240229", {
  temperature: 0.25,
});
const claudeResult = await claude.invoke("what's your name");

const gemini = await initChatModel("gemini-1.5-pro", {
  modelProvider: "google-vertexai",
  temperature: 0.25,
});
const geminiResult = await gemini.invoke("what's your name");
Copy
Example: Create a partially configurable model with no default model
import { initChatModel } from "langchain/chat_models/universal";

const configurableModel = await initChatModel(undefined, {
  temperature: 0,
  configurableFields: ["model", "apiKey"],
});

const gpt4Result = await configurableModel.invoke("what's your name", {
  configurable: {
    model: "gpt-4",
  },
});

const claudeResult = await configurableModel.invoke("what's your name", {
  configurable: {
    model: "claude-3-5-sonnet-20240620",
  },
});
Copy
Example: Create a fully configurable model with a default model and a config prefix
import { initChatModel } from "langchain/chat_models/universal";

const configurableModelWithDefault = await initChatModel("gpt-4", {
  modelProvider: "openai",
  configurableFields: "any",
  configPrefix: "foo",
  temperature: 0,
});

const openaiResult = await configurableModelWithDefault.invoke(
  "what's your name",
  {
    configurable: {
      foo_apiKey: process.env.OPENAI_API_KEY,
    },
  }
);

const claudeResult = await configurableModelWithDefault.invoke(
  "what's your name",
  {
    configurable: {
      foo_model: "claude-3-5-sonnet-20240620",
      foo_modelProvider: "anthropic",
      foo_temperature: 0.6,
      foo_apiKey: process.env.ANTHROPIC_API_KEY,
    },
  }
);
Copy
Example: Bind tools to a configurable model:
import { initChatModel } from "langchain/chat_models/universal";
import { z } from "zod";
import { tool } from "@langchain/core/tools";

const getWeatherTool = tool(
  (input) => {
    // Do something with the input
    return JSON.stringify(input);
  },
  {
    schema: z
      .object({
        location: z
          .string()
          .describe("The city and state, e.g. San Francisco, CA"),
      })
      .describe("Get the current weather in a given location"),
    name: "GetWeather",
    description: "Get the current weather in a given location",
  }
);

const getPopulationTool = tool(
  (input) => {
    // Do something with the input
    return JSON.stringify(input);
  },
  {
    schema: z
      .object({
        location: z
          .string()
          .describe("The city and state, e.g. San Francisco, CA"),
      })
      .describe("Get the current population in a given location"),
    name: "GetPopulation",
    description: "Get the current population in a given location",
  }
);

const configurableModel = await initChatModel("gpt-4", {
  configurableFields: ["model", "modelProvider", "apiKey"],
  temperature: 0,
});

const configurableModelWithTools = configurableModel.bindTools([
  getWeatherTool,
  getPopulationTool,
]);

const configurableToolResult = await configurableModelWithTools.invoke(
  "Which city is hotter today and which is bigger: LA or NY?",
  {
    configurable: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  }
);

const configurableToolResult2 = await configurableModelWithTools.invoke(
  "Which city is hotter today and which is bigger: LA or NY?",
  {
    configurable: {
      model: "claude-3-5-sonnet-20240620",
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
  }
);
Copy
Description
This function initializes a ChatModel based on the provided model name and provider. It supports various model providers and allows for runtime configuration of model parameters.

Security Note: Setting configurableFields to "any" means fields like api_key, base_url, etc. can be altered at runtime, potentially redirecting model requests to a different service/user. Make sure that if you're accepting untrusted configurations, you enumerate the configurableFields explicitly.

The function will attempt to infer the model provider from the model name if not specified. Certain model name prefixes are associated with specific providers:

gpt-3... or gpt-4... -> openai
claude... -> anthropic
amazon.... -> bedrock
gemini... -> google-vertexai
command... -> cohere
accounts/fireworks... -> fireworks
Since
0.2.11

Version
0.2.11

initChatModel<RunInput, CallOptions>(model, fields?): Promise<ConfigurableModel<RunInput, CallOptions>>
Type Parameters
RunInput extends BaseLanguageModelInput = BaseLanguageModelInput
CallOptions extends ConfigurableChatModelCallOptions = ConfigurableChatModelCallOptions
Parameters
model: string
Optionalfields: Partial<Record<string, any>> & {
    configPrefix?: string;
    configurableFields?: undefined;
    modelProvider?: string;
}
Returns Promise<ConfigurableModel<RunInput, CallOptions>>
Defined in langchain/src/chat_models/universal.ts:565
initChatModel<RunInput, CallOptions>(model, options?): Promise<ConfigurableModel<RunInput, CallOptions>>
Type Parameters
RunInput extends BaseLanguageModelInput = BaseLanguageModelInput
CallOptions extends ConfigurableChatModelCallOptions = ConfigurableChatModelCallOptions
Parameters
model: never
Optionaloptions: Partial<Record<string, any>> & {
    configPrefix?: string;
    configurableFields?: undefined;
    modelProvider?: string;
}
Returns Promise<ConfigurableModel<RunInput, CallOptions>>
Defined in langchain/src/chat_models/universal.ts:578
initChatModel<RunInput, CallOptions>(model?, options?): Promise<ConfigurableModel<RunInput, CallOptions>>
Type Parameters
RunInput extends BaseLanguageModelInput = BaseLanguageModelInput
CallOptions extends ConfigurableChatModelCallOptions = ConfigurableChatModelCallOptions
Parameters
Optionalmodel: string
Optionaloptions: Partial<Record<string, any>> & {
    configPrefix?: string;
    configurableFields?: ConfigurableFields;
    modelProvider?: string;
}
Returns Promise<ConfigurableModel<RunInput, CallOptions>>
Defined in langchain/src/chat_models/universal.ts:591
LangChain.js
ConfigurableModel
ConfigurableChatModelCallOptions
InitChatModelFields
ChatModelProvider
ConfigurableFields
initChatModel
Generated using TypeDoc