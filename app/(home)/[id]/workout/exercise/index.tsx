"use client"
import { Button } from "@/components/ui/button";
import { CirclePlus, PencilLine } from "lucide-react";
import { Jua } from "next/font/google";
import { useState } from "react";

interface ExerciseProps {
	name: string,
	sets: Set[], 
}

interface Set {
	reps: string,
	weight: string,
	intensity: string,
	notes: string,
}

interface IndexedSet extends Set {
	indx: number, 
}



export function Exercise({ name, sets }: ExerciseProps) {
	const [edit, setEdit] = useState<Boolean>(false);

	const toggleEdit = () => {
		setEdit(!edit)
	} 
	
	if(edit) {
		return (
			<form className="flex flex-col p-4 w-full bg-white rounded-lg my-4 gap-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold">{name}</h2>
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
					{sets.map((set, indx)=> <Set key={indx} indx={indx} reps={set.reps} weight={set.weight} intensity={set.intensity} notes={set.notes} />)}
				</div>
				<div className="flex justify-between">
					<Button className="flex items-center justify-start gap-x-1 hover:bg-gray-200" variant="ghost">
						<CirclePlus />
						<span className="text-base">Add Set</span>	
					</Button>
					<Button>Submit</Button>
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
				{sets.map((set, indx)=> <Set key={indx} indx={indx} reps={set.reps} weight={set.weight} intensity={set.intensity} notes={set.notes} />)}
			</div>
		</div>
	)
}

function Set({indx, reps, weight, intensity, notes}: IndexedSet) {
	return (
		<div className="flex items-center gap-x-4 text-center font-semibold h-10 text-neutral-500">
			<p className="w-32 h-10 flex items-center justify-center">{indx + 1}</p>
			<p className="w-32 h-10 flex items-center justify-center">{reps || 0 }</p>
			<p className="w-32 h-10 flex items-center justify-center">{weight || 0}</p>
			<p className="w-32 h-10 flex items-center justify-center">{intensity || 0}</p>
			<p className="w-full bg-neutral-200 bg-opacity-80  rounded-xl h-10 flex items-center justify-center">{notes}</p>
		</div>
	)
}

function Set({indx, reps, weight, intensity, notes}: IndexedSet) {
	return (
		<div className="flex items-center gap-x-4 text-center font-semibold h-10 text-neutral-500">
			<p className="w-32 h-10 flex items-center justify-center">{indx + 1}</p>
			<p className="w-32 h-10 flex items-center justify-center">{reps || 0 }</p>
			<p className="w-32 h-10 flex items-center justify-center">{weight || 0}</p>
			<p className="w-32 h-10 flex items-center justify-center">{intensity || 0}</p>
			<p className="w-full bg-neutral-200 bg-opacity-80  rounded-xl h-10 flex items-center justify-center">{notes}</p>
		</div>
	)
}

