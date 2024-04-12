import { createClient } from "@/utils/supabase/server";
import {Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export async function UserAvatar() {
	const supabase = await createClient();
	const {data} = await supabase.auth.getUser();
	console.log(data)
	const avatar: string =  data?.user?.user_metadata.avatar_url;
	const fallback: string = data?.user?.user_metadata.name.split(" ").reduce((acc: string, word: string) => acc + word[0],"");

	return (
		<Avatar>
			<AvatarImage asChild src={avatar}>
				<Image src={avatar} width={32} height={32} alt="User Profile Picture" referrerPolicy="no-referrer" />
			</AvatarImage>
			<AvatarFallback className="bg-red-950" >{fallback}</AvatarFallback>
		</Avatar>
	)
}

export function AvatarSkeleton() {
	return (
		<Skeleton className="min-h-10 min-w-10 rounded-full"/>
	)
} 
