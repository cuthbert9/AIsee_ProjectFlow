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

export default function StepItem({
  title,
  index,

  icon,
  to,
}: StepItemProps) {
  const ActiveIndex = useSContextStore((state) => state.activeIndex);
  const SetActiveIndex = useSContextStore((state) => state.setActiveIndex);

  const isActive = index <= ActiveIndex;

  return (
    <div className="flex flex-col   ">
      <div className={"flex items-center gap-2"}>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
            isActive
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-300 text-gray-400"
          }`}
        >
          <button onClick={(index) => SetActiveIndex(index)}>
            <Link to={to}>{icon}</Link>
          </button>
        </div>
        {title !== "Review" && (
          <div
            className={`h-0.5 w-20   ${
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
