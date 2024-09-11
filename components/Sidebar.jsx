'use client'
import { logo2 } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CiBoxes, CiCirclePlus, CiDeliveryTruck, CiEdit } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { Button } from "./ui/button";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
  
      // Check if the logout was successful
      if (response.ok) {
        // Remove item from localStorage
        localStorage.removeItem("auth");
  
        // Redirect to sign-in page
        router.push("/sign-in");
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };
  return (
    <div className="hidden lg:block w-[20%] border-r min-h-screen bg-gray-100">
      <div className="w-full p-4">
        <div className="flex justify-between items-center w-full mb-5">
          <div>
            <Image src={logo2} width={80} height={80} alt="logo"/>
          </div>
          <span className="text-gray-400 text-xs">v1.0</span>
        </div>
        <div className="py-5 flex flex-col gap-4">

          <Link href="/dashboard">
            <div className="flex items-center gap-3 hover:bg-blue-500 p-2 py-3 rounded-lg hover:text-white">
              <CiBoxes  className="text-xl"/>
              <span className="">Products</span>
            </div>
          </Link>
          <Link href="/dashboard/create">
            <div className="flex items-center gap-3 hover:bg-blue-500 p-2 py-3 rounded-lg hover:text-white">
              <CiCirclePlus  className="text-xl"/>
              <span className="">Create</span>
            </div>
          </Link>
          <Link href="/dashboard/update">
            <div className="flex items-center gap-3 hover:bg-blue-500 p-2 py-3 rounded-lg hover:text-white">
              <CiEdit  className="text-xl"/>
              <span className="">Update</span>
            </div>
          </Link>
          <Link href="/dashboard/orders">
            <div className="flex items-center gap-3 hover:bg-blue-500 p-2 py-3 rounded-lg hover:text-white">
              <CiDeliveryTruck className="text-xl"/>
              <span className="">Orders</span>
            </div>
          </Link>
          <Button onClick={handleLogout} className="px-0 h-[45px] flex justify-start bg-transparent text-black hover:bg-gray-200">
            <div className="flex items-center gap-2 p-2 py-3 rounded-lg">
              <MdLogout className="text-xl"/>
              <span className="">Logout</span>
            </div>
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
