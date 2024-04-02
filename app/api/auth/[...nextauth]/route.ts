import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/env"
import { envPublic } from "@/envPublic";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: envPublic.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		})
	],
	callbacks: {
		async jwt({token, user, account }) {
			if (account?.access_token) {
				token.access_token = account.access_token;
			}

			return token;
		},
		async session({session, token, user}) {
			session.user.access_token = token.access_token as string;
			return session;
		}
	},
	secret: env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST } 
