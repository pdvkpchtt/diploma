import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServSession } from "../app/api/auth/[...nextauth]/route";

const AuthLayout = async ({ children }) => {
  const session = await getServSession();
  const headersList = headers();
  const fullUrl = headersList.get("x-invoke-path") || "";
  console.log(fullUrl);

  if (!session && !["/auth/verify", "/auth"].includes(fullUrl)) {
    return redirect("/auth");
  }
  if (!session?.user?.role && fullUrl !== "/auth/role" && fullUrl !== "/auth") {
    return redirect("/auth/role");
  }

  if (
    session?.user?.role &&
    ["/auth/role", "/auth", "/auth/verify", "/"].includes(fullUrl)
  ) {
    return redirect("/profile");
  }
  if (
    session?.user?.role === "hr_no_nickname" &&
    fullUrl !== "/companyprofile/edit"
  )
    return redirect("/companyprofile/edit");

  if (session?.user?.role === "student" && fullUrl === "/companyprofile") {
    return redirect("/profile");
  }
  if (session?.user?.role === "student" && fullUrl === "/companyprofile/edit") {
    return redirect("/profile/edit");
  }
  if (
    session?.user?.role === "student" &&
    fullUrl === "/companyprofile/createvacancy"
  ) {
    return redirect("/profile");
  }

  return <div className={"auth w-full h-full"}>{children}</div>;
};

export default AuthLayout;
