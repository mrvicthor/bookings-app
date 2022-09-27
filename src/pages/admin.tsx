import { useSession, getSession } from "next-auth/react";
import { Table } from "@/components/index";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import { Booking } from "./../models/booking";
interface UserProps {
  bookings: Booking[];
  email: string;
  id: string;
  password: string;
  role: string;
  username: string;
}

const Admin = () => {
  const { data: session }: any = useSession();
  const { data }: any = trpc.useQuery(["user.getAllUsers"]);
  const [users, setUsers] = useState<UserProps[]>([]);
  console.log(session);
  useEffect(() => {
    if (!data?.length) return;

    setUsers(() => [...data]);
    console.log(users);
  }, [session, data]);

  if (session && session.user?.role === "ADMIN")
    return (
      <section className="py-16">
        <div className="md:max-w-[1040px] md:mx-auto space-y-3 md:px-5">
          <h1 className="text-black text-2xl font-medium">
            Welcome, {session.user?.username}
          </h1>
          <h2 className="text-center text-xl text-[#8C948C]">Users List</h2>
          <div className="shadow overflow-hidden rounded border-b border-gray-200">
            {users.length === 0 ? (
              <h2 className="text-[#8C948C] text-center py-2 text-lg">
                There is no user to display
              </h2>
            ) : (
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
                      ID
                    </th>
                    <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
                      Name
                    </th>
                    <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
                      Email
                    </th>
                    <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
                      Booking(s)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className=" text-left py-3 px-4">{index}</td>
                      <td className=" text-left py-3 px-4">{user?.username}</td>
                      <td className=" text-left py-3 px-4">{user?.email}</td>
                      <td className=" text-left py-3 px-4">
                        {user.bookings.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    );
};

export default Admin;
