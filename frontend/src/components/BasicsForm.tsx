import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

type FormValues = {
  projectName: string;
  useCase: string[];
  description: string;
  keywords: { value: string }[];
};

const useCaseOptions = [
  "Marketing",
  "Crisis",
  "Executive",
  "PublicSector",
  "Custom",
];

const BasicForm = () => {
  const { register, control, watch, setValue } = useFormContext<FormValues>();

  const [keywordInput, setKeywordInput] = useState("");

  const keywords = watch("keywords") || [];

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.some((k) => k.value === trimmed)) {
      setValue("keywords", [...keywords, { value: trimmed }]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setValue(
      "keywords",
      keywords.filter((k) => k.value !== keyword),
    );
  };

  return (
    <div className="space-y-4 p-4 max-w-lg mx-auto shadow-2xl rounded">
      {/* Project Name */}
      <div>
        <label className="block font-medium mb-1">Project Name</label>
        <input
          {...register("projectName", { required: "Project Name is required" })}
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Enter project name"
        />
      </div>

      {/* Use Case Checkboxes */}
      <div>
        <label className="block font-medium mb-2">Use Cases</label>
        <Controller
          control={control}
          name="useCase"
          rules={{
            required: "At least one use case is required",
            validate: (value) => (value && value.length > 0) || "At least one use case is required"
          }}
          render={({ field }) => (
            <div className="space-y-2">
              {useCaseOptions.map((option) => {
                const isChecked = field.value?.includes(option) || false;
                return (
                  <label
                    key={option}
                    className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const currentValue = field.value || [];
                        if (e.target.checked) {
                          field.onChange([...currentValue, option]);
                        } else {
                          field.onChange(currentValue.filter((v: string) => v !== option));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          )}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="border rounded p-2 w-full"
          placeholder="Describe your project"
          rows={4}
        />
      </div>

      {/* Keywords */}
      <div>
        <label className="block font-medium mb-1">Keywords</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addKeyword();
              }
            }}
            className="border rounded p-2 flex-1"
            placeholder="Add a keyword"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Render added keywords */}
        <div className="flex flex-wrap gap-2 mt-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
            >
              {keyword.value}
              <button
                type="button"
                onClick={() => removeKeyword(keyword.value)}
                className="text-red-500 font-bold"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicForm;
