"use client"
import { updateExercise } from "@/actions/workout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, PencilLine } from "lucide-react";
import { Jua } from "next/font/google";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface ExerciseProps {
	indx: number,
	name: string,
	sets: Set[],
}

export interface Set {
	reps: string,
	weight: string,
	intensity: string,
	notes: string,
}

interface IndexedSet extends Set {
	indx: number,
}


export function Exercise({ indx, name, sets }: ExerciseProps) {
	const { id } = useParams<{ id: string }>();
	const [edit, setEdit] = useState<Boolean>(false);
	const [clientSets, setClientSets] = useState<Set[]>(sets);
	const [clientName, setClientName] = useState<string>(name);

	const addSet = () => {
		setClientSets((sets: Set[]) => {
			const setsLength = sets.length;
			const newSet = sets[setsLength - 1];
			const newSets = sets.concat([{ ...newSet }]);
			return newSets;
		})
	}

	const toggleEdit = () => {
		setEdit(!edit)
	}

	const handleSetChange = (indx: number, property: keyof Set, value: string) => {
		setClientSets((sets: Set[]) => {
			sets[indx][property] = value;
			return sets;
		})
	}

	const formAction = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		toast.promise(updateExercise(id, indx, clientName, clientSets), {
			loading: "loading...",
			success: () => {
				toggleEdit();
				return "Exercise updated";
			},
			error: () => "Something wen't wrong"
		})
	}

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setClientName(event.target.value)
	}



	if (edit) {
		return (
			<form onSubmit={formAction} className="flex flex-col p-4 w-full bg-white rounded-lg my-4 gap-y-4">
				<div className="flex justify-between items-center">
					<Input className="text-lg font-semibold w-min" defaultValue={clientName} onChange={handleNameChange} />
					<Button variant="default" onClick={toggleEdit}>
						<PencilLine />
					</Button>
				</div>
				<div className="flex flex-col gap-y-2">
					<div className="flex text-center gap-x-4 font-semibold text-neutral-700">
						<p className="w-32">Sets</p>
						<p className="w-32">Reps</p>
						<p className="w-32">Weight</p>
						<p className="w-32">Intensity</p>
						<p className="w-full">notes</p>
					</div>
					{clientSets.map((set, indx) => <SetForm key={indx} indx={indx} reps={set.reps} weight={set.weight} intensity={set.intensity} notes={set.notes} handleSetChange={handleSetChange} />)}
				</div>
				<div className="flex justify-between">
					<Button onClick={addSet} type="button" className="flex items-center justify-start gap-x-1 hover:bg-gray-200" variant="ghost">
						<CirclePlus />
						<span className="text-base">Add Set</span>
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		)
	}

	return (
		<div className="flex flex-col p-4 w-full bg-white rounded-lg my-4 gap-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">{name}</h2>
				<Button className="hover:bg-gray-200" variant="ghost" onClick={toggleEdit}>
					<PencilLine />
				</Button>
			</div>
			<div className="flex flex-col gap-y-2">
				<div className="flex text-center gap-x-4 font-semibold text-neutral-700">
					<p className="w-32">Sets</p>
					<p className="w-32">Reps</p>
					<p className="w-32">Weight</p>
					<p className="w-32">Intensity</p>
					<p className="w-full">notes</p>
				</div>
				{sets.map((set, indx) => <Set key={indx} indx={indx} reps={set.reps} weight={set.weight} intensity={set.intensity} notes={set.notes} />)}
			</div>
		</div>
	)
}

function Set({ indx, reps, weight, intensity, notes }: IndexedSet) {
	return (
		<div className="flex items-center gap-x-4 text-center font-semibold h-10 text-neutral-500">
			<p className="w-32 h-10 flex items-center justify-center">{indx + 1}</p>
			<p className="w-32 h-10 flex items-center justify-center">{reps || 0}</p>
			<p className="w-32 h-10 flex items-center justify-center">{weight || 0}</p>
			<p className="w-32 h-10 flex items-center justify-center">{intensity || 0}</p>
			<p className="w-full bg-neutral-200 bg-opacity-80  rounded-xl h-10 flex items-center justify-center">{notes}</p>
		</div>
	)
}

interface FormSet extends IndexedSet {
	handleSetChange: (indx: number, property: keyof Set, value: string) => void
}

function SetForm({ indx, reps, weight, intensity, notes, handleSetChange }: FormSet) {
	return (
		<div className="flex items-center gap-x-4 text-center font-semibold h-10 text-neutral-500">
			<p className="w-32 h-10 flex items-center justify-center">{indx + 1}</p>
			<Input
				className="w-32 h-10 flex items-center justify-center"
				defaultValue={reps || 0}
				onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "reps", event.target.value)}
			/>
			<Input
				className="w-32 h-10 flex items-center justify-center"
				defaultValue={weight || 0}
				onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "weight", event.target.value)}
			/>
			<Input 
				className="w-32 h-10 flex items-center justify-center" 
				defaultValue={intensity || 0}
				onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "intensity", event.target.value)}
			/>
			<Input 
				placeholder="Write some notes..." 
				className="placeholder:text-neutral-400 text-neutral-800 w-full bg-neutral-200 bg-opacity-80  rounded-xl h-10 flex items-center justify-center"
				defaultValue={notes}
				onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "notes", event.target.value)}
			/>
		</div>
	)
}

