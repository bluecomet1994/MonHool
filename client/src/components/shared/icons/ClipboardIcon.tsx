import { IconProps } from "@/types/props";

const ClipboardIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
      <path d="M26.2324 8.25H11.9238C9.89483 8.25 8.25 9.89483 8.25 11.9238V26.2324C8.25 28.2614 9.89483 29.9062 11.9238 29.9062H26.2324C28.2614 29.9062 29.9062 28.2614 29.9062 26.2324V11.9238C29.9062 9.89483 28.2614 8.25 26.2324 8.25Z" stroke={props.color ? props.color : "#62E076"} strokeWidth="2.0625" strokeLinejoin="round" />
      <path d="M24.7178 8.25L24.75 6.70312C24.7473 5.7467 24.3661 4.83022 23.6898 4.15392C23.0135 3.47762 22.0971 3.09647 21.1406 3.09375H7.21875C6.12573 3.09698 5.07839 3.53262 4.3055 4.3055C3.53262 5.07839 3.09698 6.12573 3.09375 7.21875V21.1406C3.09647 22.0971 3.47762 23.0135 4.15392 23.6898C4.83022 24.3661 5.7467 24.7473 6.70312 24.75H8.25" stroke={props.color ? props.color : "#62E076"} strokeWidth="2.0625" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ClipboardIcon;