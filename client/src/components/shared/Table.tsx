import Image from "next/image";
import { motion } from 'framer-motion';

import { CoinHistoryType } from "@/types/components";
import { TableProps } from "@/types/props";
import { fadeSmallUpVariant } from "@/utils/animations";

const Table = ({headCols, bodyCols}: TableProps) => {
  return (
    <motion.div
      initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.5,0.25)}
      className="w-full overflow-auto my-24 text-xl"
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
            bodyCols.map((row: CoinHistoryType) => (
              <tr key={row.id}>
                <td>{row.status}</td>
                <td>{row.date.toDateString()}</td>
                <td>{row.coin}</td>
                <td>{row.isExchange && (<Image alt="exchange" src={'/assets/icons/exchange-fill.png'} width={24} height={24} />)}</td>
                <td>{typeof row.amount==='string' ? row.amount : `${row.amount > 0 ? '+' : '-'} $${row.amount}`}</td>
                <td>{row.total} {row.coin}</td>
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

export default Table;