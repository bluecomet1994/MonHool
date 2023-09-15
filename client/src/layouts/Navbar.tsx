import Menubar from "@/components/navbar/Menubar";
import NavbarLink from "@/components/navbar/NavbarLink";
import { navbarConfig } from "@/configs/navbar";
import { NavbarItem } from "@/types/configs";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center relative w-full p-4 md:p-8">
        <h1 className="text-2xl">MonHool</h1>

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
            <button className="bg-transparent text-white w-28 h-10 text-xl">Log In</button>
            <button className="bg-white text-black w-28 h-10 text-xl rounded-xl">Sign Up</button>
          </div>
        </div>

        <Menubar />

        <div className="absolute top-full left-0 w-full block md:hidden p-4 bg-[#555]">
          <div className="flex justify-center w-full my-4">
            <button className="bg-transparent text-white w-28 h-10 text-lg md:text-xl">Log In</button>
            <button className="bg-white text-black w-28 h-10 text-lg md:text-xl rounded-xl">Sign Up</button>
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