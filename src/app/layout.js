import "./globals.css";

import { getServSession } from "./api/auth/[...nextauth]/route";
import SessionProvider from "../server/SessionProvider";
import AuthLayout from "../layouts/AuthLayout";
import Layout from "../layouts/Layout";
import Header from "../shared/ui/Header";
import BottomNav from "../shared/ui/BottomNav";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServSession();
  console.log(session);
  return (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body className="bg-[#f6f6f8] dark:bg-[#141414] hideScrollbarNav h-[100vh]">
        <SessionProvider session={session}>
          <AuthLayout>
            <Header role={session?.user?.role} />
            <Layout>{children}</Layout>
            <BottomNav role={session?.user?.role} />
          </AuthLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
