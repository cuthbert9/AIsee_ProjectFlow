import React from "react";
import { Link } from "react-router-dom";
import { useSContextStore } from "../Context";

interface StepItemProps {
  title: string;
  index: number;
  activeStep: number;
  icon: React.ReactNode;
  to: string;
}

export default function StepItem({ title, index, icon, to }: StepItemProps) {
  // @ts-ignore
  const ActiveIndex = useSContextStore((state) => state.activeIndex);
  // @ts-ignore
  const SetActiveIndex = useSContextStore((state) => state.setActiveIndex);

  const isActive = index <= ActiveIndex;

  return (
    <div className="flex flex-col   ">
      <div className={"flex items-center gap-2"}>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full  ${
            isActive ? " bg-blue-300 text-white" : "bg-gray-200 text-gray-400"
          }`}
        >
          <Link onClick={() => SetActiveIndex(index)} to={to}>
            {icon}
          </Link>
        </div>
        {title !== "Review" && (
          <div
            className={`h-[1px] w-30  mx-2 ${
              isActive ? "bg-blue-500" : "bg-gray-700"
            } `}
          />
        )}
      </div>

      <div>
        <p
          className={`text-sm mt-2  ${
            isActive ? "text-blue-600 font-medium" : "text-gray-500"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
