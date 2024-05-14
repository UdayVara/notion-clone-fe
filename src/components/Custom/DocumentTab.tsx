"use client";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { open, close } from "@/redux/Slice/sidebarSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { addDocument, fetchDocuments } from "@/actions/DocumentActions";
import { toast } from "sonner"
import DocumentList from "./DocumentList";
import { IoArchiveOutline } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Search from "./Dialog/Search";
import Setting from "./Dialog/Setting";
import { set } from "@/redux/Slice/documentsSlice";
import { auth } from "../../../auth";
import { getUser, logout } from "@/actions/AuthActions";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Archives from "./Dialog/Archives";

function DocumentTab() {
  const [username, setUsername] = useState<any>();
  const sidebar: any = useSelector((store: RootState) => store.sidebar);
  const dispatch = useDispatch<AppDispatch>();
  const handleSidebar = () => {
    if (sidebar.value) {
      dispatch(close());
    } else {
      dispatch(open());
    }
    console.debug("button Clicked");
  };

  const router = useRouter();
  const getUsername = async () => {
    const res = await getUser();

    if (res.user) {
      setUsername(res.user?.name);
    } else {
      router.push("/signin");
    }
  };
  const getDocuments = async () => {
    const res = await fetchDocuments();

    if (res.success) {
      console.debug(res.documents);
      dispatch(set(res.documents));
    } else {
      toast.error(res.message);
    }
  };

  const createDocument = async () => {
    const res = await addDocument();

    if (res.success) {
      await getDocuments();
      toast.success(res.message);
    } else {
      toast.error(res.message || "Internal Server Error.");
    }
  };

  const makeUserOut = async () => {
    const res = await logout();
    router.push("/");
  };
  
  useEffect(() => {
    getUsername();
  }, []);
  return (
    <>
      <div
        className={` h-full overflow-y-auto  ${
          sidebar.value != true
            ? "-translate-x-full "
            : "translate-x-0"
        } origin-top-left  dark:bg-[#111111] dark:text-white bg-white duration-500 transition-all `}
      >
        <div
          className={`sidebar-header items-start ${
            sidebar.value ? "flex" : "hidden"
          } justify-between pt-3 pb-3 border-b border-b-neutral-600`}
        >
          <div className="flex flex-row items-center gap-2 ">
            <div className="rounded-full w-10 h-10 bg-slate-100 flex items-center justify-center text-lg dark:bg-neutral-800">
              {username?.charAt(0)}
            </div>
            <h3>{username}</h3>
          </div>
          <div className="gap-2 flex items-center mt-1 justify-center">
            <button  className="text-rose-600 hover:text-white hover:bg-rose-600 transition-all  py-1 px-2 rounded " onClick={makeUserOut}>
            Logout
            </button>
            
            <IoMdClose
              size={25}
              className="mr-2 mt-1 float-right"
              onClick={handleSidebar}
            />
          </div>
        </div>

        <div
          className={` flex-col ${
            sidebar.value ? "flex" : "hidden"
          } px-2 py-2 gap-2`}
        >
          <div className="relative ">
            <Dialog>
              <DialogTrigger className="w-full">
                <>
                  <CiSearch className="text-3xl h-full absolute top-0 left-0 bg-slate-50 dark:bg-neutral-700 p-1 border border-neutral-400 rounded" />
                  <h1 className="outline-none pl-10 text-md focus:outline-none bg-slate-100 peer dark:bg-neutral-800 focus:bg-neutral-200 text-neutral-400 dark:focus:bg-neutral-800 w-full py-1 rounded cursor-pointer text-start">
                    Search
                  </h1>
                </>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Search Documents</DialogTitle>
                  <DialogDescription>
                    <Search />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative ">
            <Dialog>
              <DialogTrigger className="w-full">
                <>
                  <IoSettingsOutline className="text-3xl h-full absolute top-0 left-0 bg-slate-50 dark:bg-neutral-700 p-1 border border-neutral-400 rounded" />
                  <h1 className="outline-none pl-10 text-md focus:outline-none bg-slate-100 peer dark:bg-neutral-800 focus:bg-neutral-200 text-neutral-400 dark:focus:bg-neutral-800 w-full py-1 rounded cursor-pointer text-start">
                    Settings
                  </h1>
                </>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>My Settings</DialogTitle>
                  <DialogDescription>
                    <Setting />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative ">
            <Dialog>
              <DialogTrigger className="w-full">
                <>
                  <IoArchiveOutline className="text-3xl h-full absolute top-0 left-0 bg-slate-50 dark:bg-neutral-700 p-1 border border-neutral-400 rounded" />
                  <h1 className="outline-none pl-10 text-md focus:outline-none bg-slate-100 peer dark:bg-neutral-800 focus:bg-neutral-200 text-neutral-400 dark:focus:bg-neutral-800 w-full py-1 rounded cursor-pointer text-start">
                    My Archives
                  </h1>
                </>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>My Archives</DialogTitle>
                  <DialogDescription>
                    <Archives />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative " onClick={createDocument}>
            <CiCirclePlus className="text-3xl h-full absolute top-0 left-0 bg-slate-50 dark:bg-neutral-700 p-1 border border-neutral-400 rounded" />
            <h1 className="outline-none pl-10 text-md focus:outline-none bg-slate-100 peer dark:bg-neutral-800 focus:bg-neutral-200 text-neutral-400 dark:focus:bg-neutral-800 w-full py-1 rounded cursor-pointer">
              New Page
            </h1>
          </div>
        </div>

        <div className="mt-2">
          <DocumentList />
        </div>
      </div>
    </>
  );
}

export default DocumentTab;
