import { FaCog, FaRegBell } from "react-icons/fa";
import { IoTelescopeSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
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

          <div className="w-9 h-9 bg-blue-700 text-white flex items-center justify-center rounded-full font-bold my-4  ">
            JD
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
