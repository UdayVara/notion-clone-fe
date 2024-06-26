"use server";

import { auth, signIn, signOut } from "../../auth";
import axiosInstance from "../../axios";

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    
    if (res) {
      return { success: true, message: "Signed in Successfull" };
    } else {
      return { success: false, message: res.message };
    }
  } catch (error: any) {
    console.log("server message",error.cause.err.message);
    return {
      success: false,
      message: error.cause.err.message || "Internal Server Error",
    };
  }
};

export const newUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const result = await axiosInstance.post("/user/signup", data);

    if (result.data.statusCode == 201) {
      return {success:true,message:"Account Created Successfully."}
    } else {
      throw new Error(result.data.message || "Internal Server Error");
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};


export const getUser = async() => {
  const res = await auth()

  if(res?.user){
    return {success:true,user:res.user}
  }else{
    return {success:false,message:"Internal Server Error."}
  }
}


export const logout = async() => {
  const res = await signOut()
  return res
}
