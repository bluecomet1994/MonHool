import Image from "next/image";
import { motion } from 'framer-motion';
import { cryptoCurrency } from "@/utils/mockData";
import { fadeSmallUpVariant } from "@/utils/animations";
import { HistoryListType, TransactionHistoryType } from "@/types/components";

const HistoryList = (props: HistoryListType) => {
  const { title, data } = props;

  const status: any = {
    "Pending": "orange",
    "Success": "green",
    "Declined": "red"
  }

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
      className="flex flex-col w-full p-2 md:p-6 rounded-lg bg-white text-black"
    >
      <h1 className="font-bold text-sm md:text-2xl my-4">{title}</h1>

      <div className="flex flex-col my-4">
        {
          data.map((item: TransactionHistoryType) => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <Image alt="coin" src={`/assets/images/badges/${item.coin}.png`} width={48} height={48} className="mx-2" />
              <div className="flex flex-col w-3/12 md:px-4">
                <h1 className="text-sm md:text-2xl">{item.crypto}</h1>
                <p className="text-xs md:text-xl text-[#B9B9B9]">{item.coin.toUpperCase()}</p>
              </div>

              <p className="text-[10px] md:text-xl w-4/12 pr-2 md:pr-0">{item.date.toDateString()}</p>
              
              <div className="flex flex-col w-3/12">
                <h1 className="text-[10px] md:text-2xl">{item.currency} {item.coin.toUpperCase()}</h1>
                <p className="text-[8px] md:text-xl text-[#B9B9B9]">${(item.currency * cryptoCurrency[item.coin.toUpperCase()]).toLocaleString()}</p>
              </div>

              <div className="flex items-center w-3/12">
                <span className={`w-2 h-2 md:w-3 md:h-3 mx-2 rounded-full bg-${status[item.status]}-400`} />
                <h1 className="text-[9px] md:text-xl">{item.status}</h1>
              </div>
            </div>
          ))
        }
      </div>
    </motion.div>
  )
}

export default HistoryList;