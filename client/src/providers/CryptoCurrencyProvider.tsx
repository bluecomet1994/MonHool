import { getCurrencyTrading } from "@/store/actions/currency.action";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CryptoCurrencyProvider({ children }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector(({ currency }) => currency);

  useEffect(() => {
    dispatch(getCurrencyTrading());
  }, [router]);

  return isLoading ? (
    <div className="flex justify-center items-center w-full h-screen bg-[#181818]">
      <div className="spinner"></div>
    </div>
  ) : (
    <div>{children}</div>
  );
}