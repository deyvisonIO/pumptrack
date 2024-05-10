import { Header, HeaderSkeleton } from "@/components/header"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { columns } from "./components/workouts/columns";
import { DataTable } from "./components/workouts/data-table";
import { WorkoutDialog } from "./components/workout-dialog";

export default async function Home() {
  const supabase = await createClient();
  const { data:user } = await supabase.auth.getUser();
  if(!user) redirect("/login");

  return (
    <main className="flex flex-col justify-center mx-auto gap-2 mt-8 transition-transform lg:w-8/12">
      <WorkoutDialog />
      <WorkoutWrapper />
    </main>
  );
}

async function WorkoutWrapper() {
  const supabase = await createClient();
  const { data }= await supabase.from("workouts").select(); 

  if(!data) return null;

  return (
    <Suspense fallback={'Loading...'}>
      <DataTable columns={columns} data={data}/> 
    </Suspense>
  )
}


