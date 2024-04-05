"use client"
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
    <div className="h-screen">
      <button onClick={() => SignInWithGoogle()}>Login</button>
    </div>
  )
}
