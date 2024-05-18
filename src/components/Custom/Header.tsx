"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggler";
import { RiNotionFill } from "react-icons/ri";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { close, open } from "@/redux/Slice/sidebarSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { auth } from "../../../auth";
import { getUser } from "@/actions/AuthActions";
function Header() {
  const sidebar = useSelector((root: RootState) => root.sidebar);
  const dispatch = useDispatch<AppDispatch>();
  const [user,setUser] = useState<any>()
  const [mount,setMount] = useState(false)
  const handleSidebar = () => {
    if (sidebar.value) {
      dispatch(close());
    } else {
      dispatch(open());
    }
  };
  const url = usePathname();
  const theme = useTheme();
  
  const getUserClient = async() => {
    const res = await getUser()
    setUser(res?.user)
  }
console.debug(user)
  useEffect(()=>{
    getUserClient()
    setMount(true)
  },[])
  return (
    <>
      {mount && <div className="w-full fixed top-0 lg:pr-10 lg:pl-7 md:pr-5 md:pl-3 py-2 bg-white flex justify-between items-center dark:bg-[#111111] dark:text-white">
        <div className="flex flex-row gap-2 items-center">
          {url != "/" && <RxHamburgerMenu onClick={handleSidebar} />}
          <h4 className="text-black dark:text-white flex  items-center gap-1 text-lg font-semibold">
            <Link href={""}>
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
              </Link>
            Notion
          </h4>
        </div>
        <div className="items-center gap-2 flex">
          {!user ? <Link href={"/signin"}  className="hover:font-semibold transition-all">Sign in</Link>: 
          <Link href={"/document"}  className="hover:font-semibold transition-all">Home</Link> }
          <ModeToggle />
        </div>
      </div>}
    </>
  );
}

export default Header;
