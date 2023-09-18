import { motion } from 'framer-motion';
import { fadeSmallUpVariant } from '@/utils/animations';
import { useEffect, useState } from 'react';

const GreetingTitle = () => {
  const currentHour = new Date().getHours();
  const [timeStamp, setTimeStamp] = useState('');

  useEffect(() => {
    if (currentHour > 0 && currentHour < 12) {
      setTimeStamp('Morning');
    } else if (currentHour > 12 && currentHour < 18) {
      setTimeStamp('Afternoon');
    } else {
      setTimeStamp('Evening');
    }
  }, []);

  return (
    <motion.h1
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
      className="font-bold text-2xl md:text-4xl p-2 my-16 [&>span]:text-green-400"
    >
      Good {timeStamp}, <span>Sculbio!</span>
    </motion.h1>
  );
}

export default GreetingTitle;