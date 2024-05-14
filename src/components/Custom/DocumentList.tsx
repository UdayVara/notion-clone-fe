"use client";

import { addDocument, fetchDocuments } from "@/actions/DocumentActions";
import React, { useEffect, useState } from "react";
import { toast } from "sonner"
import DocumentCard from "./DocumentCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { set } from "@/redux/Slice/documentsSlice";

function DocumentList() {
  const documents:any = useSelector((store:RootState)=>store.documents)
  const dispatch = useDispatch()
  const getDocuments = async () => {
    const res = await fetchDocuments();

    if (res.success) {
      // console.debug(res.documents);
      dispatch(set(res.documents))
      // toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const createDocument = async(id?:string) => {
    const res = await addDocument(id)

    if(res.success){
      getDocuments()
      toast.success(res.message)
    }else{
      toast.error(res.message || "Internal Server Error.")
    }
  }
  useEffect(() => {
    getDocuments();
  }, []);
  console.debug(documents)
  return (
    <>
      <h1 className="pl-2 text-xl font-semibold">My Documents</h1>
      <div className="mt-1 pt-1">
        {documents &&
          documents.value?.length != 0 &&
          documents.value?.map((item:any, index:any) => {
            return <DocumentCard addDocument={createDocument} key={index} document={item} level={1}/>;
          })}
      </div>
    </>
  );
}

export default DocumentList;
