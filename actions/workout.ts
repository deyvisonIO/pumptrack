"use server"

import { createClient } from "@/utils/supabase/server"
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function deleteWorkout(id: string) {
  console.log("id", id)
  const supabase = await createClient();
  const data = await supabase.from("workouts").delete().eq("id", id).select(); 

  console.log(data)

  revalidatePath("/");
}

export async function createDefaultWorkout() {
  const supabase = await createClient();
  const {data, error} = await supabase.from("workouts")
  .insert([
    {name: `workout ${randomUUID()}`},
    {name: `workout ${randomUUID()}`},
    {name: `workout ${randomUUID()}`},
    {name: `workout ${randomUUID()}`}
  ])

  console.log(data);
  console.log(error);

  revalidatePath("/");
}

export async function createWorkout(formData: FormData) {
  const name = formData.get("name");

  if(!name) return;

  const supabase = await createClient();
  // { error: Error | null, data: Object[]}
  const { data, error }= await supabase.from("workouts").insert({name}).select("name");

  if(!data || error) throw error; 

  revalidatePath("/");

  return name; 

}

interface Workout {
  id: string,
  user_id: string,
  name: string,
  workout: string,
  created_at: string,
  updated_at: string,
}


export async function createExercise(formData: FormData) {
  const name = formData.get("name");
  const id = formData.get("id");

  if(!name) return;

  const supabase = await createClient();
  const { data } = await supabase.from("workouts").select("workout").eq("id", id);

  if(!data) throw new Error();

  const workout = data[0].workout;

  workout.push({
    name,
    sets: [
      {
        reps: "",
        weight: "",
        intensity: "",
        notes: "",
      }
    ] 
  })



  // { error: Error | null, data: Object[]}
  const { error }= await supabase.from("workouts").update({ workout }).eq("id", id);

  if(error) throw error; 

  revalidatePath("/" + id);

}


export async function changeWorkoutName(formData: FormData) {
  const name = formData.get("name");
  const id = formData.get("id");

  if(!name) return;

  const supabase = await createClient();
  // { error: Error | null, data: Object[]}
  const { data, error }= await supabase.from("workouts").update({name}).eq("id", id).select("name");

  if(!data || error) throw error;

  revalidatePath("/" + id);

  return name; 

}
