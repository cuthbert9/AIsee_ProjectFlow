import { FaBriefcase, FaLandmark } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { PiWarningOctagonFill } from "react-icons/pi";
import UseCaseItem from "./UseCaseCard.tsx";
import { useFormContext } from "react-hook-form";

export const CaseStudies = () => {
  const { watch, setValue } = useFormContext();
  const selectedUseCase = watch("useCase") || [];

  const useCases = [
    {
      title: "Marketing",
      description: "Brand monitoring and campaign tracking",
      icon: <VscGraph />,
    },
    {
      title: "Crisis",
      description: "Rapid response and reputation management",
      icon: <PiWarningOctagonFill />,
    },
    {
      title: "Executive",
      description: "High-level insights and executive summaries",
      icon: <FaBriefcase />,
    },
    {
      title: "PublicSector",
      description: "Government and public affairs monitoring",
      icon: <FaLandmark />,
    },
    {
      title: "Custom",
      description: "Build your own configuration",
      icon: <IoMdSettings />,
    },
  ];

  const handleSelect = (title: string) => {
    const current = selectedUseCase || [];

    if (current?.includes(title)) {
      setValue(
        "useCase",
        current.filter((item: any) => item !== title),
      );
    } else {
      setValue("useCase", [...current, title]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-8 border border-gray-200 shadow-sm w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        What’s your use case?
      </h2>
      <p className="text-gray-500 mb-6">
        Select the vertical that best matches your monitoring needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-4">
        {useCases?.map((item) => (
          <UseCaseItem
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            handleSelect={() => handleSelect(item.title)}
            selectedUseCase={selectedUseCase}
          />
        ))}
      </div>
    </div>
  );
};
