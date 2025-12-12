import { FaDatabase } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import StepItem from "./StepItem.tsx";

interface StepperProps {
  activeStep: number;
}

export default function Stepper({ activeStep }: StepperProps) {
  const steps = [
    {
      title: "Setup Method",
      icon: <LuSparkles size={28} />,
      to: "/",
    },
    {
      title: "Project Basics",
      icon: <IoDocumentTextOutline size={28} />,
      to: "/basics",
    },
    {
      title: "Data Sources",
      icon: <FaDatabase size={28} />,
      to: "/dataSources",
    },
    {
      title: "Configuration",
      icon: <IoSettingsOutline size={28} />,
      to: "/configuration",
    },
    {
      title: "Review",
      icon: <FaCheck size={25} />,
      to: "/review",
    },
  ];

  return (
    <div className="hidden lg:flex justify-between items-center w-full max-w-2xl my-6 overflow-x-auto md:overflow-visible">
      {steps.map((step, i) => (
        <StepItem
          key={i}
          title={step.title}
          index={i + 1}
          activeStep={activeStep}
          icon={step.icon}
          to={step.to}
        />
      ))}
    </div>
  );
}
