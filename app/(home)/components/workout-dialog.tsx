import { createDefaultWorkout } from "@/actions/workout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WorkoutDialog() {
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
          <DialogDescription>Fill the name of your workout to create it. Click submit when your done.</DialogDescription> 
        </DialogHeader>
        <form action={createDefaultWorkout}>
          <div>
          <Label>Name</Label>
          <Input
            placeholder="Name"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
          />
          </div>
        </form> 
        <DialogFooter>
          <Button type="submit" size="sm">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
