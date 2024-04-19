"use client"

import { deleteWorkout } from "@/actions/workout"
import { Button } from "@/components/ui/button"
import { Loader2, LoaderIcon } from "lucide-react"
import { useTransition } from "react"

interface WorkoutItem {
  id: string,
  name: string
} 

export function WorkoutItem({id, name}: WorkoutItem) {
  const [isPending, startTransition] = useTransition(); 
  return (
    <div className="flex justify-between items-center bg-white px-4 py-2">
      <span>{name}</span>
      <div>
        <Button variant="secondary" className="text-sky-400 border border-transparent hover:border-sky-400" disabled={isPending}>Enter</Button>
        <Button 
          variant="link" 
          className="text-red-500" 
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              deleteWorkout(id);  
            })
          }}
        >Delete</Button>
      </div>
    </div>
  )
}
