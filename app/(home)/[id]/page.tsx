import { createClient } from "@/utils/supabase/server"
import { WorkoutTitle } from "./workout/workout-title";
import { CreateExerciseBtn } from "./workout/exercise/create-exercise-btn";
import { Exercise, Set } from "./workout/exercise";


interface Exercise {
  name: string,
  sets: Set[],
}

interface Workout {
  id: string,
  user_id: string,
  name: string,
  workout: Exercise[] | [], 
  created_at: string,
  updated_at: string,
}


export default async function Page({params}: { params: {id: string} }) {
  const supabase = await createClient();

  const {data, error}= await supabase.from("workouts").select().eq("id", params.id);

  // TODO: Add error handling
  if(!data || error) return null;

  const workout: Workout = data[0];

  const exercises = workout.workout;

  return (
    <div className="flex flex-col items-center lg:w-8/12 mx-auto transition-all">
      <WorkoutTitle id={workout.id} title={workout.name}/>
      {exercises.map((exercise, indx: number)=> <Exercise key={indx} indx={indx} name={exercise.name} sets={exercise.sets} />)}
      <CreateExerciseBtn />
    </div>
  )
}

