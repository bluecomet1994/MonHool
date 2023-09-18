import { motion } from 'framer-motion';

import AdminTable from "@/components/shared/AdminTable";
import Navbar from "@/layouts/Navbar";
import { TransactionRequestType } from "@/types/components";
import { fadeSmallDownVariant } from '@/utils/animations';

export default function Withdrawals() {
  const requestList: TransactionRequestType[] = [
    {
      id: 1,
      username: 'Sculbio',
      date: new Date(),
      coin: 'SOL',
      amount: 167.094,
      address: 'bc1qkndg8vue39fhusfgzrzruh25x5c6n6zchwnffz'
    },
    {
      id: 2,
      username: 'Sculbio',
      date: new Date(),
      coin: 'SOL',
      amount: 167.094,
      address: 'bc1qkndg8vue39fhusfgzrzruh25x5c6n6zchwnffz'
    },
    {
      id: 3,
      username: 'Sculbio',
      date: new Date(),
      coin: 'SOL',
      amount: 167.094,
      address: 'bc1qkndg8vue39fhusfgzrzruh25x5c6n6zchwnffz'
    },
    {
      id: 4,
      username: 'Sculbio',
      date: new Date(),
      coin: 'SOL',
      amount: 167.094,
      address: 'bc1qkndg8vue39fhusfgzrzruh25x5c6n6zchwnffz'
    },
    {
      id: 5,
      username: 'Sculbio',
      date: new Date(),
      coin: 'SOL',
      amount: 167.094,
      address: 'bc1qkndg8vue39fhusfgzrzruh25x5c6n6zchwnffz'
    },
    {
      id: 6,
      username: 'Sculbio',
      date: new Date(),
      coin: 'SOL',
      amount: 167.094,
      address: 'bc1qkndg8vue39fhusfgzrzruh25x5c6n6zchwnffz'
    },
  ];

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section>
          <motion.h1 initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallDownVariant(0.5)} className="text-[40px] my-12">Deposits</motion.h1>

          <AdminTable data={requestList} />
        </section>
      </div>
    </main>
  );
}