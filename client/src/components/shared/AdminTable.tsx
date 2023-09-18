import { motion } from 'framer-motion';

import ConfirmIcon from "@/components/shared/icons/ConfirmIcon";
import DeclineIcon from "@/components/shared/icons/DeclineIcon";
import { TransactionRequestType } from "@/types/components";
import { AdminTableProps } from "@/types/props"
import { fadeSmallUpVariant } from '@/utils/animations';

const AdminTable = (props: AdminTableProps) => {
  const { data: tableData } = props;

  const headCols: string[] = ['User', 'Date', 'Coin', 'Amount', 'Address', ''];

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
      className="w-full overflow-auto my-16 text-xl"
    >
      <table>
        <tbody>
          <tr>
            {
              headCols.map((header: string, index: number) => (
                <td key={index}>{header}</td>
              ))
            }
          </tr>

          {
            tableData.map((row: TransactionRequestType) => (
              <tr key={row.id}>
                <td>{row.username}</td>
                <td>{row.date.toDateString()}</td>
                <td>{row.coin}</td>
                <td>{row.amount} {row.coin}</td>
                <td><p className='w-36 truncate'>{row.address}</p></td>
                <td className="flex">
                  <button className="flex justify-center items-center w-10 h-10 mx-2 rounded-full bg-green-400 transition-all hover:bg-green-500"><ConfirmIcon /></button>
                  <button className="flex justify-center items-center w-10 h-10 mx-2 rounded-full bg-red-400 transition-all hover:bg-red-500"><DeclineIcon /></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 100%;
          min-width: 700px;
        }

        table tr:nth-child(1) td {
          padding: 0 20px 32px 20px;          
          color: #B6B6B6;
        }

        table tr:not(:first-child) {
          position: relative;
        }

        table tr:not(:first-child) td {
          padding: 20px;
        }

        table tr:not(:first-child)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #808080;
        }
      `}</style>
    </motion.div>
  );
}

export default AdminTable;