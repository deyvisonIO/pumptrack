"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Skeleton } from "./ui/skeleton"

export function Search() {
	return (
	<form className="w-96 flex mx-2">
		<Input type="search" placeholder="search..." className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent text-red-950"/>
		<Button type="submit" className="rounded-l-none">search</Button>
	</form>
	)
}

export function SearchSkeleton() {
	return (
		<Skeleton className="h-10 w-96 mx-2" />
	)
} 
