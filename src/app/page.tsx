import Image from "next/image";

import { Metadata } from "next";
import Hero from "@/components/Hero";
 import B2BNav from "@/components/B2BNav"
 import WeddingLandingPage from '@/components/WeddingLandingPage'
export const metadata: Metadata = {
  title: "WeTailor4u",
  description: "Welcome to WeTailor4u",
  // other metadata
};

export default function Home() {
  return (
    <>


    <B2BNav/>

 <Hero />
 <WeddingLandingPage/>
     </>
  );
}
