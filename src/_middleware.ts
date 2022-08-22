import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized(arg: any) {
        // `/admin` requires admin role
        console.log("token", arg);
        return arg.token?.user?.role === "ADMIN";
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
