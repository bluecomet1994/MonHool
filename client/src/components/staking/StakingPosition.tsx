import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { getStakingMoney } from "@/store/actions/staking.action";
import { StakingType } from "@/types/components";
import { convertTime } from "@/utils/functions";
import { cryptoCurrency } from "@/utils/mockData";

const StakingPosition = (props: StakingType) => {
  const { _id, coin, deposit, rate, earning, usd, endDate } = props;
  const dispatch = useDispatch();
  const [remainTime, setRemainTime] = useState(endDate - new Date().getTime());

  const getMoney = () => {
    dispatch(getStakingMoney(_id))
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
    const interval = setInterval(() => {
      if (endDate - new Date().getTime() > 0) {
        setRemainTime(endDate - new Date().getTime());
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <span className="w-full h-[1px] mb-8 bg-[#7A7A7A]" />

      <div className="flex flex-wrap py-6">
        <div className="flex justify-between items-start w-full md:w-3/4">
          <div className="w-5/12">
            <p className="text-sm md:text-2xl">Your deposit</p>
            <h1 className="font-bold text-2xl md:text-5xl my-2 md:my-4">{deposit} {coin}</h1>
            <span className="text-xs md:text-xl text-[#878787]">${(deposit * cryptoCurrency[coin]).toLocaleString()}</span>
          </div>

          <div className="w-4/12">
            <h1 className="text-sm md:text-2xl">Rate %</h1>
            <p className="text-[14px] md:text-3xl my-2 md:my-4">{rate * 100}%</p>
          </div>

          <div className="w-3/12">
            <p className="text-sm md:text-2xl">Earning</p>
            <h1 className="font-bold text-2xl md:text-5xl my-2 md:my-4">{earning} {coin}</h1>
            <span className="text-xs md:text-xl text-[#878787]">${(earning * cryptoCurrency[coin]).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-center w-full md:w-1/4">
          {
            remainTime > 0 ? (
              <div className="flex flex-col md:block justify-center items-center">
                <h1 className="text-sm md:text-2xl">Time Left</h1>
                <p className="text-3xl my-2 md:my-4">{convertTime(remainTime)}</p>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-full my-4 md:my-0">
                <button onClick={getMoney} className="gradient-btn w-full md:w-[164px]">Get money</button>
              </div>
            )
          }
        </div>
      </div>

      <style jsx>{`
        .gradient-btn {
          font-size: 20px;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          border-radius: 8px;
          background-image: linear-gradient(to right, #62E076, #6DD8F0CF);
          color: black;
        }

        .gradient-btn:hover {
          animation: popup_anim .5s infinite;
        }
      `}</style>
    </div>
  );
}

export default StakingPosition;