import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CoinDropDown from "@/components/staking/CoinDropDown";
import TimeDropDown from "@/components/staking/TimeDropDown";
import { AddPositionProps } from "@/types/props";
import { CurrencyType, TimeListType } from "@/types/components";
import { OpenStakingRequestType } from "@/types/redux";
import { addStakingPosition } from "@/store/actions/staking.action";
import Swal from "sweetalert2";

const timeList: TimeListType[] = [
  {
    id: 1,
    time: 48,
    rate: 0.18
  },
  {
    id: 2,
    time: 64,
    rate: 0.2
  },
  {
    id: 3,
    time: 82,
    rate: 0.22
  },
  {
    id: 4,
    time: 120,
    rate: 0.24
  },
  {
    id: 5,
    time: 240,
    rate: 0.27
  },
];

const AddPosition = (props: AddPositionProps) => {
  const { isOpen, setter } = props;
  const dispatch = useDispatch();
  const { trading } = useSelector(({ currency }) => currency);

  const [currency, setCurrency] = useState<CurrencyType>({
    id: 0,
    coin: '',
    unit: '',
    image: '',
    lastPrice: '0'
  });
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(timeList[0].rate);
  const [earning, setEarning] = useState(0);
  const [time, setTime] = useState<TimeListType>(timeList[0]);

  const handleAmountChange = ({ target: { value } }: any) => {
    setAmount(Number(value));
    setEarning(Number(value) * rate);
  }

  const handleTimeChange = (value: TimeListType) => {
    setTime(value);
    setRate(value.rate);
    setEarning(amount * value.rate);
  }

  const openPosition = () => {
    const positionRequest: OpenStakingRequestType = {
      coin: currency.unit,
      deposit: amount,
      rate,
      earning,
      time: time.time,
      usd: amount * Number(currency.lastPrice)
    }

    dispatch(addStakingPosition(positionRequest))
      .then((response: any) => {
        if (response.valid) {
          Swal.fire({
            toast: true,
            icon: response.success ? 'success' : 'warning',
            position: 'top-right',
            text: response.message,
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false
          });

          setter(false);
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
      })
  }

  useEffect(() => {
    setCurrency(trading && trading[0]);
  }, [trading]);

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} w-full fade mt-12`}>
      <h1 className="text-3xl">Add Position</h1>
      <CoinDropDown list={trading} value={currency} setter={setCurrency} />

      <div className="flex flex-wrap justify-normal items-start">
        <div className="flex justify-between items-start w-full md:w-3/4">
          <div>
            <p className="text-sm md:text-2xl">Amount</p>
            <h1 className="flex items-center font-bold text-2xl md:text-5xl my-2 md:my-4">
              <span className="relative text-[#3D3D3D] text-2xl md:text-5xl mr-6">
                {amount.toFixed(2)}
                <input
                  type="number"
                  value={amount.toFixed(2)}
                  onChange={handleAmountChange}
                  className="absolute top-0 left-0 w-[calc(100%+24px)] h-full text-2xl md:text-5xl bg-[#3D3D3D] text-white text-center border-none outline-none"
                  min={0}
                />
              </span>
              {currency && currency.unit}
            </h1>
          </div>

          <div>
            <h1 className="text-sm md:text-2xl">Rate %</h1>
            <p className="text-[14px] md:text-3xl my-2 md:my-4">{rate * 100}%</p>
          </div>

          <div>
            <p className="text-sm md:text-2xl">Earning</p>
            <h1 className="font-bold text-2xl md:text-5xl my-2 md:my-4">{earning.toFixed(2)} {currency && currency.unit}</h1>
          </div>
        </div>

        <div className="flex justify-center w-full md:w-1/4">
          <div className="flex flex-row md:flex-col justify-between md:justify-center items-center w-full md:w-auto">
            <div className="flex flex-col md:w-full">
              <h1 className="text-sm md:text-2xl">Set time</h1>
              <TimeDropDown list={timeList} value={time} setter={handleTimeChange} />
            </div>
            <button onClick={openPosition} className="px-2 md:px-6 py-3 md:py-4 mt-8 mb-3 md:mb-0 rounded-xl bg-[#272727] text-white text-lg md:text-3xl transition-all hover:bg-black">+ Add Position</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPosition;