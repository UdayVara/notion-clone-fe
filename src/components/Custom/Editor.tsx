"use client;";
import { getDocumentById, saveContent } from "@/actions/DocumentActions";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { toast } from "sonner"
import { useSelector } from "react-redux";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Button } from "../ui/button";

const initialData = [
  {
    id: "37732af7-5046-473b-bd1b-70059eed2b04",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 3,
    },
    content: [
      {
        type: "text",
        text: "You can start from here.",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "6e19786b-4b87-418e-b264-40b4350c594f",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
];
function Editor() {
  const [document, setDocument] = useState<any>({});
  const [content, setContent] = useState<any>(initialData);

  const documentObj = useSelector((store: RootState) => store.documents);
  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  }

  const editor = useCreateBlockNote({
    uploadFile,
  });
  const getDocumentWithID = async (id: string) => {
    const res = await getDocumentById(id);

    if (res.success) {
      setDocument(res?.document);
      const blocks = await editor.tryParseMarkdownToBlocks(res?.document?.content);
      editor.replaceBlocks(editor.document, blocks);
    } else {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    if (documentObj.selected != "") {
      getDocumentWithID(documentObj.selected);
    }
  }, [documentObj.selected]);
console.debug(content,"content")
  const handleSave = async () => {
    const res = await saveContent(documentObj.selected, content);
    console.debug(content);
    if (res.success) {
      toast.success("Document Saved Successfully");
    } else {
      toast.error(res.message);
    }
  };

  const onChange = async () => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setContent(markdown);
  };
  return (
    <>
      <div className="pt-16 px-2">
        <BlockNoteView
          onChange={onChange}
          formattingToolbar
          linkToolbar
          editor={editor}
          className="mt-10"
          content={content}
        />
        <Button className="ms-auto block mr-4 mt-8" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
}

export default Editor;
