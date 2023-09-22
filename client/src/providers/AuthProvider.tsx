import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { loginWithJWTToken, logoutUser } from "@/store/actions/user.action";
import LoadingSplash from "@/components/shared/LoadingSplash";

export default function AuthProvider(props: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(({user}) => user);

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem('access-token');

    if (accessToken) {
      dispatch(loginWithJWTToken(accessToken)).then((response: any) => {
        if (!response.success) {
          Swal.fire({
            toast: true,
            icon: "error",
            position: 'top-right',
            text: "The token has expired. Please refresh the page.",
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false
          });

          dispatch(logoutUser());
        }
      });
    }
  }, []);

  return (
    <div>{props.children}</div>
  );
}