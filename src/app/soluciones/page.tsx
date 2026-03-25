"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Soluciones() {
  const router = useRouter();
  useEffect(() => { router.replace("/colaboracion"); }, [router]);
  return null;
}
