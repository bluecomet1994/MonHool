import { NavbarLinkProps } from "@/types/props";

const NavbarLink = (props: NavbarLinkProps) => {
  return (
    <a href={props.path} className="flex justify-center items-center relative p-4 text-sm md:text-xl [&>span]:hover:w-full [&>span]:hover:left-0">
      {props.children}
      {
        props.new && (
          <span className="font-bold bg-primary text-black text-xs rounded-full px-1 mx-1">New</span>
        )
      }

      <span className="decorator absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-500" />
    </a>
  );
}

export default NavbarLink;