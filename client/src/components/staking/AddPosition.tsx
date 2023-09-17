import CoinDropDown from "@/components/shared/CoinDropDown";
import TimeDropDown from "@/components/staking/TimeDropDown";
import { AddPositionProps } from "@/types/props";

const AddPosition = (props: AddPositionProps) => {
  const { isOpen } = props;

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} w-full fade mt-12`}>
      <h1 className="text-3xl">Add Position</h1>
      <CoinDropDown />

      <div className="flex flex-wrap justify-normal items-start">
        <div className="flex justify-between items-start w-full md:w-3/4">
          <div>
            <p className="text-sm md:text-2xl">Amount</p>
            <h1 className="font-bold text-2xl md:text-5xl my-2 md:my-4">0.00 BTC</h1>
          </div>

          <div>
            <h1 className="text-sm md:text-2xl">Rate %</h1>
            <p className="text-[14px] md:text-3xl my-2 md:my-4">20%</p>
          </div>

          <div>
            <p className="text-sm md:text-2xl">Earning</p>
            <h1 className="font-bold text-2xl md:text-5xl my-2 md:my-4">0.00 BTC</h1>
          </div>
        </div>

        <div className="flex justify-center w-full md:w-1/4">
          <div className="flex flex-row md:flex-col justify-between md:justify-center items-center w-full md:w-auto">
            <div className="flex flex-col md:w-full">
              <h1 className="text-sm md:text-2xl">Set time</h1>
              <TimeDropDown />
            </div>
            <button className="px-2 md:px-6 py-3 md:py-4 mt-8 mb-3 md:mb-0 rounded-xl bg-[#272727] text-white text-lg md:text-3xl transition-all hover:bg-black">+ Add Position</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPosition;