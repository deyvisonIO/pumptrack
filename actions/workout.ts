"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

export async function deleteWorkout(id: string) {
  console.log("id", id)
  const supabase = await createClient();
  const data = await supabase.from("workouts").delete().eq("id", id).select(); 

  console.log(data)

  revalidatePath("/");
}
