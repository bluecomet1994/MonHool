import { motion } from 'framer-motion';

import GreenTrendingIcon from '@/components/shared/icons/GreenTrendingIcon';
import RedTrendingIcon from '@/components/shared/icons/RedTrendingIcon';
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
            { increase > 0 ? <GreenTrendingIcon /> : <RedTrendingIcon /> }
            {increase * 100}%
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EarningCard;