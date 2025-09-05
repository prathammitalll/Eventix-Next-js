"use client"

import { Suspense } from "react";
import RegisterEvent from "@/app/pages/RegisterEvent";

export default function RegisterEventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterEvent />
    </Suspense>
  );
}
