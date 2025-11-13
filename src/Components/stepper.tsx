import {  FaDatabase, FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { LuSparkles } from "react-icons/lu";
import StepItem from "./StepItem";


interface StepperProps {
    activeStep: number;
}

export default function Stepper({ activeStep }: StepperProps) {
    const steps = [
        { title: "Setup Method", icon: <LuSparkles size={28} /> },
        { title: "Project Basics", icon: <IoDocumentTextOutline size={28}/> },
        { title: "Data Sources", icon: <FaDatabase size={28}/> },
        { title: "Configuration", icon: <MdOutlineSettings size={28}/> },
        { title: "Review", icon: <FaCheckCircle size={28}/> },
    ];

    return (
        <div className="flex justify-between items-center w-full max-w-2xl   my-6">
            {steps.map((step, i) => (
                <StepItem
                    key={i}
                    title={step.title}
                    index={i + 1}
                    activeStep={activeStep}
                    icon={step.icon}
                />
            ))}
        </div>
    );
}
