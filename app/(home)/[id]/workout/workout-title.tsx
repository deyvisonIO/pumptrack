"use client"

import { changeWorkoutName } from "@/actions/workout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilLine } from "lucide-react";
import { ElementRef, useRef, useTransition } from "react";
import { toast } from "sonner";

export function WorkoutTitle({ id, title }: { id: string, title: string }) {
	return (
		<div className="flex justify-between items-center w-8/12 py-4 px-4 mx-auto my-4 bg-white rounded-lg">
			<h1 className="font-bold text-xl">
				{title}
			</h1>
			<WorkoutTitleDialog  id={id} title={title}/>
		</div>
	)
}

function WorkoutTitleDialog({ id, title }: { id: string, title: string}) {
	const [isPending, startTransition] = useTransition();
	const closeRef = useRef<ElementRef<"button">>(null);

	const formAction = (formData: FormData) => {
		formData.set("id", id);

		startTransition(() => {
			toast.promise(changeWorkoutName(formData), {
				loading: "loading...",
				success: (name) => {
					closeRef?.current?.click();
					return `Changed name to "${name}"`
				},
				error: "Something went wrong...",
			});
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<PencilLine />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Name</DialogTitle>
					<DialogDescription>Edit the name of your workout.</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="flex flex-col gap-y-2">
					<div>
						<Label>Name</Label>
						<Input
							placeholder="Name"
							className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
							name="name"
							defaultValue={title}	
							required
						/>
					</div>
					<DialogFooter>
						<Button disabled={isPending} type="submit" size="sm">Submit</Button>
					</DialogFooter>
				</form>
				<DialogClose hidden ref={closeRef}>Close</DialogClose>
			</DialogContent>
		</Dialog>
	)
}
