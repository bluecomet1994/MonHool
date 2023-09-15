import { SliderProps } from "@/types/props";

const Slider = (props: SliderProps) => {
  return (
    <div className="mt-16 mb-8">
      <div className="relative">
        <input
          type="range"
          className="custom-slider"
          value={props.value}
          max={props.endValue}
          onChange={({ target: { value } }) => props.handler(value)}
        />

        <span
          className="absolute -top-10 text-sm -translate-x-1/2 px-2 py-1 rounded-md bg-primary text-black"
          style={{ left: `${props.value / props.endValue * 100}%` }}>
          ${props.value}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm text-[#B3B3B3]">
        <p>${props.startValue.toLocaleString()}</p>
        <p>${props.endValue.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Slider;