"use client"

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteWorkout } from "@/actions/workout";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export interface Workout {
  id: string,
  name: string,
  data: string,
  createdAt: string,
  updatedAt: string,
} 



export const columns: ColumnDef<Workout>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({row}) => {
      const updated = formatDistanceToNow(new Date(row.getValue("updated_at")));

      return updated; 
    }
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({row}) => {
      const created = formatDistanceToNow(new Date(row.getValue("created_at")));

      return created; 
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const workout = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(workout.id)}
            >
              Copy workout ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/${workout.id}`}>View workout</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async() => {
              await deleteWorkout(workout.id); 
            }}>Delete workout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
] 
