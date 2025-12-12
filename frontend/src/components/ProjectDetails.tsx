import { useEffect } from "react";
import { VscGraph } from "react-icons/vsc";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useSContextStore } from "../Context";

interface IFormData {
  projectName: string;
  description: string;
  keywords: { value: string }[];
  keywordInput: string;
  priority: string;
}

export default function ProjectDetailsForm() {
  const {
    register,
    control,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<IFormData>();

  const submitAttempted = useSContextStore((state) => state.submitAttempted);

  // Trigger validation on mount if persisted data exists
  useEffect(() => {
    const persistedProjectName = getValues("projectName");
    const persistedDescription = getValues("description");

    if (persistedProjectName && persistedDescription) {
      setTimeout(() => {
        trigger(["projectName", "description", "priority"]);
      }, 100);
    }
  }, [trigger, getValues]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  const keywordInput = watch("keywordInput");

  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;

    append({ value: keywordInput.trim() });
    setValue("keywordInput", "");
  };

  return (
    <>
      <div className="w-full my-4 border-t border-gray-100 bg-white rounded-lg shadow-lg p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Project Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Basic information about your monitoring project
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("projectName", { required: "Name is required " })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter Name"
          />
          {submitAttempted && errors.projectName && (
            <span className={"text-red-600 text-sm mt-1 block"}>
              {errors.projectName?.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            {...register("description", {
              required: "description is required ",
              maxLength: 1000,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none focus:outline-none"
            placeholder="Description"
          />
        </div>

        {/* Keywords */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keywords <span className="text-xs">(optional)</span>
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              {...register("keywordInput")}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter keywords"
            />

            <button
              type="button"
              onClick={handleAddKeyword}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {fields.map((item: any, index) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded"
              >
                {item.value}

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Priority + Icon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              required
              {...register("priority", { required: true })}
              className="w-1/3 px-3 py-2 border rounded-md"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Icon
            </label>
            <div className="w-full px-3 py-2 border rounded-md bg-gray-50">
              <VscGraph size={25} color="green" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
