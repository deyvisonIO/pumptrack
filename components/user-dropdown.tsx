"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export async function UserDropDown({children}: { children: React.ReactNode }) {
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
					{children}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Account</DropdownMenuLabel>
					<DropdownMenuItem onClick={signOut} className="hover:bg-[#457b9d] hover:text-white hover:cursor-pointer font-medium">
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

