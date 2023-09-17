import { motion } from 'framer-motion';
import { fadeSmallUpVariant } from '@/utils/animations';

const TradingDashboard = () => {
  return (
    <motion.div
      initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.5)}
      className='h-96 p-6 m-1 rounded-lg bg-[#2D2D2D]'
    >
      <div className="flex justify-center items-center w-full h-full">
        Trading bot dashboard
      </div>
    </motion.div>
  );
}

export default TradingDashboard;