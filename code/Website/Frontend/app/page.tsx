"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/Modal/Modal";
export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    Router.push("/login");
  });
  return (
    <>
      
    </>
  );
}
