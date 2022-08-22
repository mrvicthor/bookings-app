import { useSession, getSession } from "next-auth/react";

const Admin = () => {
  const { data: session }: any = useSession();
  console.log(session);
  if (session && session.user?.role === "ADMIN")
    return (
      <>
        <h1 className="text-black">Admin</h1>
      </>
    );
};

export default Admin;
