
"use client";
import dynamic from "next/dynamic";

const AccountsClient = dynamic(() => import("./AccountsClient"), { ssr: false });

export default function Page() {
  return <AccountsClient />;
}
