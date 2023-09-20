import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyTrading } from "@/store/actions/currency.action";

export default function CryptoCurrencyProvider({ children }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector(({ currency }) => currency);

  useEffect(() => {
    dispatch(getCurrencyTrading()).catch((error: Error) => {
      Swal.fire({
        toast: true,
        icon: "error",
        position: 'top-right',
        text: "Sorry, something went wrong. Please refresh the page.",
        timerProgressBar: true,
        timer: 3000,
        showConfirmButton: false
      });
    });
  }, [router]);

  return isLoading ? (
    <div className="flex justify-center items-center w-full h-screen bg-[#181818]">
      <div className="spinner"></div>
    </div>
  ) : (
    <div>{children}</div>
  );
}