"use server";
import axiosInstance from "../../axios";

export const addDocument = async (parentDocument?: string) => {
  try {
    const res = await axiosInstance.post("/document", {
      parentDocument: parentDocument,
    });

    if (res.data?.statusCode == 201) {
      return { success: true, message: res.data?.message };
    } else {
      return { success: false, message: res.data?.message };
    }
  } catch (error: any) {
    console.log(error?.message);
    return { success: true, message: "Internal Server Error" };
  }
};

export const fetchDocuments = async () => {
  try {
    const res = await axiosInstance.get("/document");

    if (res.data?.statusCode == 201) {
      return {
        success: true,
        message: res.data?.message,
        documents: res.data?.document,
      };
    } else {
      return { success: false, message: res.data?.message };
    }
  } catch (error: any) {
    console.log(error?.message);
    return { success: true, message: "Internal Server Error" };
  }
};

export const updateArchieve = async (data: { id: string; status: boolean }) => {
  try {
    const res = await axiosInstance.post(`/document/archieve/${data.id}`, {
      isArchieve: data.status,
    });

    if (res.data?.statusCode == 201) {
      return { success: true, message: res.data?.message };
    } else {
      return { success: false, message: res.data?.message };
    }
  } catch (error: any) {
    console.log(error?.message);
    return { success: true, message: "Internal Server Error" };
  }
};

export const handleDelete = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/document/${id}`);

    if (res.data.statusCode == 201) {
      return { success: true, message: res.data.message };
    } else {
      return { success: false, message: res.data.message };
    }
  } catch (error) {
    return {success:false,message:"Internal Server Error"}
  }
};


export const getDocumentById = async(id:string) => {
  try {
    const res = await axiosInstance.get(`/document/${id}`);

    if (res.data.statusCode == 200) {
      return { success: true, message: res.data.message,document:res.data?.document};
    } else {
      return { success: false, message: res.data.message };
    }
  } catch (error) {
    return {success:false,message:"Internal Server Error"}
  }
}

export const saveContent = async(id:string,document:any) => {
  try {
    const res = await axiosInstance.put(`/document/save/${id}`,{
      content:document
    });

    if (res.data.statusCode == 201) {
      return { success: true, message: res.data.message};
    } else {
      return { success: false, message: res.data.message };
    }
  } catch (error) {
    return {success:false,message:"Internal Server Error"}
  }
}

export const renameDocument = async(id:string,title:any) => {
  try {
    const res = await axiosInstance.put(`/document/rename/${id}`,{
      title:title
    });

    if (res.data.statusCode == 201) {
      return { success: true, message: res.data.message};
    } else {
      return { success: false, message: res.data.message };
    }
  } catch (error) {
    return {success:false,message:"Internal Server Error"}
  }
}

export const getArchives = async () => {
  try {
    const res = await axiosInstance.get("/document/archives");

    if (res.data?.statusCode == 201) {
      return {
        success: true,
        message: res.data?.message,
        documents: res.data?.document,
      };
    } else {
      return { success: false, message: res.data?.message };
    }
  } catch (error: any) {
    console.log(error?.message);
    return { success: true, message: "Internal Server Error" };
  }
};
