import { IconProps } from "@/types/props";

const CopiedIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
      <path d="M27.5 9.625L12.375 24.7499L5.49988 17.875" stroke={props.color ? props.color : "#62E076"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default CopiedIcon;