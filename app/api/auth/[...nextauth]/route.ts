import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/env"

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET
		})
	]
})

export { handler as GET, handler as POST } 
