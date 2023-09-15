import { useRouter } from "next/router";
import { useState } from "react";

import Menubar from "@/components/navbar/Menubar";
import NavbarLink from "@/components/navbar/NavbarLink";
import { navbarConfig } from "@/configs/navbar";
import { NavbarItem } from "@/types/configs";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <div className="flex justify-between items-center relative w-full p-4 md:p-8">
        <h1 className="text-2xl cursor-pointer" onClick={() => router.push('/')}>MonHool</h1>

        <div className="hidden md:flex justify-between w-full">
          <div className="flex justify-center w-full">
            {
              navbarConfig.map((item: NavbarItem) => (
                <NavbarLink key={item.id} new={item.isNew} path={item.path}>
                  {item.title}
                </NavbarLink>
              ))
            }
          </div>

          <div className="flex">
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-transparent text-white w-28 h-10 text-xl rounded-xl mx-2 transition-all hover:bg-white hover:text-black"
            >
              Log In
            </button>

            <button
              onClick={() => router.push('/auth/register')}
              className="bg-white text-black w-28 h-10 text-xl rounded-xl mx-2 transition-all hover:bg-transparent hover:text-white"
            >
              Sign Up
            </button>
          </div>
        </div>

        <Menubar handler={toggleMenu} />

        <div className={`absolute top-full left-0 w-full ${menuOpen ? 'block' : 'hidden'} md:hidden p-4 bg-[#555] fade-down`}>
          <div className="flex justify-center w-full my-4">
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-transparent text-white w-28 h-10 text-lg md:text-xl"
            >
              Log In
            </button>

            <button
              onClick={() => router.push('/auth/register')}
              className="bg-white text-black w-28 h-10 text-lg md:text-xl rounded-xl"
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-center w-full my-4">
            {
              navbarConfig.map((item: NavbarItem) => (
                <NavbarLink key={item.id} new={item.isNew} path={item.path}>
                  {item.title}
                </NavbarLink>
              ))
            }
          </div>
        </div>
      </div>

    </>
  )
}