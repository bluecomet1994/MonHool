import { IconProps } from "@/types/props";

const ConfirmIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4.29297 9.00108L9.00095 13.7091L16.8476 5.86243" stroke={props.color ? props.color : 'white'} strokeWidth="1.56933" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ConfirmIcon;