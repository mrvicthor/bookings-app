import Link from "next/link";
import { Button } from "@/components/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedNav, setSelectedNav] = useState<string>("Home");

  const toggleNav = (value: string) => setSelectedNav(value);

  return (
    <nav className="bg-[#04040A]">
      <div className="flex gap-8 justify-between items-center px-4 py-2 lg:max-w-[1140px] lg:mx-auto">
        <Link href="/">
          <a className="font-bold text-[#8C948C] hover:text-white">JMTRAX</a>
        </Link>

        <ul className="flex gap-4 space-x-8">
          <li onClick={() => toggleNav("Home")}>
            <Link href="/">
              <a
                className={`${
                  selectedNav === "Home" ? "text-white" : "text-[#8C948C]"
                } hover:text-white`}
              >
                Home
              </a>
            </Link>
          </li>
          <li onClick={() => toggleNav("About")}>
            <Link href="/about">
              <a
                className={`${
                  selectedNav === "About" ? "text-white" : "text-[#8C948C]"
                } hover:text-white`}
              >
                About Us
              </a>
            </Link>
          </li>
          <li onClick={() => toggleNav("Contact")}>
            <Link href="/contact">
              <a
                className={`${
                  selectedNav === "Contact" ? "text-white" : "text-[#8C948C]"
                } hover:text-white`}
              >
                Contact Us
              </a>
            </Link>
          </li>
        </ul>
        <div className="flex gap-4 justify-between">
          {!session && (
            <>
              <Button
                value="Log In"
                styles="text-[#8C948C] hover:text-white"
                handleClick={() => router.push("/login")}
              />
              <Button
                value="Sign Up"
                styles="bg-[#0404FC] rounded-md text-white font-bold hover:bg-[#040484]"
                handleClick={() => router.push("/signUp")}
              />
            </>
          )}
          {session && (
            <>
              <Button
                value="Bookings"
                styles="text-[#8C948C] hover:text-white"
                handleClick={() => router.push("/bookings")}
              />
              <Button
                value="Dashboard"
                styles="text-[#8C948C] hover:text-white"
                handleClick={() => router.push("/dashboard")}
              />
              <Button
                value="Sign Out"
                styles="hover:text-[#8C948C] text-white border border-[#0404FC] rounded"
                handleClick={() => signOut({ callbackUrl: "/" })}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
