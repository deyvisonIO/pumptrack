"use client"
import { createWorkout } from "@/actions/workout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTransition } from "react";
import { toast } from "sonner";

export function WorkoutDialog() {
  const [isPending, startTransition] = useTransition();

  const formAction = (formData: FormData) => {
    startTransition(() => {
      toast.promise(createWorkout(formData), {
        loading: "loading...",
        success: (name) => `Created "${name}" with success`,
        error: "Something went wrong...",
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="default" className="mr-4 bg-sky-500 font-medium w-20 self-end">
          create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workout</DialogTitle>
          <DialogDescription>Fill the name of your workout to create it.</DialogDescription> 
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-y-2">
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Name"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
              name="name"
              required
            />
          </div>
          <DialogFooter>
            <Button disabled={isPending} type="submit" size="sm">Submit</Button>
          </DialogFooter>
        </form> 
      </DialogContent>
    </Dialog>
  )
}
