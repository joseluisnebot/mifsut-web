"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Empresa() {
  const router = useRouter();
  useEffect(() => { router.replace("/sobre-mi"); }, [router]);
  return null;
}
