import { IconProps } from "@/types/props";

const ArrowUpIcon = (props: IconProps) => {
  return (
    <div className="rotate-180">
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
        <path d="M20.9995 26.2501L13.5742 18.8266L16.0505 16.3521L20.9995 21.3011L25.9485 16.3521L28.4247 18.8266L20.9995 26.2518V26.2501Z" fill={props.color ? props.color : 'white'} />
      </svg>
    </div>
  );
}

export default ArrowUpIcon;