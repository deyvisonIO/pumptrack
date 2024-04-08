import { Search } from "./search";
import { UserAvatar } from "./user-avatar";

export async function Header() {

	return (
	<div className="flex justify-around items-center p-4 text-white bg-red-400">
		<div>Icon</div>
		<Search />
		<UserAvatar />
	</div>
	)
}
