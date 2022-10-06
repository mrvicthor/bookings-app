import Link from "next/link";
import { Button } from "@/components/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Link as RLink } from "react-scroll";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedNav, setSelectedNav] = useState<string>("Home");

  const toggleNav = (value: string) => setSelectedNav(value);

  return (
    <nav className="bg-[#04040A] w-full overflow-hidden">
      <div className="flex gap-8 justify-between items-center px-4 py-2 md:max-w-[1040px] md:mx-auto">
        <RLink
          to="/"
          spy={true}
          smooth={true}
          className="font-bold text-[#0404FC] hover:text-white cursor-pointer"
        >
          JMTRAX
        </RLink>

        <ul className="flex gap-4 space-x-8">
          <li onClick={() => toggleNav("Home")}>
            <RLink
              to="/"
              spy={true}
              smooth={true}
              className={`${
                selectedNav === "Home" ? "text-white" : "text-[#8C948C]"
              } hover:text-white cursor-pointer`}
            >
              Home
            </RLink>
          </li>
          <li onClick={() => toggleNav("About")}>
            <RLink
              to="about"
              offset={-68}
              smooth={true}
              spy={true}
              className={`${
                selectedNav === "About" ? "text-white" : "text-[#8C948C]"
              } hover:text-white cursor-pointer`}
            >
              About Us
            </RLink>
          </li>
          <li onClick={() => toggleNav("Contact")}>
            <RLink
              to="contact"
              offset={-68}
              smooth={true}
              spy={true}
              className={`${
                selectedNav === "Contact" ? "text-white" : "text-[#8C948C]"
              } hover:text-white cursor-pointer`}
            >
              Contact Us
            </RLink>
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
              <Link href="/bookings">
                <a
                  onClick={() => toggleNav("Bookings")}
                  className={`${
                    selectedNav === "Bookings" ? "text-white" : "text-[#8C948C]"
                  } hover:text-white pt-1.5`}
                >
                  Bookings
                </a>
              </Link>

              <Button
                value="Dashboard"
                styles="text-[#8C948C] hover:text-white"
                handleClick={() => router.push("/dashboard")}
              />
              <Button
                value="Sign Out"
                styles="hover:text-white text-[#1738F3] border border-[#1738F3] rounded hover:bg-[#1738F3] hover:text-white"
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
