import { createClient } from "@/utils/supabase/server"
import { WorkoutTitle } from "./workout/workout-title";


interface Workout {
  id: string,
  user_id: string,
  name: string,
  data: string | null,
  created_at: string,
  updated_at: string,
}


export default async function Page({params}: { params: {id: string} }) {
  const supabase = await createClient();

  const {data, error}= await supabase.from("workouts").select().eq("id", params.id);

  // TODO: Add error handling
  if(!data || error) return null;

  const workout: Workout = data[0];

  return (
    <>
      <WorkoutTitle id={workout.id} title={workout.name}/>
      <div>{workout.data}</div>
    </>
  )
}

