"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function LoginWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if(error || !data) {
    return;
  }
  
  revalidatePath("/");
}

export async function SignOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if(error) return redirect("/error");
  
  revalidatePath("/");
}
