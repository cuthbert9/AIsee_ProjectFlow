import { FaCheck } from "react-icons/fa6";

interface DataSourceCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

export default function DataSourceCard({
  title,
  description,
  checked,
  onChange,
}: DataSourceCardProps) {
  return (
    <div>
      <label
        className={`
        relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all
        ${
          checked
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`
          w-5 h-5 rounded border-2 flex items-center justify-center mr-3 mt-0.5  transition-colors
          ${
            checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
          }
        `}
        >
          {checked && (
            <FaCheck className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          )}
        </div>
        <div className="flex-1">
          <div
            className={`font-medium text-gray-900 ${checked ? "text-blue-700" : ""}`}
          >
            {title}
          </div>
          <div className={`text-sm mt-0.5 `}>{description}</div>
        </div>
      </label>
    </div>
  );
}
