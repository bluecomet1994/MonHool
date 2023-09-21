import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import AdminTable from "@/components/shared/AdminTable";
import { fadeSmallDownVariant } from '@/utils/animations';
import { getDepositRequests } from '@/store/actions/admin.action';

export default function Deposits() {
  const tableHeadCols: string[] = ['User', 'Date', 'Coin', 'Amount', 'Transaction Hash', ''];
  const dispatch = useDispatch();
  const { deposit } = useSelector(({ admin }) => admin);

  useEffect(() => {
    dispatch(getDepositRequests());
  }, []);

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section>
          <motion.h1 initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallDownVariant(0.5)} className="text-[40px] my-12">Deposits</motion.h1>

          <AdminTable headCols={tableHeadCols} data={deposit} />
        </section>
      </div>
    </main>
  );
}