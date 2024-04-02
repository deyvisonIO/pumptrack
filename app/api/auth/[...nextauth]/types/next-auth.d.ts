import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			access_token: string | null
		} & DefaultSession["user"];
		expires: DefaultSession["expires"];
	}
}
