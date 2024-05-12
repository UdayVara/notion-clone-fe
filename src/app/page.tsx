"use client"
import Footer from "@/components/Custom/Footer";
import Header from "@/components/Custom/Header";
import { ModeToggle } from "@/components/Custom/ModeToggler";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const theme = useTheme()
  const [mount,setMount] = useState(false)
  console.debug(theme)
  useEffect(()=>{
    setMount(true)
  },[])
  return (
    <>
      <Header />
   {mount && <div className="flex flex-col w-full h-full gap-5 pb-5 px-1">
      <div className="body w-full grow pt-24">
        <h3 className="text-3xl text-center font-bold text-black lg:max-w-[30%] mx-auto md:max-w-[50%] max-w-[80%] dark:text-white mb-4">Your Ideas, Documents, & Plans.Unified. Welcome to Notion</h3>
        <h4 className="text-xl text-center font-semibold lg:max-w-[25%] md:max-w-[40%] max-w-[70%] mb-3 block mx-auto">Notion is Connected Workspace where better, faster work happens</h4>
          <Image src={`/Images/${theme.resolvedTheme == "dark" ?"notion-hero-image-white.svg" : "notion-hero-image-black.svg"}`} alt="Failed To Load" height={1000} width={1000} className="h-auto lg:w-[550px] mt-5 md:[400px] w-[90%] block mx-auto"/>
      </div>
      <Footer />
    </div>}
      
    </>
  );
}
