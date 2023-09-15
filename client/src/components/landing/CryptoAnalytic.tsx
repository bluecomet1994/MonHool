import { CryptoAnalyticProps } from "@/types/props";
import Image from "next/image";

const CryptoAnalytic = (props: CryptoAnalyticProps) => {
  return (
    <div className="w-full md:w-1/4 h-44 p-2">
      <div className="flex flex-col justify-between w-full h-full p-6 rounded-md bg-white text-black">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{props.name}</h1>
          <Image alt="logo" src={props.image} width={36} height={36} />
        </div>

        <div className="flex items-center">
          <p className={`text-3xl mr-4 ${props.trending ? 'text-green-400' : 'text-red-400'}`}>{props.amount.toLocaleString()}</p>

          {
            props.trending ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M5.61 6.035L8.5 0L11.475 6.035L17 17H0L5.61 6.035Z" fill="#62E076" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M11.39 10.965L8.5 17L5.525 10.965L0 0L17 0L11.39 10.965Z" fill="#E06262" />
              </svg>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CryptoAnalytic;