import { InputEleType } from "@/types/components";

const TimeTab = (props: InputEleType) => {
  const times: string[] = ['24h', '7d', '6mon', '1year', 'All time'];

  return (
    <div className="flex justify-center items-center mx-2">
      {
        times.map((time: string, index: number) => (
        <div
          key={index}
          onClick={() => props.setter(time)}
          className={`flex justify-center items-center w-12 h-7 text-[10px] mx-0.5 rounded-sm border-[1px] border-gray-500 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${props.value===time && 'bg-primary text-black'}`}
        >
          {time}
        </div>
        ))
      }
    </div>
  );
}

export default TimeTab;