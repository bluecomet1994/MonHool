import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

import ConfirmIcon from "@/components/shared/icons/ConfirmIcon";
import DeclineIcon from "@/components/shared/icons/DeclineIcon";
import { AdminTableProps } from "@/types/props"
import { fadeSmallUpVariant } from '@/utils/animations';
import { formatDate, formatNumber } from '@/utils/functions';
import { TRANSACTION_STATUS } from '@/enums/status';
import { accessRequest } from '@/store/actions/admin.action';
import ClipboardIcon from './icons/ClipboardIcon';
import { useState } from 'react';
import CopiedIcon from './icons/CopiedIcon';

const AdminTable = (props: AdminTableProps) => {
  const { headCols, data: tableData } = props;
  const dispatch = useDispatch();

  const [isCopied, setIsCopied] = useState(0);

  const copyAddress = (address: string, index: number) => {
    navigator.clipboard.writeText(address);
    setIsCopied(index);
  }

  const determine = (id: string, type: number, status: number) => {
    dispatch(accessRequest(id, type, status))
      .then((response: any) => {
        if (response && response.valid) {
          Swal.fire({
            toast: true,
            icon: response.success ? 'success' : 'warning',
            position: 'top-right',
            text: response.message,
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            toast: true,
            icon: "error",
            position: 'top-right',
            text: "The token has expired. Please refresh the page.",
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false
          });
        }
      });
  }

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
      className="w-full overflow-auto my-16 text-xl"
    >
      {
        tableData.length > 0 ? (
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
                tableData.map((row: any, index: number) => (
                  <tr key={row._id}>
                    <td>{row.username}</td>
                    <td>{formatDate(row.date)}</td>
                    <td>{row.coin}</td>
                    <td>{formatNumber(row.amount)} {row.coin}</td>
                    <td>
                      <div className='flex'>
                        <p className='w-36 truncate'>{row.address}</p>
                        {row.address && (
                          <button onClick={() => copyAddress(row.address, index+1)} className="md:ml-2 scale-50 md:scale-100">
                            {isCopied-1===index ? <CopiedIcon /> : <ClipboardIcon />}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="flex">
                      <button onClick={() => determine(row._id, row.type, TRANSACTION_STATUS.SUCCESS)} className="flex justify-center items-center w-10 h-10 mx-2 rounded-full bg-green-400 transition-all hover:bg-green-500"><ConfirmIcon /></button>
                      <button onClick={() => determine(row._id, row.type, TRANSACTION_STATUS.DECLINED)} className="flex justify-center items-center w-10 h-10 mx-2 rounded-full bg-red-400 transition-all hover:bg-red-500"><DeclineIcon /></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <div className='flex justify-center items-center w-full'>
            <h1 className='text-gray-500'>No pending requests</h1>
          </div>
        )
      }

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