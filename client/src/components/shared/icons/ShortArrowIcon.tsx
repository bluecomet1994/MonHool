import { IconProps } from "@/types/props";

const ShortArrowIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="16" viewBox="0 0 62 16" fill="none">
      <path d="M61.5041 8.83811C61.8974 8.44481 61.8974 7.80714 61.5041 7.41385L55.095 1.00467C54.7017 0.611372 54.064 0.611372 53.6707 1.00467C53.2774 1.39797 53.2774 2.03563 53.6707 2.42893L59.3677 8.12598L53.6707 13.823C53.2774 14.2163 53.2774 14.854 53.6707 15.2473C54.064 15.6406 54.7017 15.6406 55.095 15.2473L61.5041 8.83811ZM0.365723 9.13308H60.792V7.11887H0.365723V9.13308Z" fill={props.color ? props.color : 'black'} />
    </svg>
  );
}

export default ShortArrowIcon;