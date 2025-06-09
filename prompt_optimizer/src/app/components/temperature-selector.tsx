"use client"

import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/new-york/ui/hover-card"
import { Label } from "@/registry/new-york/ui/label"
import { Slider } from "@/registry/new-york/ui/slider"

interface TemperatureSelectorProps {
  defaultValue: number[]
  onValueChange: (value: number[]) => void
}

export function TemperatureSelector({
  defaultValue,
  onValueChange,
}: TemperatureSelectorProps) {
  const [value, setValue] = React.useState(defaultValue)

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    onValueChange(newValue)
  }

  return (
    <div className="grid gap-1">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature" className="text-xs">Temperature</Label>
              <span className="w-12 rounded-md border border-transparent px-1 py-0.5 text-right text-xs text-muted-foreground">
                {value}
              </span>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls randomness: lowering results in less random completions. As
          temperature approaches zero, the model becomes deterministic.
        </HoverCardContent>
      </HoverCard>
      <Slider
        id="temperature"
        max={1}
        defaultValue={value}
        step={0.01}
        onValueChange={handleValueChange}
        className="[&_[role=slider]]:h-3.5 [&_[role=slider]]:w-3.5"
      />
    </div>
  )
}
