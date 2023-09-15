import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import Navbar from "@/layouts/Navbar";
import Input from "@/components/shared/Input";
import { registerValidationSchema } from "@/validations/authValidationSchema";
import { fadeSmallLeftVariant, fadeSmallRightVariant } from "@/utils/animations";

export default function Register() {
  const formOptions = { resolver: yupResolver(registerValidationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data: any) => {
    console.log(data);
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
              <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                <path d="M45.4963 24.2464L26.7325 5.48262C25.9463 4.69637 24.8625 4.25012 23.7363 4.25012H8.5C6.1625 4.25012 4.25 6.16262 4.25 8.50012V23.7364C4.25 24.8626 4.69625 25.9464 5.50375 26.7326L24.2675 45.4964C25.925 47.1539 28.6238 47.1539 30.2813 45.4964L45.5175 30.2601C47.175 28.6026 47.175 25.9251 45.4963 24.2464ZM27.2638 42.5001L8.5 23.7364V8.50012H23.7363L42.5 27.2639L27.2638 42.5001Z" fill="black" />
                <path d="M13.8125 17C15.5729 17 17 15.5729 17 13.8125C17 12.0521 15.5729 10.625 13.8125 10.625C12.0521 10.625 10.625 12.0521 10.625 13.8125C10.625 15.5729 12.0521 17 13.8125 17Z" fill="black" />
              </svg>

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