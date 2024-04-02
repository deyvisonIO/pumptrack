"use client"
import { envPublic } from "@/envPublic";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Header } from "@/components/header"

export default function Home() {
  const {data, status} = useSession();

  if(status === "loading") {
    return (
      <div>
        Loading...
      </div>
    )
  } 

  if(status === "unauthenticated") {
    redirect("/api/auth/signin")
  }

  return (
    <>
      <Header />
      Home
    </>

  );
}
