import { TransactionInputProp } from "@/types/props";
import ClipboardIcon from "../shared/icons/ClipboardIcon";

const TransactionInput = (props: TransactionInputProp) => {
  const { type, placeholder, editable, value, onChange } = props;

  return (
    <div className="flex flex-col relative w-full py-4 mb-8">
      {
        type === 'clipboard' ? (
          <>
            <input
              type={type}
              value={value}
              className="w-full p-2 text-sm md:text-xl border-none outline-none bg-[#181818] [&~span]:focus:bg-white"
              disabled={!editable}
              required
            />

            <div className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
              <ClipboardIcon />
            </div>
          </>
        ) : (
          <input
            type={type}
            value={value}
            onChange={({target:{value}}) => onChange(value)}
            className="w-full p-2 text-sm md:text-xl border-none outline-none bg-[#181818] [&~span]:focus:bg-white"
            disabled={!editable}
            required
          />
        )
      }
      <label className="input-label">{placeholder}</label>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#AEAEAE]" />

      <style jsx>{`
        .input-label {
          position: absolute;
          top: 50%;
          left: 0;
          padding: 8px;
          color: #B6B0B0;
          transform: translateY(-50%);
          transition: all .2s;
          z-index: 0;
        }

        input:focus~label, input:valid~label {
          font-size: 12px;
          top: 0;
          padding: 0 8px;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default TransactionInput;