"use client"

import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/new-york/ui/hover-card"
import { Label } from "@/registry/new-york/ui/label"
import { Slider } from "@/registry/new-york/ui/slider"

interface TopPSelectorProps {
  defaultValue: number[]
  onValueChange: (value: number[]) => void
}

export function TopPSelector({ defaultValue, onValueChange }: TopPSelectorProps) {
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
              <Label htmlFor="top-p" className="text-xs">Top P</Label>
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
          Controls diversity via nucleus sampling: 0.5 means half of all
          likelihood-weighted options are considered.
        </HoverCardContent>
      </HoverCard>
      <Slider
        id="top-p"
        max={1}
        defaultValue={value}
        step={0.01}
        onValueChange={handleValueChange}
        className="[&_[role=slider]]:h-3.5 [&_[role=slider]]:w-3.5"
      />
    </div>
  )
}
