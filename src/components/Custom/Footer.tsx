"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiNotionFill } from "react-icons/ri";

function Footer() {
  const theme = useTheme();
  return (
    <>
      <div className="w-full lg:px-10 md:px-5 flex justify-between items-center pb-2 dark:text-white text-black">
        <h4 className="text-black dark:text-white flex gap-1  items-center">
          <Image
            src={`/Images/${
              theme.resolvedTheme == "dark"
                ? "notion-image-white.svg"
                : "notion-image-black.svg"
            }`}
            alt="Failed To Load"
            className="h-7 w-auto"
            width={1000}
            height={1000}
          />{" "}
          Notion
        </h4>

        <div className="flex md:gap-4 gap-2 flex-row lg:text-base md:text-sm text-xs gao-2">
          <Link href={"#"}>Privacy Policy</Link>
          <Link href={"#"}>Terms & Conditions</Link>
        </div>
      </div>
    </>
  );
}

export default Footer;
