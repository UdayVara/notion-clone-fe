"use client";
import { ModeToggle } from "@/components/Custom/ModeToggler";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/auth";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchemaType } from "@/schemas/auth";
import { login } from "@/actions/AuthActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Signin() {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors,touchedFields},
  } = useForm<signInSchemaType>({ resolver: zodResolver(signInSchema) });

  const router = useRouter()
  const onSubmit : SubmitHandler<signInSchemaType> =  async(data) => {
    const res = await login(data)
    if(res.success){
      toast.success("Signin Successfull")
      router.push("/document")
    }else{
      console.log("failure" + res.message + res)
      toast.error(res.message)

    }
  }; 

  return (
    <>
      <div className="w-full bg-white dark:bg-[#111111] px-2 py-2 flex flex-row items-center justify-between ">
        <Link href={"/"} className="text-black  dark:text-white flex  items-center gap-1 text-lg font-semibold py-2">
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
          Notion
        </Link>
        <ModeToggle />
      </div>

      <div className="lg:w-[450px] rounded md:w-[500px] w-full md:px-6 py-3 px-4 max-w-[95%] mx-auto bg-white dark:bg-neutral-800 dark:border-0 border shadow-sm flex mt-16 flex-col gap-2 ">
        <h1 className=" text-center text-2xl font-semibold mb-5">
          Sign in For Notion
        </h1>
        
        <div className="flex flex-col gap-1 my-1">
          <h3>Email </h3>
          <input
            type="email"
            {...register("email")}
            className="py-1 px-1 bg-slate-100 dark:bg-neutral-700 dark:focus:outline-none rounded"
          />
          <span className="text-red-700 text-sm">
            {touchedFields.email || errors.email && errors?.email?.message || " "}
          </span>
        </div>
        <div className="flex flex-col gap-1 my-1">
          <h3>Password </h3>
          <input
            type="text"
            {...register("password")}
            className="py-1 px-1 bg-slate-100 dark:bg-neutral-700 dark:focus:outline-none rounded"
          />
          <span className="text-red-700 text-sm">
            {touchedFields.password || errors.password && errors?.password?.message || " "}
          </span>
        </div>
        <Button
          className="mt-5 mb-2 text-md dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 font-semibold cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          Sign in
        </Button>
        <Link
          href={"/signup"}
          className="text-center mb-3 hover:font-semibold transition-all mt-3"
        >
          Don't Have an Account ?
        </Link>
      </div>
    </>
  );
}

export default Signin;
