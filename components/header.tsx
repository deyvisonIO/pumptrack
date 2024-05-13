import { Dumbbell } from "lucide-react";
import { AvatarSkeleton, UserAvatar } from "./user-avatar";
import { UserDropDown } from "./user-dropdown";
import Link from "next/link";

export async function Header() {
	return (
	<div className="bg-red-400 text-white">
		<header className="flex justify-between items-center mx-auto p-4 w-full lg:w-8/12">
			<Link href="/">
				<Dumbbell size={32} />
			</Link>
			<UserDropDown>
				<UserAvatar />
			</UserDropDown>
		</header>	
	</div>
	)
}

export function HeaderSkeleton() {
	return (
		<div className="flex justify-around items-center p-4 text-white bg-red-400">
			<AvatarSkeleton />
			<AvatarSkeleton />
		</div>
	)
} 
