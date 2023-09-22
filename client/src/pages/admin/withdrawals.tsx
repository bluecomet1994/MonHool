import { motion } from 'framer-motion';

import AdminTable from "@/components/shared/AdminTable";
import Navbar from "@/layouts/Navbar";
import { fadeSmallDownVariant } from '@/utils/animations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWithdrawalRequests } from '@/store/actions/admin.action';

export default function Withdrawals() {
  const tableHeadCols: string[] = ['User', 'Date', 'Coin', 'Amount', 'Address', ''];
  const dispatch = useDispatch();
  const { withdrawal, isLoading } = useSelector(({ admin }) => admin);

  useEffect(() => {
    dispatch(getWithdrawalRequests());
  }, []);

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section>
          <motion.h1 initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallDownVariant(0.5)} className="text-[40px] my-12">Withdrawals</motion.h1>

          <AdminTable isLoading={isLoading} headCols={tableHeadCols} data={withdrawal} />
        </section>
      </div>
    </main>
  );
}