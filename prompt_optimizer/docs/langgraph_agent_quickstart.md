https://langchain-ai.github.io/langgraph/agents/agents/

Skip to content
We are growing and hiring for multiple roles for LangChain, LangGraph and LangSmith. Join our team!
logo


Search
 
 GitHub
Guides
Reference
Examples
Resources
Get started
Quickstart
LangGraph basics
Deployment
Prebuilt agents
Overview
Running agents
Streaming
Models
Tools
MCP Integration
Context
Memory
Human-in-the-loop
Multi-agent
Evals
Deployment
UI
LangGraph framework
Agent architectures
Graphs
Streaming
Persistence
Memory
Human-in-the-loop
Breakpoints
Time travel
Tools
Subgraphs
Multi-agent
Functional API
LangGraph Platform
Overview
Get started
Components
Data management
Authentication & access control
Assistants
Threads
Runs
Streaming
Human-in-the-loop
Breakpoints
Time travel
MCP
Double-texting
Webhooks
Cron jobs
Server customization
Deployment
Table of contents
Prerequisites
1. Install dependencies
2. Create an agent
3. Configure an LLM
4. Add a custom prompt
5. Add memory
6. Configure structured output
Next steps
LangGraph quickstart¶
This guide shows you how to set up and use LangGraph's prebuilt, reusable components, which are designed to help you construct agentic systems quickly and reliably.

Prerequisites¶
Before you start this tutorial, ensure you have the following:

An Anthropic API key
1. Install dependencies¶
If you haven't already, install LangGraph and LangChain:


pip install -U langgraph "langchain[anthropic]"
Info

LangChain is installed so the agent can call the model.

2. Create an agent¶
To create an agent, use create_react_agent:

API Reference: create_react_agent


from langgraph.prebuilt import create_react_agent

def get_weather(city: str) -> str:  
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

agent = create_react_agent(
    model="anthropic:claude-3-7-sonnet-latest",  
    tools=[get_weather],  
    prompt="You are a helpful assistant"  
)

# Run the agent
agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)
3. Configure an LLM¶
To configure an LLM with specific parameters, such as temperature, use init_chat_model:

API Reference: init_chat_model | create_react_agent


from langchain.chat_models import init_chat_model
from langgraph.prebuilt import create_react_agent

model = init_chat_model(
    "anthropic:claude-3-7-sonnet-latest",
    temperature=0
)

agent = create_react_agent(
    model=model,
    tools=[get_weather],
)
For more information on how to configure LLMs, see Models.

4. Add a custom prompt¶
Prompts instruct the LLM how to behave. Add one of the following types of prompts:

Static: A string is interpreted as a system message.
Dynamic: A list of messages generated at runtime, based on input or configuration.

Static prompt
Dynamic prompt
Define a fixed prompt string or list of messages:


from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    model="anthropic:claude-3-7-sonnet-latest",
    tools=[get_weather],
    # A static prompt that never changes
    prompt="Never answer questions about the weather."
)

agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)

For more information, see Context.

5. Add memory¶
To allow multi-turn conversations with an agent, you need to enable persistence by providing a checkpointer when creating an agent. At runtime, you need to provide a config containing thread_id — a unique identifier for the conversation (session):

API Reference: create_react_agent | InMemorySaver


from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import InMemorySaver

checkpointer = InMemorySaver()

agent = create_react_agent(
    model="anthropic:claude-3-7-sonnet-latest",
    tools=[get_weather],
    checkpointer=checkpointer  
)

# Run the agent
config = {"configurable": {"thread_id": "1"}}
sf_response = agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]},
    config  
)
ny_response = agent.invoke(
    {"messages": [{"role": "user", "content": "what about new york?"}]},
    config
)
When you enable the checkpointer, it stores agent state at every step in the provided checkpointer database (or in memory, if using InMemorySaver).

Note that in the above example, when the agent is invoked the second time with the same thread_id, the original message history from the first conversation is automatically included, together with the new user input.

For more information, see Memory.

6. Configure structured output¶
To produce structured responses conforming to a schema, use the response_format parameter. The schema can be defined with a Pydantic model or TypedDict. The result will be accessible via the structured_response field.

API Reference: create_react_agent


from pydantic import BaseModel
from langgraph.prebuilt import create_react_agent

class WeatherResponse(BaseModel):
    conditions: str

agent = create_react_agent(
    model="anthropic:claude-3-7-sonnet-latest",
    tools=[get_weather],
    response_format=WeatherResponse  
)

response = agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)

response["structured_response"]
LLM post-processing

Structured output requires an additional call to the LLM to format the response according to the schema.

Next steps¶
Deploy your agent locally
Learn more about prebuilt agents
LangGraph Platform quickstart
 Back to top
Previous
LangGraph
Next
Overview
Copyright © 2025 LangChain, Inc | Consent Preferences
Made with Material for MkDocs
