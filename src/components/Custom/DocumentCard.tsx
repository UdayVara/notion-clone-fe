"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  fetchDocuments,
  handleDelete,
  renameDocument,
  updateArchieve,
} from "@/actions/DocumentActions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { set, setSelected } from "@/redux/Slice/documentsSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";

function DocumentCard({
  document,
  level,
  addDocument,
}: {
  document: any;
  level: number;
  addDocument: any;
}) {
  const [isOpen, setOpen] = useState(false);
  const [rename, setRename] = useState(false);
  const [title, setTitle] = useState(document?.title);
  const router = useRouter();
  const dispatch = useDispatch();

  const refreshDocs = async () => {
    const docs = await fetchDocuments();

    if (docs.success) {
      dispatch(set(docs.documents));
    }
  };
  const updateArchieveStatus = async () => {
    const status = !document.isArchieve;
    const res = await updateArchieve({ id: document.id, status });

    if (res.success) {
      refreshDocs();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleDeleteDoc = async () => {
    const res = await handleDelete(document.id);

    if (res.success) {
      refreshDocs();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const selectedDocument = useSelector(
    (root: RootState) => root.documents
  ).selected;

  const handleRename = async(e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter"){
      if(title.length >1){
        const res = await renameDocument(document?.id,title);

        if(res.success){
          await refreshDocs()
          toast.success("Renamed Successfully")
        }
      }else{
        toast.error("Title Cannot be Empty")
      }
      setRename(false)
      
    }
  }
  
  return (
    <>
      <div
        className={`py-1 flex flex-row relative hover:bg-slate-200  dark:hover:bg-neutral-800 cursor-default transition-all items-center gap-2 px-2 ${
          selectedDocument == document?.id
            ? "dark:bg-neutral-700 bg-slate-200"
            : ""
        } `}
        onClick={() => {
          setOpen(!isOpen);
        }}
        style={{
          paddingLeft: `${document.children ? level * 10 : level * 25}px`,
        }}
      >
        {document.children &&
          (!isOpen ? (
            <MdKeyboardArrowDown className="text-2xl cursor-pointer" />
          ) : (
            <MdKeyboardArrowUp className="text-2xl cursor-pointer" />
          ))}
        {rename ? (
          <input
            type="text"
            className={`grow bg-transparent focus:border-none px-2 py-1 transition-all ${rename ? "outline" : "outline-none"}`}
            onChange={(e)=>{
              setTitle(e.target.value)
            }}
            onKeyDown={handleRename}
            defaultValue={title}
          />
        ) : (
          <h2
            onClick={() => {
              dispatch(setSelected(document.id));
            }}
            className="grow"
          >
            {document.title}
          </h2>
        )}

        <div className="flex flex-row items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <PiDotsThreeOutlineLight className=" text-lg cursor-pointer transition-all" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setRename(!rename);
                }}
                className="flex items-center gap-2"
              >
                <MdDriveFileRenameOutline className="w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 "
                onClick={updateArchieveStatus}
              >
                {" "}
                <MdOutlineArchive className="w-4" />
                Archieve
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={handleDeleteDoc}
              >
                <FaRegTrashCan className="text-md w-4" />
                Trash
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <FaRegEdit className="text-md w-4" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <FiPlus
            className=" text-xl cursor-pointer transition-all"
            onClick={() => {
              addDocument(document.id);
            }}
          />
        </div>
      </div>
      {isOpen &&
        document.children &&
        document.children.map((child: any, index: number) => {
          return (
            <DocumentCard
              addDocument={addDocument}
              key={index}
              document={child}
              level={level + 1}
            />
          );
        })}
    </>
  );
}

export default DocumentCard;
