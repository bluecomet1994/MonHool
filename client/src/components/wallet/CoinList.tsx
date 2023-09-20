import Image from "next/image";
import { motion } from 'framer-motion';
import { fadeSmallUpVariant } from "@/utils/animations";
import { formatNumber } from "@/utils/functions";

const CoinList = (props: any) => {
  const { id, title, name, image, amount } = props;

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5, 0.25 + id * 0.1)}
      className="flex justify-between items-center w-full px-4 py-2 my-2 md:m-2 rounded-lg bg-white text-black"
    >
      <div className="flex items-center">
        <Image alt="logo" src={image} width={36} height={36} />
        <div className="flex flex-col mx-4">
          <h1 className="text-xl">{title}</h1>
          <span className="text-base">{name}</span>
        </div>
      </div>

      <h1 className="text-2xl">{formatNumber(amount)}</h1>
    </motion.div>
  );
}

export default CoinList;