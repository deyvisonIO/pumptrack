"use client"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SignOut } from "@/actions/auth";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

export function UserAvatar() {
	const [avatar, fallback] = useUser();
	const router = useRouter();

	async function signOut() {
		const supabase = createClient();
		const { error } = await supabase.auth.signOut();
		if(error) router.push("/error");
		router.push("/login")
	} 

	return (
		<div className="flex items-center justify-between">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage asChild src={avatar}>
							<Image src={avatar} width={32} height={32} alt="User Profile Picture" referrerPolicy="no-referrer" />
						</AvatarImage>
						<AvatarFallback className="bg-red-950" >{fallback}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Account</DropdownMenuLabel>
					<DropdownMenuItem onClick={signOut} className="hover:bg-[#457b9d] hover:text-white font-medium">
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

function useUser() {
	const [avatar, setAvatar] =  useState("");
	const [fallback, setFallback] = useState("");
	useEffect(() => {
		async function getUser() {
			const supabase = createClient();
			const {data} = await supabase.auth.getUser();

			setAvatar(data?.user?.user_metadata.avatar_url);
			setFallback(data?.user?.user_metadata.name.split(" ").reduce((acc: string, word: string) => acc + word[0],""));
		}
		getUser();
	},[]);

	return [avatar, fallback]
}
