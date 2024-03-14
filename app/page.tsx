"use client"
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <SessionProvider>
      <Body>
        Home
      </Body> 
    </SessionProvider>
  );
}

function Body({children} : { children: React.ReactNode }) {
  const {data, status} = useSession();
  if(status == "loading") {
    return (
      <div>
        Loading...
      </div>
    )
  }
  
  if(status == "unauthenticated") {
    redirect("/api/auth/signin"); 
  }

  console.log(data);
  return (
    <div>
      {children}
    </div>
  )
}
