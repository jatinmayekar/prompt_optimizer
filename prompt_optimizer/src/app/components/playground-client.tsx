"use client"

import { useState } from "react"
import Image from "next/image"
import { RotateCcw } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"
import { Label } from "@/registry/new-york/ui/label"
import { Separator } from "@/registry/new-york/ui/separator"
import { Textarea } from "@/registry/new-york/ui/textarea"

import { CodeViewer } from "./code-viewer"
import { MaxLengthSelector } from "./maxlength-selector"
import { ModelSelector } from "./model-selector"
import { PresetActions } from "./preset-actions"
import { PresetSave } from "./preset-save"
import { PresetSelector } from "./preset-selector"
import { PresetShare } from "./preset-share"
import { TemperatureSelector } from "./temperature-selector"
import { TopPSelector } from "./top-p-selector"
import { ThemeToggle } from "./theme-toggle"
import { models, types } from "../data/models"
import { presets } from "../data/presets"

export function PlaygroundClient() {
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [model, setModel] = useState("gpt-4o-mini") // Default model
  const [temperature, setTemperature] = useState([0.56])
  const [maxLength, setMaxLength] = useState([256])
  const [topP, setTopP] = useState([0.9])
  const [isLoading, setIsLoading] = useState(false)

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      if (!prompt || isLoading) return
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (!prompt || isLoading) return
    setIsLoading(true)
    setOutput("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model,
          temperature: temperature[0],
          maxLength: maxLength[0],
          topP: topP[0],
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      setOutput(data.output)
    } catch (error) {
      console.error("Failed to generate completion:", error)
      setOutput("Failed to generate completion. Please check the console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
            <ThemeToggle />
          </div>
        </div>
        <Separator />
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="flex flex-col space-y-4">
              <Textarea
                placeholder="Write a tagline for an ice cream shop"
                className="min-h-[200px] flex-1 p-4 md:min-h-[400px]"
                onChange={handlePromptChange}
                value={prompt}
                onKeyDown={handleKeyDown}
              />
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  placeholder="The model's output will appear here."
                  className="min-h-[200px] flex-1 p-4 md:min-h-[400px]"
                  tabIndex={-1}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-10 dark:bg-opacity-50">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-t-transparent" />
                  </div>
                )}
              </div>
            </div>
            <div className="hidden flex-col space-y-4 sm:flex">
              <ModelSelector types={types} models={models} onModelChange={setModel} />
              <TemperatureSelector
                defaultValue={temperature}
                onValueChange={setTemperature}
              />
              <MaxLengthSelector
                defaultValue={maxLength}
                onValueChange={setMaxLength}
              />
              <TopPSelector defaultValue={topP} onValueChange={setTopP} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}