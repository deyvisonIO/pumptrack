import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { createClient } from "@/utils/supabase/server"
import { Button } from "./ui/button";
import { SignOut } from "@/actions/auth";

export async function Header() {
	const supabase = createClient();
	const {data} = await supabase.auth.getUser();

	const avatar = data?.user?.user_metadata.avatar_url;
	const fallback = data?.user?.user_metadata.name.split(" ").reduce((acc: string, word: string) => acc + word[0],"");

	return (
	<div className="flex justify-around items-center p-4 bg-red-400 text-white">
		<div>Icon</div>
		<div>Search</div>
		<Avatar>
			<AvatarImage asChild src={avatar}>
				<Image src={avatar} width={32} height={32} alt="User Profile Picture" />
			</AvatarImage>
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	</div>
	)
}
