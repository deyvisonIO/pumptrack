"use client"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"

export default function Auth() {
  const supabase = createClient();
  const SignInWithGoogle = async () => {
    const {data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/api/auth/callback",
      }
    })
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center shrink">
      <h1 className="font-bold text-9xl fixed mb-96">PumpTrack</h1>
      <Button onClick={() => SignInWithGoogle()} className="text-2xl h-20" size="lg">Login with google</Button>
    </div>
  )
}
