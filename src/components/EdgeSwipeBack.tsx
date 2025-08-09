"use client";
import { useRouter } from "next/navigation";
import { useEdgeSwipeBack } from "@/lib/useEdgeSwipeBack";

export default function EdgeSwipeBack() {
  const router = useRouter();
  useEdgeSwipeBack(() => {
    const prev = sessionStorage.getItem("prevPath");
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else if (prev) router.push(prev);
    else router.push("/list");
  });
  return null;
}
