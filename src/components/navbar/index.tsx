import Link from "next/link";
import { Button } from "@/components/index";
import { signIn } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="bg-[#04040A]">
      <div className="flex gap-8 justify-between items-center px-4 py-2 lg:max-w-[1140px] lg:mx-auto">
        <Link href="/">
          <a className="font-bold text-[#8C948C] hover:text-white">JMTRAX</a>
        </Link>

        <ul className="flex gap-4 space-x-8">
          <li>
            <Link href="/">
              <a className="text-[#8C948C] hover:text-white">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/bookings">
              <a className="text-[#8C948C] hover:text-white">Bookings</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="text-[#8C948C] hover:text-white">About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className="text-[#8C948C] hover:text-white">Contact Us</a>
            </Link>
          </li>
        </ul>
        <div className="flex gap-4 justify-between">
          <Button
            value="Log In"
            styles="text-[#8C948C] hover:text-white"
            handleClick={() => {
              signIn("github", {
                callbackUrl: "http://localhost:3000/bookings",
              });
            }}
          />
          <Button
            value="Sign Up"
            styles="bg-[#0404FC] rounded-md text-white font-bold hover:bg-[#040484]"
            handleClick={() => console.log("Sign up...")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
