import { StakingType } from "@/types/components";
import { convertTime } from "@/utils/functions";
import { cryptoCurrency } from "@/utils/mockData";

const StakingPosition = (props: StakingType) => {
  const { coin, amount, rate, earning, time } = props;

  return (
    <div className="flex flex-col w-full">
      <span className="w-full h-[1px] mb-8 bg-[#7A7A7A]" />

      <div className="flex flex-wrap py-6">
        <div className="flex justify-between items-start w-full md:w-3/4">
          <div>
            <p className="text-sm md:text-2xl">Your deposit</p>
            <h1 className="font-bold text-2xl md:text-5xl my-2 md:my-4">{amount} {coin}</h1>
            <span className="text-xs md:text-xl text-[#878787]">${(amount * cryptoCurrency[coin]).toLocaleString()}</span>
          </div>

          <div>
            <h1 className="text-sm md:text-2xl">Rate %</h1>
            <p className="text-[14px] md:text-3xl my-2 md:my-4">{rate * 100}%</p>
          </div>

          <div>
            <p className="text-sm md:text-2xl">Earning</p>
            <h1 className="font-bold text-2xl md:text-5xl my-2 md:my-4">{earning} {coin}</h1>
            <span className="text-xs md:text-xl text-[#878787]">${(earning * cryptoCurrency[coin]).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-center w-full md:w-1/4">
          {
            time > 0 ? (
              <div className="flex flex-col md:block justify-center items-center">
                <h1 className="text-sm md:text-2xl">Time Left</h1>
                <p className="text-3xl my-2 md:my-4">{convertTime(time)}</p>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-full my-4 md:my-0">
                <button className="gradient-btn w-full md:w-[164px]">Get money</button>
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