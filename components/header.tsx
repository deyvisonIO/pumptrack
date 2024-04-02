import { signOut, useSession } from "next-auth/react";

export function Header() {
	const {data, status} = useSession();
	return (
	<div className="flex justify-around p-4 bg-black text-white">
		<div>Icon</div>
		<div>Search</div>
		<button onClick={() => signOut()}>Sign Out</button>
	</div>
	)
}
