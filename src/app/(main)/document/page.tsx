"use client";
import { logout } from "@/actions/AuthActions";
import DocumentTab from "@/components/Custom/DocumentTab";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Header from "@/components/Custom/Header";
import dynamic from "next/dynamic";
import { addDocument, fetchDocuments } from "@/actions/DocumentActions";
import toast from "react-hot-toast";
import { set, setSelected } from "@/redux/Slice/documentsSlice";

const Editor = dynamic(() => import("@/components/Custom/Editor"), {
  ssr: false,
});
function Page() {
  const [mount, setMount] = useState(false);
  const router = useRouter();

  const sidebar = useSelector((store: RootState) => store.sidebar);
  const dispatch = useDispatch();
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
      toast.success(res.message || "Document Created Successfully");
      dispatch(setSelected(res.document?.id));
      getDocuments()
    } else {
      toast.error(res.message || "Internal Server Error.");
    }
  };
  useEffect(() => {
    setMount(true);
  }, []);
  const document = useSelector((root: RootState) => root.documents);
  return (
    <>
      {mount && (
        <div className="w-full h-full flex flex-row gap-2">
          <Header />
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel hidden={!sidebar.value}>
              <DocumentTab />
            </ResizablePanel>
            <ResizableHandle hidden={!sidebar.value} />
            <ResizablePanel>
              {document.selected == "" ? (
                <div className="w-full h-full pt-16">
                  <div className="grow w-full h-full flex justify-center items-center">
                    <div>
                      <h3 className="font-semibold text-xl">
                        Get Started By Creating Your First Note
                      </h3>
                      <Button
                        onClick={createDocument}
                        className="block mx-auto mt-3 text-md  gap-1 "
                      >
                        <IoIosAddCircleOutline className="inline-block text-xl font-semibold" />{" "}
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Editor />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </>
  );
}

export default Page;
