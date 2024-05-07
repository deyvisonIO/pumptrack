"use client"

import { createExercise } from "@/actions/workout";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useTransition } from "react"
import { toast } from "sonner";

export function CreateExerciseBtn() {
	const {id}= useParams<{id: string}>();
	const [isPending, startTransition] = useTransition();
	const closeRef = useRef<ElementRef<"button">>(null);

	const formAction = (formData: FormData) => {
		formData.set("id", id)
		startTransition(() => {
			toast.promise(createExercise(formData), {
				loading: "loading...",
				success: () => {
					closeRef?.current?.click();
					return "Workout created."
				},
				error: "Something went wrong...",
			});
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="lg" className="w-8/12">Create exercise</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Exercise</DialogTitle>
					<DialogDescription>Write the exercise name to create it.</DialogDescription>
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
				<DialogClose hidden ref={closeRef}>Close</DialogClose>
			</DialogContent>
		</Dialog>
	)
}

