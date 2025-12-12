import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface BottomNavProps {
  next: string;
  handleBack?: () => void;
  handleNext?: () => void;
  valid?: boolean;
  errorMessage?: string;
  submitAttempted?: boolean;
}

const BottomNav = ({
  next,
  handleBack,
  handleNext,
  valid,
  errorMessage,
  submitAttempted = false,
}: BottomNavProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 pt-6 border-gray-200">
      <div className="flex gap-5 items-center">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 bg-gray-100  px-6 py-2 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back
        </button>

        {next ? (
          <button
            type="button"
            onClick={() => {
              if (handleNext) {
                handleNext();
              }
              navigate("/ProjectCard");
            }}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <h1>{next}</h1>

            <FaCheck className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={false}
            onClick={handleNext}
            className={`flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md transition-colors  ${
              !valid
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 cursor-pointer"
            }`}
          >
            <h1>Next</h1>

            <FaArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {!valid && submitAttempted && errorMessage && (
        <p className="text-red-600 text-sm ml-auto">{errorMessage}</p>
      )}
    </div>
  );
};

export default BottomNav;
