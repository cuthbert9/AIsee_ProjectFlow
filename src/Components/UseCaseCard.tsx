import React from "react";

interface UseCaseItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selectedUseCase?: string[];
  setSelectedUseCase?: React.Dispatch<React.SetStateAction<string[]>>;
}

const UseCaseItem: React.FC<UseCaseItemProps> = ({
  title,
  description,
  icon,
  selectedUseCase,
  setSelectedUseCase,
}) => {
  const handleSelect = () => {
    setSelectedUseCase((prev) => {
      if (!prev) return [title];
      if (prev.includes(title)) return prev.filter((t) => t !== title);
      return [...prev, title];
    });
  };

  return (
    <button
      onClick={handleSelect}
      className={`flex items-start gap-4 p-5 border border-gray-100 rounded-xl 
             hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white w-full text-left
             ${(selectedUseCase || []).includes(title) ? "outline-2 outline-blue-500" : ""}`}
    >
      <div className="text-3xl text-blue-600">{icon}</div>

      <div>
        <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </button>
  );
};

export default UseCaseItem;
