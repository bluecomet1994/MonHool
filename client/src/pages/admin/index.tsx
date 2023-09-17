import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import { fadeSmallLeftVariant, fadeSmallUpVariant } from '@/utils/animations';
import ManageIcon from '@/components/shared/icons/ManageIcon';

export default function AdminHome() {
  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <motion.h1
          initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.5)}
          className="font-bold text-2xl md:text-4xl p-2 my-16 [&>span]:text-green-400"
        >
          Good Evening, <span>Sculbio!</span>
        </motion.h1>

        <section>
          <motion.h1
            initial="hide" whileInView="show" exit="hide" variants={fadeSmallLeftVariant(0.5)}
            className='text-2xl'
          >Stats</motion.h1>

          <motion.div
            initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.5,0.25)}
            className='flex my-4'
          >
            <div className='flex flex-col min-w-[320px] p-8 m-2 rounded-xl bg-white text-black'>
              <h1 className='text-3xl'>Total users</h1>
              <p className='text-6xl mt-4'>8,656</p>
            </div>

            <div className='flex flex-col min-w-[320px] p-8 m-2 rounded-xl bg-white text-black'>
              <h1 className='text-3xl'>Active Staking positions</h1>
              <p className='text-6xl mt-4'>204</p>
            </div>

            <div className='flex flex-col min-w-[320px] p-8 m-2 rounded-xl bg-white text-black'>
              <h1 className='text-3xl'>Active bot positions</h1>
              <p className='text-6xl mt-4'>110</p>
            </div>
          </motion.div>

          <motion.div
            initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.5,0.5)}
            className='flex my-4'
          >
            <div className='flex flex-col min-w-[320px] p-8 m-2 rounded-xl bg-[#2F2F2F] text-white'>
              <h1 className='text-2xl'>Pending Withdrawals</h1>
              <p className='text-lg text-[#989898]'>22 requests</p>

              <div className='flex justify-end mt-8'>
                <button className='flex justify-center items-center px-6 py-2 rounded-lg bg-primary text-black transition-all hover:bg-green-500'>Manage <ManageIcon /></button>
              </div>
            </div>

            <div className='flex flex-col min-w-[320px] p-8 m-2 rounded-xl bg-[#2F2F2F] text-white'>
              <h1 className='text-2xl'>Pending Deposits</h1>
              <p className='text-lg text-[#989898]'>22 requests</p>

              <div className='flex justify-end mt-8'>
                <button className='flex justify-center items-center px-6 py-2 rounded-lg bg-primary text-black transition-all hover:bg-green-500'>Manage <ManageIcon /></button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}