import Image from "next/image";
import { motion } from 'framer-motion';

import { TableProps } from "@/types/props";
import { fadeSmallUpVariant } from "@/utils/animations";
import { TRANSACTION_TYPE_TEXT } from "@/enums/type";
import { formatDate, formatNumber } from "@/utils/functions";
import Spinner from "../shared/Spinner";

const WalletTable = ({ isLoading, headCols, bodyCols }: TableProps) => {
  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5, 0.25)}
      className="w-full overflow-auto my-24 text-xl"
    >
      {
        isLoading ? (
          <div className="flex justify-center items-center w-full">
            <Spinner />
          </div>
        ) : bodyCols.length > 0 ? (
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
                bodyCols.map((row: any) => (
                  <tr key={row._id}>
                    <td>{TRANSACTION_TYPE_TEXT[row.type]}</td>
                    <td>{formatDate(row.date)}</td>
                    <td>{row.coin}</td>
                    <td>{row.isExchange && (<Image alt="exchange" src={'/assets/icons/exchange-fill.png'} width={24} height={24} />)}</td>
                    <td>{row.isExchange ? row.exchangeCoin : formatNumber(row.amount)}</td>
                    <td>{row.total && formatNumber(row.total)} {row.coin}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center w-full">
            <h1 className="text-gray-500">No transaction history</h1>
          </div>
        )
      }

      <style jsx>{`
        table {
          width: 100%;
          min-width: 700px;
        }

        table tr:nth-child(1) td {
          padding-bottom: 32px;
          color: #B6B6B6;
        }

        table tr:not(:first-child) {
          position: relative;
        }

        table tr:not(:first-child) td {
          padding: 12px 0;
        }

        table tr:not(:first-child)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #B6B6B6;
        }
      `}</style>
    </motion.div>
  )
}

export default WalletTable;