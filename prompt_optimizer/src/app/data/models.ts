export const types = ["GPT-4"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  id: string
  name: string
  description: string
  strengths?: string
  type: Type
}

export const models: Model<ModelType>[] = [
  {
    id: "gpt-4o-mini",
    name: "gpt-4o-mini",
    description: "The latest and most advanced model from OpenAI.",
    type: "GPT-4",
    strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
  },
]
