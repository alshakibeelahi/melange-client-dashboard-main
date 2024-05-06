"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    var user;
    if (typeof window !== "undefined") {
      user = localStorage.getItem("user");
    }
    if (user) {
      router.push("/artist")
    } else {
      router.push("/home");
    }

  }, []);

  return <main></main>;
}
