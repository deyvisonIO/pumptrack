"use client"
import { updateExercise } from "@/actions/workout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
			<form onSubmit={formAction}className="flex flex-col p-4 w-full bg-white rounded-lg my-4 gap-y-4">
				<div className="flex justify-between items-center">
					<Input className="text-lg font-semibold" value={clientName} onChange={handleNameChange} />
					<Button className="hover:bg-gray-200" variant="ghost" onClick={toggleEdit}>
						<PencilLine />
					</Button>
				</div>
				<Table >
				  <TableHeader>
					<TableRow className="font-semibold">
					  <TableHead className="text-center w-32">Sets</TableHead>
					  <TableHead className="text-center w-32">Reps</TableHead>
					  <TableHead className="text-center w-32">Weight</TableHead>
					  <TableHead className="text-center w-32">Intensity</TableHead>
					  <TableHead className="text-center w-full">Notes</TableHead>
					</TableRow>
				  </TableHeader>
				  <TableBody>
					{clientSets.map((set, indx) => <SetForm key={indx} indx={indx} reps={set.reps} weight={set.weight} intensity={set.intensity} notes={set.notes} handleSetChange={handleSetChange} />)}
				  </TableBody>
				</Table>
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
			<Table >
			  <TableHeader>
				<TableRow className="font-semibold">
				  <TableHead className="text-center w-32">Sets</TableHead>
				  <TableHead className="text-center w-32">Reps</TableHead>
				  <TableHead className="text-center w-32">Weight</TableHead>
				  <TableHead className="text-center w-32">Intensity</TableHead>
				  <TableHead className="text-center w-full">Notes</TableHead>
				</TableRow>
			  </TableHeader>
			  <TableBody>
				{sets.map((set, indx) => <Set key={indx} indx={indx} reps={set.reps} weight={set.weight} intensity={set.intensity} notes={set.notes} />)}
			  </TableBody>
			</Table>
		</div>
	)
}

function Set({ indx, reps, weight, intensity, notes }: IndexedSet) {
	return (
		<TableRow className="font-semibold text-muted-foreground">
		  <TableCell className="text-center">{indx + 1}</TableCell>
		  <TableCell className="text-center">{reps || 0}</TableCell>
		  <TableCell className="text-center">{weight || 0}</TableCell>
		  <TableCell className="text-center">{intensity || 0}</TableCell>
		  <TableCell className="text-center w-full">{notes}</TableCell>
		</TableRow>
	)
}

interface FormSet extends IndexedSet {
	handleSetChange: (indx: number, property: keyof Set, value: string) => void
}

function SetForm({ indx, reps, weight, intensity, notes, handleSetChange }: FormSet) {

	return (
		<TableRow className="font-semibold text-muted-foreground">
			<TableCell className="text-center">{indx + 1}</TableCell>
			<TableCell className="text-center">
				<Input
					className="w-16 h-10 text-center flex items-center justify-center"
					defaultValue={reps || 0}
					onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "reps", event.target.value)}
				/>
			</TableCell>
			<TableCell className="text-center">
				<Input
					className="w-16 h-10 text-center flex items-center justify-center"
					defaultValue={weight || 0}
					onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "weight", event.target.value)}
				/>
			</TableCell>
			<TableCell className="text-center">
				<Input 
					className="w-16 h-10 text-center flex items-center justify-center" 
					defaultValue={intensity || 0}
					onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "intensity", event.target.value)}
				/>
			</TableCell>
			<TableCell className="text-center w-full">
				<Input 
					placeholder="Write some notes..." 
					className="min-w-40 placeholder:text-neutral-400 text-neutral-800 w-full bg-neutral-200 bg-opacity-80  rounded-xl h-10 flex items-center justify-center"
					type="text"
					defaultValue={notes}
					onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetChange(indx, "notes", event.target.value)}
				/>
			</TableCell>
		</TableRow>
	)
}

