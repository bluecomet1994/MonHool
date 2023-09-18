import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import StakingPosition from "@/components/staking/StakingPosition";
import AddPosition from "@/components/staking/AddPosition";
import { StakingType } from "@/types/components";
import { fadeSmallUpVariant, fadeVariant } from "@/utils/animations";

export default function Staking() {
  const { data: stakingData } = useSelector(({ staking }) => staking);
  const [isAddPosition, setIsAddPosition] = useState(false);

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section className="my-12">
          <motion.h1
            initial="hide" whileInView="show" viewport={{once: true}} variants={fadeVariant(1)}
            className="text-3xl text-center md:text-left"
          >Staking</motion.h1>

          <motion.div
            initial="hide" whileInView="show" viewport={{once: true}} variants={fadeSmallUpVariant(0.5)}
            className="px-6 py-16 my-8 rounded-xl bg-[#3D3D3D]"
          >
            {
              stakingData.map((data: StakingType) => (
                <StakingPosition key={data.id} {...data} />
              ))
            }

            <AddPosition isOpen={isAddPosition} />

            <div className={`${isAddPosition ? 'hidden' : 'flex'} justify-start w-full mt-12`}>
              <button
                onClick={() => setIsAddPosition(true)}
                className="px-6 py-4 rounded-xl bg-[#272727] text-white text-lg md:text-3xl transition-all hover:bg-black"
              >+ Add Position</button>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}