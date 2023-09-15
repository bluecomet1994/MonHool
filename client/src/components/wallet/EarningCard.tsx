import { motion } from 'framer-motion';
import { EarningsType } from "@/types/components";
import { fadeSmallUpVariant } from '@/utils/animations';

const EarningCard = (props: EarningsType) => {
  const { id, title, amount, increase } = props;

  return (
    <div className="w-full md:min-w-[400px] p-2">
      <motion.div
        initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.5,0.5+id*0.2)}
        className="w-full p-6 rounded-lg bg-white text-black"
      >
        <h1 className="text-xl">{title}</h1>

        <div className="flex items-end mt-8">
          <h1 className="text-[40px]">{amount.toLocaleString()}</h1>

          <div className={`flex -translate-y-2 mx-2 ${increase > 0 ? 'text-primary' : 'text-red-400'}`}>
            {
              increase > 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M5.61 6.035L8.5 0L11.475 6.035L17 17H0L5.61 6.035Z" fill="#62E076" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M11.39 10.965L8.5 17L5.525 10.965L0 0L17 0L11.39 10.965Z" fill="#E06262" />
                </svg>
              )
            }

            {increase * 100}%
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EarningCard;