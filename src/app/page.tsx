import Image from "next/image";

import { Metadata } from "next";
import Hero from "@/components/Hero";
 
export const metadata: Metadata = {
  title: "WeTailor4u",
  description: "Welcome to WeTailor4u",
  // other metadata
};

export default function Home() {
  return (
    <>
 <Hero />
     </>
  );
}
