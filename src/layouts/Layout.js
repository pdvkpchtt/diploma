"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div
        className={
          !pathname?.includes("call/")
            ? `
        h-full
        flex flex-col justify-start
        max-w-[1012px] [@media(hover)]:min-w-[1012px] [@media(pointer:coarse)]:max-w-[500px] mx-auto 
        px-[16px] [@media(pointer:coarse)]:px-[12px]
        items-start [@media(pointer:coarse)]:items-center            
       `
            : "w-[100vw] h-[100vh]"
        }
      >
        {children}
      </div>

      <ToastContainer
        toastClassName={() =>
          "relative flex rounded-[16px] select-none [@media(pointer:coarse)]:rounded-[0px] shadow h-[50px] p-1 justify-between overflow-hidden cursor-pointer bg-[#fff] text-[#2c2c2c] dark:bg-[#212122] dark:text-white"
        }
        limit={1}
      />
    </ThemeProvider>
  );
};

export default Layout;
