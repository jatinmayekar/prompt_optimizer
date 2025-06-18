import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: NextRequest) {
  
  try {
    const { prompt, model, temperature, maxLength, topP } = await req.json();

    const chatModel = new ChatOpenAI({
      modelName: model || "gpt-4o-mini", // Default to a current mini model
      temperature: temperature || 0.8,
      maxTokens: maxLength || 256,
      topP: topP || 0.9,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [new HumanMessage({ content: prompt })];
    const response = await chatModel.invoke(messages);

    return NextResponse.json({ output: response.content, fullResponse: response });
  } catch (error) {
    console.error("Error processing request:", error);
    // It's better to not expose the internal error details to the client
    return new NextResponse(
      JSON.stringify({ error: "An internal server error occurred." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 