"use server"
import { createClient } from "@/utils/supabase/server";
import { getLocationOrigin } from "next/dist/shared/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function SignInWithGoogle() {
  const url = headers().get("referer");
  const {protocol, host}= new URL(url as string);

  const supabase = await createClient();
  const {data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${protocol}//${host}/api/auth/callback`,
      }
    });

  if(error) redirect("/error")

  if(data.url) redirect(data.url);

}
