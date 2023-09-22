import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import StakingPosition from "@/components/staking/StakingPosition";
import AddPosition from "@/components/staking/AddPosition";
import { StakingType } from "@/types/components";
import { fadeSmallUpVariant, fadeVariant } from "@/utils/animations";
import { getStakingList } from "@/store/actions/staking.action";
import Spinner from "@/components/shared/Spinner";

export default function Staking() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogin } = useSelector(({ user }) => user);
  const { isLoading, positions } = useSelector(({ staking }) => staking);
  const [isAddPosition, setIsAddPosition] = useState(false);

  useEffect(() => {
    dispatch(getStakingList());

    if (!isLogin) {
      router.push('/');
    }
  }, [dispatch, isLogin, router])

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section className="my-12">
          <motion.h1
            initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeVariant(1)}
            className="text-3xl text-center md:text-left"
          >Staking</motion.h1>

          <motion.div
            initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
            className="px-6 py-16 my-8 rounded-xl bg-[#3D3D3D]"
          >
            {
              isLoading ? (
                <div className="flex justify-center items-center w-full h-20">
                  <Spinner />
                </div>
              ) : positions.length > 0 ? (
                positions.map((data: StakingType) => (
                  <StakingPosition key={data._id} {...data} />
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-20">
                  <h1 className="text-gray-500 text-2xl">No opened positions</h1>
                </div>
              )
            }

            <AddPosition isOpen={isAddPosition} setter={setIsAddPosition} />

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