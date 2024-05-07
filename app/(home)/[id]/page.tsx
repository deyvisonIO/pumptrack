import { createClient } from "@/utils/supabase/server"
import { WorkoutTitle } from "./workout/workout-title";
import { CreateExerciseBtn } from "./workout/exercise/create-exercise-btn";
import { Exercise } from "./workout/exercise";


interface Workout {
  id: string,
  user_id: string,
  name: string,
  workout: string,
  created_at: string,
  updated_at: string,
}


export default async function Page({params}: { params: {id: string} }) {
  const supabase = await createClient();

  const {data, error}= await supabase.from("workouts").select().eq("id", params.id);

  // TODO: Add error handling
  if(!data || error) return null;

  const workout: Workout = data[0];

  console.log(workout)

  const exercises = workout.workout;

  return (
    <div className="flex flex-col items-center w-8/12 mx-auto transition-all">
      <WorkoutTitle id={workout.id} title={workout.name}/>
      {exercises.map((exercise, indx)=> <Exercise key={indx} name={exercise.name} sets={exercise.sets} />)}
      <CreateExerciseBtn />
    </div>
  )
}

