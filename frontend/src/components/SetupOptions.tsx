import { LuSparkles } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

import { IoDocumentTextOutline } from "react-icons/io5";
import { useSContextStore } from "../Context";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";

export default function SetupOptions() {
  const { setValue } = useFormContext();

  const options = [
    {
      title: "Quick Setup",
      subtitle: "Answer 2 questions and AI will configure everything",
      tag: "Recommended",
      icon: <LuSparkles size={20} color={"blue"} />,
    },
    {
      title: "Advanced Setup",
      subtitle: "Full control over all configuration options",
      icon: <IoSettingsOutline size={20} />,
    },
    {
      title: "Use Template",
      subtitle: "Start from a pre-configured template",
      icon: <IoDocumentTextOutline size={20} />,
    },
  ];

  const ActiveIndex = useSContextStore((state) => state.activeIndex);

  const SetActiveIndex = useSContextStore((state) => state.setActiveIndex);

  const handleSetup = (key: string) => {
    SetActiveIndex(ActiveIndex + 1);
    setValue("setupMethod", key, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <>
      <h2 className="text-base md:text-lg font-semibold text-gray-800 mt-6">
        How would you like to set up your project?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {options.map((opt, i) => (
          <Link key={i} onClick={() => handleSetup(opt.title)} to={`/basics`}>
            <div className="h-[150px] items-center justify-center  rounded-lg p-6 shadow-lg bg-white hover:shadow-xl cursor-pointer transition">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className={"flex gap-2 items-center"}>
                    <div>{opt.icon}</div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {opt.title}
                      </h3>
                    </div>
                  </div>

                  <div>
                    {opt.tag && (
                      <span className="text-xs bg-gray-100 text-black px-2 py-1 rounded ml-6">
                        {opt.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={"ml-6"}>
                <p className="text-sm text-gray-600">{opt.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
