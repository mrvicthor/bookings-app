import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, IsSignUp } from "@/common/validate/auth";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback } from "react";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IsSignUp>({
    resolver: zodResolver(signUpSchema),
  });

  //   const { mutateAsync } = trpc.useMutation(["user.createUser"]);
  const { mutateAsync } = trpc.useMutation(["user.signUp"]);

  const onSubmit = async (data: IsSignUp) => {
    const result = await mutateAsync(data);
    if (result.status === 201) {
      router.push("/login");
    }
  };

  return (
    <div className="bg-[#E3E3E7] h-[92.6vh]">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-8 mx-auto w-[90%] lg:max-w-[1040px] pt-20 lg:px-8"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white border rounded-lg px-8 py-10 "
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register("username")}
                className="w-full py-3 px-5 border rounded border-[#E3E3E7]"
                placeholder="Username..."
              />

              {errors.username && (
                <p className="text-red-600">Please enter a username</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full py-3 px-5 border rounded border-[#E3E3E7]"
                placeholder="Email"
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full py-3 px-5 border rounded border-[#E3E3E7]"
                placeholder="password"
              />
              <p className="text-red-600">{errors.password?.message}</p>
              <label>
                <Link href="/login">
                  <a>Already have an account? Login</a>
                </Link>
              </label>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="hoverAnimation bg-[#1738F3]  text-white w-full py-3.5 px-5 rounded relative z-[1] font-medium"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-6xl font-bold">Sign Up!</h1>
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

export default SignUp;
