import { IconProps } from "@/types/props";

const DeclineIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
      <path d="M6.29688 14.4008L10.5632 10.1344L14.8296 14.4008M14.8296 5.86804L10.5624 10.1344L6.29688 5.86804" stroke={props.color ? props.color : 'white'} strokeWidth="1.22059" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default DeclineIcon;