import React from "react";

interface UseCaseItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selectedUseCase?: string[];
  handleSelect: () => void;
}

const UseCaseItem: React.FC<UseCaseItemProps> = ({
  title,
  description,
  icon,
  selectedUseCase,
  handleSelect,
}) => {
  const containingValues = selectedUseCase && selectedUseCase?.includes(title);
  return (
    <button
      type={"button"}
      onClick={handleSelect}
      className={`flex items-start gap-4 p-5 border border-gray-100 rounded-xl 
             hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white w-full text-left
             ${containingValues ? "outline-2 outline-blue-500" : ""}
`}
    >
      <div className="text-3xl text-blue-600">{icon}</div>

      <div>
        <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>
    </button>
  );
};

export default UseCaseItem;
