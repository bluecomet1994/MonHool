import { IconProps } from "@/types/props";

const LongArrowIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="127" height="24" viewBox="0 0 127 24" fill="none">
      <path d="M126.069 13.0607C126.655 12.4749 126.655 11.5251 126.069 10.9393L116.523 1.3934C115.937 0.807611 114.987 0.807611 114.401 1.3934C113.816 1.97919 113.816 2.92893 114.401 3.51472L122.887 12L114.401 20.4853C113.816 21.0711 113.816 22.0208 114.401 22.6066C114.987 23.1924 115.937 23.1924 116.523 22.6066L126.069 13.0607ZM0.991943 13.5H125.008V10.5H0.991943V13.5Z" fill={props.color ? props.color : '#A4A4A4'} />
    </svg>
  );
}

export default LongArrowIcon;