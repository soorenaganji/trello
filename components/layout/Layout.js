import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPlusSquare, BsListCheck } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUser } from "@/api/profile";
const Layout = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getUser()
        .then((res) => res.data)
        .then((data) => setUserName(data.data.name));
    }
  }, [status]);

  let isUserOnSignupOrLoginPage = false;
  if (router.pathname == "/login" || router.pathname == "/signup") {
    isUserOnSignupOrLoginPage = true;
  }
  return (
    <div className="">
      <Toaster />
      <header
        className={`w-full md:px-8 px-4  py-4 border-b-2 border-slate-300 flex items-center justify-between  ${
          isUserOnSignupOrLoginPage ? "hidden" : ""
        } `}
      >
        <div className="flex items-end justify-center gap-8">
          <RxHamburgerMenu
            className="text-4xl cursor-pointer hidden md:block "
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <Image src={"/Logo.svg"} width={96} height={56} />
        </div>
        {status === "authenticated" ? (
          <Link
            href={"/profile"}
            className="px-4 py-2 md:px-6 md:py-3 bg-indigo-600 outline-none rounded-xl text-white  font-light flex items-center justify-center gap-4"
          >
            <AiOutlineUser className="md:text-3xl" />
            {userName}
          </Link>
        ) : null}
      </header>

      <div
        className={`min-h-screen max-h-full border-r-2 float-left transition-all duration-700  ${
          isUserOnSignupOrLoginPage ? "hidden" : ""
        } ${isSidebarOpen ? "w-44" : "w-24"} `}
      >
        <ul className="mx-auto flex items-center justify-start gap-8 flex-col pt-16 ">
          <Link
            href="/"
            className={`p-3 flex items-center justify-start gap-4 hover:bg-indigo-400 transition-all duration-300 hover:text-white rounded-xl  ${
              isSidebarOpen ? "w-32" : "text-3xl"
            }    `}
          >
            {" "}
            <BsListCheck /> {isSidebarOpen ? "Todos" : ""}
          </Link>
          <Link
            href="/add-todo"
            className={`p-3  flex items-center justify-start gap-4 hover:bg-indigo-400 transition-all duration-300 hover:text-white rounded-xl   ${
              isSidebarOpen ? "w-32 text-sm" : "text-2xl "
            }    `}
          >
            {" "}
            <BsPlusSquare /> {isSidebarOpen ? "Add Todo " : ""}
          </Link>
          <Link
            href="/profile"
            className={`p-3 flex items-center justify-start gap-4 hover:bg-indigo-400 transition-all duration-300 hover:text-white rounded-xl  ${
              isSidebarOpen ? "w-32" : "text-3xl "
            }    `}
          >
            {" "}
            <AiOutlineUser /> {isSidebarOpen ? "Profile" : ""}
          </Link>
        </ul>
      </div>
      <main
        className={`w-full transition-all duration-700   ${  isUserOnSignupOrLoginPage ?
          "" : isSidebarOpen ? "pl-44" : "pl-24"
        } `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
