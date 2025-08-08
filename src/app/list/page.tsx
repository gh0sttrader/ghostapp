// Server file – render client-only to avoid hydration mismatch
"use client";
import dynamic from "next/dynamic";

const ListClient = dynamic(() => import("./ListClient"), { ssr: false });

export default function Page() {
  return <ListClient />; // no props that could be Promises
}
