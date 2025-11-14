import { FaCog, FaBell } from "react-icons/fa";
import { IoTelescopeSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

export default function Sidebar() {
  return (
    <aside className="w-100 h-screen bg-gray-50  flex flex-row fixed ">
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
          <IoMdSettings
            size={28}
            className="text-xl text-white  cursor-pointer hover:text-blue-500 my-4"
          />
          <FaBell
            size={28}
            className="text-xl text-white cursor-pointer hover:text-blue-500 my-4"
          />
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
          <div className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-blue-600">
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
