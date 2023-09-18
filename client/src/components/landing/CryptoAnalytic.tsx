import Image from "next/image";
import { motion } from 'framer-motion';

import { CryptoAnalyticProps } from "@/types/props";
import { fadeSmallUpVariant } from "@/utils/animations";
import GreenTrendingIcon from "../shared/icons/GreenTrendingIcon";
import RedTrendingIcon from "../shared/icons/RedTrendingIcon";

const CryptoAnalytic = (props: CryptoAnalyticProps) => {
  return (
    <div className="w-full md:w-1/4 h-44 p-2">
      <motion.div
        initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.75)}
        className="flex flex-col justify-between w-full h-full p-6 rounded-md bg-white text-black"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{props.name}</h1>
          <Image alt="logo" src={props.image} width={36} height={36} />
        </div>

        <div className="flex items-center">
          <p className={`text-3xl mr-4 ${props.trending ? 'text-green-400' : 'text-red-400'}`}>{props.amount.toFixed(2)}</p>
          { props.trending ? <GreenTrendingIcon /> : <RedTrendingIcon /> }
        </div>
      </motion.div>
    </div>
  )
}

export default CryptoAnalytic;