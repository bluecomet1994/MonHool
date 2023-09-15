import { InputProps } from "@/types/props";

const Input = (props: InputProps) => {
  const { type, placeholder, operator, error } = props;

  return (
    <div className="flex flex-col relative w-full mt-4 md:mt-8 mb-6">
      <input
        type={type}
        {...operator}
        className="w-full p-2 text-xl border-none outline-none bg-opacity-0 [&~span]:focus:bg-black"
        required
      />
      <label className="input-label">{placeholder}</label>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700" />
      <p className="absolute top-full left-0 text-red-400 text-xs">{error}</p>

      <style jsx>{`
        .input-label {
          position: absolute;
          top: 0;
          left: 0;
          padding: 8px;
          transition: all .2s;
          z-index: 0;
        }

        input:focus~label, input:valid~label {
          font-size: 12px;
          top: -12px;
          padding: 0 8px;
          color: gray;
        }
      `}</style>
    </div>
  );
}

export default Input;