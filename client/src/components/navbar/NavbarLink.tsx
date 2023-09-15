import { NavbarLinkProps } from "@/types/props";

const NavbarLink = (props: NavbarLinkProps) => {
  return (
    <a href={props.path} className="flex justify-center items-center px-4 text-sm md:text-xl">
      {props.children}
      {
        props.new && (
          <span className="font-bold bg-primary text-black text-xs rounded-full px-1 mx-1">New</span>
        )
      }
    </a>
  );
}

export default NavbarLink;