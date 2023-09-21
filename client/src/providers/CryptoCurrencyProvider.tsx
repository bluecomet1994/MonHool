import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyTrading } from "@/store/actions/currency.action";
import LoadingSplash from "@/components/shared/LoadingSplash";

export default function CryptoCurrencyProvider({ children }: any) {
  const dispatch = useDispatch();
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
  }, []);

  return isLoading ? <LoadingSplash /> : <div>{children}</div>;
}