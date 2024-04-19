import { Header, HeaderSkeleton } from "@/components/header"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WorkoutItem } from "./components/workout-item";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data:user } = await supabase.auth.getUser();
  if(!user) redirect("/login");

  return (
    <div className="bg-slate-100 h-screen">
      <Header />
      <main className="flex flex-col justify-center mx-auto  gap-2 mt-8 w-8/12">
        <Button asChild size="default" className="mr-4 bg-sky-500 font-medium w-20 self-end">
          <Link href="/create">create</Link>
        </Button>
        <WorkoutWrapper />
      </main>
    </div>
  );
}

async function WorkoutWrapper() {
  const supabase = await createClient();
  const { data }= await supabase.from("workouts").select(); 


  if(!data) return null;
  return (
    <div>
      {data.map(item => (
        <WorkoutItem key={item.id} id={item.id} name={item.name}/>
      ))}
    </div>
  )
}


