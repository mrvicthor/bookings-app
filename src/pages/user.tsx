import { useSession, signOut } from "next-auth/react";
import { Admin } from "@/components/index";
import { requireAuth } from "@/common/requireAuth";
import { Dashboard } from "@/components/index";
import { useEffect } from "react";
import { trpc } from "./../utils/trpc";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const User = () => {
  console.log();
  const { data: session } = useSession();

  // console.log(session);
  return (
    <>
      <h1>logged in</h1>
      <Admin />
      {/* {session?.user?.email === "mainadmission@gmail.com" && <Admin />}
      {session && <Dashboard />} */}
    </>
  );
};

export default User;
