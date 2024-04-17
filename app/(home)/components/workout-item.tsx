"use client"

import { Button } from "@/components/ui/button"

interface WorkoutItem {
  name: string
} 

export function WorkoutItem({name}: WorkoutItem) {
  return (
    <div className="flex justify-between items-center bg-white px-4 py-2">
      <span>{name}</span>
      <div>
        <Button variant="secondary" className="text-sky-400 border border-transparent hover:border-sky-400">Enter</Button>
        <Button variant="link" className="text-red-500">Delete</Button>
      </div>
    </div>
  )
}
