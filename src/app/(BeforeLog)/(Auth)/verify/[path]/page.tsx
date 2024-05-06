"use client";

import Verification from "@/Components/BeforeLog/(Auth)/Verification";
import { Metadata } from "next";
import { useParams } from "next/navigation";

export default function VerifyPage() {
  const params = useParams()
  const path = params.path.toString()
  return (
    <>
      <Verification path={path}/>
    </>
  );
}
