import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, IsLogin } from "../common/validate/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [errMsg, setErrMsg] = useState<string>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IsLogin>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: IsLogin) => {
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/dashboard",
    }).then((response) => {
      if (!response?.ok) {
        response?.error === "CredentialsSignin"
          ? setErrMsg("Invalid email address or password...")
          : "";
      } else {
        router.push("/dashboard");
        console.log("login successful");
        console.log(response);
      }
    });
  };
  console.log(session);
  return (
    <div className="bg-[#E3E3E7] h-[92.6vh]">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-4 mx-auto w-[90%] lg:max-w-[1140px] pt-20 lg:px-10"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white border rounded-lg px-8 py-10 "
          >
            {errMsg === "" ? null : (
              <p
                role="alert"
                className="bg-red-200 border border-red-300 rounded py-3 px-4 text-red-800"
              >
                {errMsg}
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                className="w-full py-3 px-5 border rounded border-[#E3E3E7]"
                type="email"
                id="email"
                {...register("email")}
                placeholder="Email"
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                className="w-full py-3 px-5 border rounded border-[#E3E3E7]"
                type="password"
                id="password"
                {...register("password")}
                placeholder="password"
              />
              <p className="text-red-600">{errors.password?.message}</p>
              <label>
                <Link href="/">
                  <a>Forgot Password?</a>
                </Link>
              </label>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="hoverAnimation bg-[#1738F3]  text-white w-full py-3.5 px-5 rounded relative z-[1] font-medium"
              >
                Login
              </button>
            </div>
            <div>
              Don't have account?{" "}
              <Link href="/signUp">
                <span className="text-[#042444] cursor-pointer font-semibold">
                  Sign Up
                </span>
              </Link>
            </div>
          </form>
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-6xl font-bold">Welcome Back, Login now!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, aperiam nobis minus officia dolorum, autem sapiente
              ipsam sit a veritatis eum placeat neque nesciunt totam excepturi
              ullam. Esse, provident eius.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Login;
