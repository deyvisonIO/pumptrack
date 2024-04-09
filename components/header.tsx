import { Dumbbell } from "lucide-react";
import { Search, SearchSkeleton } from "./search";
import { AvatarSkeleton, UserAvatar } from "./user-avatar";

export async function Header() {

	return (
	<div className="flex justify-around items-center p-4 text-white bg-red-400">
		<Dumbbell size={32} />
		<Search />
		<UserAvatar />
	</div>
	)
}

export function HeaderSkeleton() {
	return (
		<div className="flex justify-around items-center p-4 text-white bg-red-400">
			<AvatarSkeleton />
			<SearchSkeleton />
			<AvatarSkeleton />
		</div>
	)
} 
