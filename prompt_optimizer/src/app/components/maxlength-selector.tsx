"use client"

import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/new-york/ui/hover-card"
import { Label } from "@/registry/new-york/ui/label"
import { Slider } from "@/registry/new-york/ui/slider"

interface MaxLengthSelectorProps {
  defaultValue: number[]
  onValueChange: (value: number[]) => void
}

export function MaxLengthSelector({ defaultValue, onValueChange }: MaxLengthSelectorProps) {
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
              <Label htmlFor="maxlength" className="text-xs">Maximum Length</Label>
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
          The maximum number of tokens to generate. Requests can use up to 2,048
          tokens shared between prompt and completion. The exact limit varies by
          model. (One token is roughly 4 characters for normal English text)
        </HoverCardContent>
      </HoverCard>
      <Slider
        id="maxlength"
        max={4000}
        defaultValue={value}
        step={1}
        onValueChange={handleValueChange}
        className="[&_[role=slider]]:h-3.5 [&_[role=slider]]:w-3.5"
      />
    </div>
  )
}
