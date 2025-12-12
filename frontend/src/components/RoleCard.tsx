import { FaArrowRight } from "react-icons/fa";

interface RoleCardProps {
  title: string;
  description: string;
  onSelectedRole?: () => void;
  selectedRole: string;
}

export default function RoleCard({
  title,
  description,
  onSelectedRole,
  selectedRole,
}: RoleCardProps) {
  return (
    <div
      onClick={onSelectedRole}
      className={`flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4 mb-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 
          ${selectedRole === title ? "outline-2 outline-blue-500" : ""}`}
    >
      <div>
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <FaArrowRight className="text-gray-400 text-sm" />
    </div>
  );
}
