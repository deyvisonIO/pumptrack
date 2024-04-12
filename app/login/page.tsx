"use client"
import { Button } from "@/components/ui/button";
import { SignInWithGoogle } from "./actions";

export default function Auth() {
  return (
    <div className="h-screen flex flex-col justify-center items-center shrink">
      <h1 className="font-bold text-6xl sm:text-9xl">PumpTrack</h1>
      <Button onClick={() => SignInWithGoogle()} className="text-lg sm:text-2xl h-10 mt-6 sm:h-20" size="lg">Login with google</Button>
    </div>
  )
}
