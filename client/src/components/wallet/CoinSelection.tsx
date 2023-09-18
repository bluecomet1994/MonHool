import Image from "next/image";
import { motion } from 'framer-motion';
import { DropDownProps } from "@/types/props";
import { CurrencyType } from "@/types/components";
import { fadeSmallUpVariant } from "@/utils/animations";

const CoinSelection = (props: DropDownProps) => {
  const { list, value, setter } = props;

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
      className="flex flex-wrap justify-center items-center w-full my-8"
    >
      {
        list.map((item: CurrencyType) => (
          <div key={item.id} className="flex justify-center items-center w-full md:w-1/5 p-2">
            <div className={`flex justify-center items-center w-full p-2 rounded-full border-[2px] ${value===item ? 'bg-[#494949] border-[#494949]' : 'bg-black border-white'} text-white text-2xl cursor-pointer transition-all hover:bg-slate-700`} onClick={() => setter(item)}>
              <Image alt="badge" src={item.image} width={50} height={50} priority />
              <p className="ml-2">{item.coin}</p>
            </div>
          </div>
        ))
      }
    </motion.div>
  )
}

export default CoinSelection;