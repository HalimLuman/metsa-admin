"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logo2 } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openCategories, setOpenCategories] = useState({});

  const dropdownMenu = [
    {
      link : '',
      title: 'Products',
    },
    {
      link : 'create',
      title: 'Create',
    },
    {
      link : 'update',
      title: 'Update',
    },
    {
      link : 'orders',
      title: 'Orders',
    },
  ]

  const toggleCategory = (index) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <section className="w-full lg:hidden absolute shadow bg-white">
      <Sheet>
        <div className="flex w-[90%] py-3 justify-between mx-auto">
          <Image src={logo2} width={100} height={100} alt="logo"/>
        <SheetTrigger>
          <CiMenuBurger className="text-xl"/>
        </SheetTrigger>
        </div>
        <SheetContent
          side="left"
          className="border-none bg-white w-full min-h-[100vh] overflow-y-auto"
        >
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1"
          >
            <Image src={logo2} width={130} height={120} alt="Metsa logo" />
          </Link>
          <div>
            <nav className="flex flex-col gap-3 pt-10">
              {dropdownMenu.map((item, index) => (
                <div
                  key={item.link}
                  className="flex flex-col w-full border-b pb-2"
                >
                  <div className="flex justify-between items-center">
                    <Link href={`/dashboard/${item.link}`}>
                      <p className="text-black">{item.title}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;