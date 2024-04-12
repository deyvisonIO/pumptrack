"use server"
import { envPublic } from "@/envPublic";
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
	const cookieStore = cookies();
	const opts = {
		cookies: {
			get(name: string) {
				return cookieStore.get(name)?.value;
			},
			set(name: string, value: string, options: CookieOptions) {
				try {
					cookieStore.set({ name, value, ...options})
				} catch(error) {
					console.log(error)
				}
			},
			remove(name: string, options: CookieOptions) {
				try {
					cookieStore.set({name, value: '', ...options })
				} catch(error) {
					console.log(error)
				}
			}

		} 
	}

	return createServerClient(envPublic.NEXT_PUBLIC_SUPABASE_URL, envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY, opts); 
} 
