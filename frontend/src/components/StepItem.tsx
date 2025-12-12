import React from "react";
import { useSContextStore } from "../Context";

interface StepItemProps {
  title: string;
  index: number;
  activeStep: number;
  icon: React.ReactNode;
  to: string;
}

export default function StepItem({ title, index, icon }: StepItemProps) {
  const ActiveIndex = useSContextStore((state) => state.activeIndex);
  const isActive = index <= ActiveIndex;

  return (
    <div className="flex flex-col   ">
      <div className={"flex items-center gap-2"}>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full  ${
            isActive ? " bg-blue-300 text-white" : "bg-gray-200 text-gray-400"
          }`}
        >
          {icon}
        </div>
        {title !== "Review" && (
          <div
            className={`h-[1px] w-25  mx-2 ${
              isActive ? "bg-blue-500" : "bg-gray-300"
            } `}
          />
        )}
      </div>

      <div>
        <p
          className={`text-sm mt-2  ${
            isActive ? "text-black font-medium" : "text-gray-500"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
