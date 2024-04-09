import { Header, HeaderSkeleton } from "@/components/header"
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {data, error} = await supabase.auth.getUser();

  if(error || !data?.user) return redirect("/login");

  return (
    <>
      <Header />
    </>
  );
}
