import { env } from "@/env";
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
	const cookieClient = cookies();
	const opts = {
		cookies: {
			get(name: string) {
				return cookieClient.get(name)?.value;
			},
			set(name: string, value: string, options: CookieOptions) {
				try {
					cookieClient.set({ name, value, ...options})
				} catch(error) {
					console.log(error)
				}
			},
			remove(name: string, options: CookieOptions) {
				try {
					cookieClient.set({name, value: '', ...options })
				} catch(error) {
					console.log(error)
				}
			}

		} 
	}

	return createServerClient(env.SUPABASE_URL, env.SUPABASE_API_KEY, opts); 
} 
