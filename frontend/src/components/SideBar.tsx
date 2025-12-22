import { FaCog, FaRegBell } from "react-icons/fa";
import { IoTelescopeSharp } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../hooks/useUser.ts";



export default function Sidebar() {
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const navigate = useNavigate();
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const { data } = useUser();
  const user = data?.split("@")[0] || null;
  const initials = user ? user[0].toUpperCase() : "";




  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setOpenAccountMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <aside className="hidden md:flex w-72 h-screen bg-gray-50  flex-row fixed ">
      <div className="mt-auto bg-black h-full border-t p-4 flex flex-col items-center gap-5 text-gray-600 justify-between">
        <div>
          <IoTelescopeSharp
            size={28}
            className="text-xl text-white cursor-pointer hover:text-blue-500"
          />
        </div>

        <div className={"flex-row  "}>
          <IoSearch
            size={28}
            className="text-xl text-white cursor-pointer hover:text-blue-500 my-4"
          />
          <IoSettingsOutline
            size={28}
            className="text-xl text-white  cursor-pointer hover:text-blue-500 my-4"
          />
          <div className="relative inline-block">
            <FaRegBell
              size={28}
              className="text-white cursor-pointer hover:text-blue-500"
            />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full  translate-x-1/2 -translate-y-1/2" />
          </div>

          <div
            ref={accountMenuRef}
            className="w-9 h-9 bg-blue-700 text-white flex items-center justify-center rounded-full font-bold my-4  ">

            <button
              onClick={() => setOpenAccountMenu(!openAccountMenu)}
            >{initials}</button>

            {openAccountMenu && (
              <div className="absolute right-8 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <h1 className="text-sm text-black text-center mt-2 font-medium"> {user}</h1>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="block w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                  <RiLogoutCircleLine />
                  <h1>  Logout</h1>
                </button>
              </div>
            )
            }
          </div>
        </div>
      </div>

      <div className={"flex-1 bg-gray-300"}>
        <div className="flex items-center justify-start mx-8 my-3  ">
          <GoDotFill size={10} className={"mx-2"} />
          <h1 className="text-sm  tracking-wide font-bold text-gray-700">
            {" "}
            GLOBAL
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-4 ">
          <div
            onClick={() => navigate("/ProjectCard")}
            className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-blue-600"
          >
            <FiHome className="text-lg" />
            Projects
          </div>
          <div className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-blue-600">
            <FaCog className="text-lg" />
            Settings
          </div>
        </nav>
      </div>
    </aside>
  );
}
