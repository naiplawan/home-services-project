"use client";

import dynamic from "next/dynamic";
import LoadingState from "../src/components/ui/loading-state.jsx";

const Runtime = dynamic(() => import("../src/NextRuntime.jsx"), {
  ssr: false,
  loading: () => <LoadingState label="กำลังโหลด Home Services" />,
});

export default function ClientRuntime() {
  return <Runtime />;
}
