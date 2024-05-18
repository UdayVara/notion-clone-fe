"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchCard from "./SearchCard";
import { fetchDocuments } from "@/actions/DocumentActions";
import { toast } from "sonner";

function Search({ toggle }: { toggle: any }) {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState("");
  const getDocuments = async () => {
    const res = await fetchDocuments(term, true);

    if (res.success) {
      setResults(res.documents || []);
      // console.debug(res.documents);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      getDocuments();
    }, 500);

    // Cleanup function to clear the timeout if searchTerm changes before the timeout completes
    return () => clearTimeout(timerId);
  }, [term]);
  return (
    <>
      <div className=" flex flex-row  mt-3 py-1 px-2">
        <CiSearch className=" bg-none left-0 text-2xl top-2" />
        <input
          type="text"
          name="search"
          className="bg-transparent pl-6 text-lg grow focus:outline-none focus:border-none"
          id="search"
          placeholder="Search Documents Here"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
      </div>
      <hr className="mb-2" />

      {results.map((item, index) => {
        return <SearchCard toggle={toggle} document={item} key={index} />;
      })}
    </>
  );
}

export default Search;
