import { Metadata } from "next"
import { PlaygroundClient } from "./components/playground-client"

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default function PlaygroundPage() {
  return <PlaygroundClient />
}
