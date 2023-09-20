import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from "sweetalert2";

import Navbar from "@/layouts/Navbar";
import Input from "@/components/shared/Input";
import ChipIcon from "@/components/shared/icons/ChipIcon";
import { registerValidationSchema } from "@/validations/authValidationSchema";
import { fadeSmallLeftVariant, fadeSmallRightVariant } from "@/utils/animations";
import { registerUser } from "@/store/actions/user.action";
import { RegisterUserType } from "@/types/components";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formOptions = { resolver: yupResolver(registerValidationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data: RegisterUserType) => {
    dispatch(registerUser(data))
      .then((response: any) => {
        Swal.fire({
          toast: true,
          icon: response.success ? 'success' : 'warning',
          position: 'top-right',
          text: response.message,
          timerProgressBar: true,
          timer: 3000,
          showConfirmButton: false
        });

        if(response.success) {
          reset();
          router.push('/auth/login');
        }
      });
  }

  return (
    <main className="flex justify-center w-full h-screen overflow-hidden">
      <div className="container flex flex-col">
        <Navbar />

        <div className="flex flex-row-reverse w-full h-full mb-8">
          <motion.div
            initial="hide" whileInView="show" variants={fadeSmallRightVariant(0.5)}
            className="hidden md:flex justify-center items-center w-full h-full"
          >
            <Image alt="banner" src={'/assets/images/auth_image.png'} width={678} height={523} priority />
          </motion.div>

          <div className="flex justify-center items-center w-full h-full p-4">
            <motion.div
              initial="hide" whileInView="show" variants={fadeSmallLeftVariant(0.5)}
              className="flex flex-col justify-center items-center w-full rounded-xl bg-white text-black px-8 py-12 md:py-20"
            >
              <ChipIcon />

              <h1 className="font-bold text-3xl md:text-5xl text-center">Get started!</h1>
              <p className="text-gray-500 text-xl my-4">Please enter your details</p>

              <form className="w-full md:px-8 md:mt-8" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  placeholder="Username"
                  operator={register('username')}
                  error={errors.username?.message}
                />

                <Input
                  type="text"
                  placeholder="Email"
                  operator={register('email')}
                  error={errors.email?.message}
                />

                <Input
                  type="password"
                  placeholder="Password"
                  operator={register('password')}
                  error={errors.password?.message}
                />

                <p className="text-sm">
                  Already have an account?
                  <Link href={'/auth/login'} className="mx-2 hover:underline">Sign in</Link>
                </p>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="w-3/4 p-3 rounded-full bg-black text-white text-2xl transition-all duration-300 border-[2px] border-black hover:bg-white hover:text-black"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}