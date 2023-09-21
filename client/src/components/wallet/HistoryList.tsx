import Image from "next/image";
import { motion } from 'framer-motion';
import { fadeSmallUpVariant } from "@/utils/animations";
import { HistoryListType } from "@/types/components";
import Spinner from "@/components/shared/Spinner";
import { formatDate, formatNumber } from "@/utils/functions";
import { TRANSACTION_STATUS_TEXT } from "@/enums/status";

const HistoryList = (props: HistoryListType) => {
  const { isLoading, title, data } = props;

  const coinName: any = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    usdt: 'Theter',
    xrp: 'Ripple',
    sol: 'Solana'
  }

  const statusColor: string[] = ['bg-orange-400', 'bg-green-400', 'bg-red-400'];

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
      className="flex flex-col w-full p-2 md:p-6 rounded-lg bg-white text-black"
    >
      <h1 className="font-bold text-sm md:text-2xl my-4">{title}</h1>

      <div className="flex flex-col my-4">
        {
          isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : data.length > 0 ? (
            data.map(item => (
              <div key={item._id} className="flex justify-between items-center py-2">
                <Image alt="coin" src={`/assets/images/badges/${item.coin.toLowerCase()}.png`} width={48} height={48} className="mx-2" />
                <div className="flex flex-col w-3/12 md:px-4">
                  <h1 className="text-sm md:text-2xl">{coinName[item.coin.toLowerCase()]}</h1>
                  <p className="text-xs md:text-xl text-[#B9B9B9]">{item.coin}</p>
                </div>
  
                <p className="text-[10px] md:text-xl w-4/12 pr-2 md:pr-0">{formatDate(item.date)}</p>
                
                <div className="flex flex-col w-3/12">
                  <h1 className="text-[10px] md:text-2xl">{formatNumber(item.amount)} {item.coin}</h1>
                  <p className="text-[8px] md:text-xl text-[#B9B9B9]">${formatNumber(item.usd)}</p>
                </div>
  
                <div className="flex items-center w-3/12">
                  <span className={`w-2 h-2 md:w-3 md:h-3 mx-2 rounded-full ${statusColor[item.status]}`} />
                  <h1 className="text-[9px] md:text-xl">{TRANSACTION_STATUS_TEXT[item.status]}</h1>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-12 text-gray-500">
              <h1>No transaction history</h1>
            </div>
          )
        }
      </div>
    </motion.div>
  )
}

export default HistoryList;