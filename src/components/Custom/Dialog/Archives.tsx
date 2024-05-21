"use client";
import { fetchDocuments, getArchives, updateArchieve } from "@/actions/DocumentActions";
import { set } from "@/redux/Slice/documentsSlice";
import React, { useEffect, useState } from "react";
import { toast } from "sonner"
import { ImUndo2 } from "react-icons/im";
import { useDispatch } from "react-redux";

function Archives() {
  const [archieves, setArchives] = useState([]);
    const dispatch = useDispatch()
  const getDocuments = async () => {
    const res = await fetchDocuments();

    if (res.success) {
      console.debug(res.documents);
      dispatch(set(res.documents));
    } else {
      toast.error(res.message);
    }
  };
  const getArchiveDocuments = async () => {
    const res = await getArchives();

    if (res.success) {
      console.debug("archives", res.documents);
      setArchives(res.documents);
      getDocuments()
    } else {
      toast.error(res.message);
    }
  };

  const unarchiveDocument = async (id: string) => {
    const res = await updateArchieve({ id: id, status: false });

    if (res.success) {
      toast.success("Unarchived Successfully");
      getArchiveDocuments();
    } else {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    getArchiveDocuments();
  }, []);
  return (
    <>
      <div className="border-t mt-2 pt-2">
        {archieves &&
          archieves.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="bg-slate-100 group relative dark:bg-neutral-800 rounded my-2 py-2 text-md px-2"
              >
                {item.title}
                <span
                  className="absolute scale-0 group-hover:scale-100 flex h-full top-0 w-8  transition-all duration-200 origin-right justify-center items-center text-lg cursor-pointer right-0 dark:bg-neutral-900  bg-slate-200"
                  onClick={() => {
                    unarchiveDocument(item?.id);
                  }}
                >
                  <ImUndo2 />
                </span>
              </div>
            );
          })}

        {archieves && archieves.length == 0 && (
          <div className="h-20 flex flex-col items-center justify-center">
            <h6 className="text-center text-neutral-500">No Documents Found</h6>
          </div>
        )}
      </div>
    </>
  );
}

export default Archives;
