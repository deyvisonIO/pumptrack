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


