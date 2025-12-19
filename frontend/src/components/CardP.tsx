import { useNavigate } from "react-router-dom";
import React from "react";
import { useDeleteProject } from "../hooks/useProjects";

const CardP = ({ data }: any) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteProject } = useDeleteProject();

  const handleDelete = async () => {
    if (!data?.id) return;
    if (
      window.confirm(
        `Are you sure you want to delete "${data?.name}"? This action cannot be undone.`,
      )
    ) {
      try {
        await deleteProject(data.id);
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Failed to delete project.");
      }
    }
  };

  const DataPoint = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div>
      <h3 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
        {label}
      </h3>
      <p className="text-sm text-gray-900 mt-1 font-medium leading-tight">
        {value || "—"}
      </p>
    </div>
  );

  const getPriorityClasses = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10";
      case "medium":
        return "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/10";
      case "low":
        return "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/10";
      default:
        return "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10";
    }
  };

  const formattedUseCase = Array.isArray(data?.usecases)
    ? data.usecases.join(", ")
    : data?.usecases;

  const formattedKeywords = Array.isArray(data?.keywords)
    ? data.keywords.join(", ")
    : undefined;

  const formattedDataSources = Array.isArray(data?.datasources)
    ? data.datasources.join(", ")
    : undefined;

  const formattedSocialMedia = Array.isArray(data?.socials)
    ? data.socials.join(", ")
    : undefined;

  const formattedWidgets = Array.isArray(data?.dashboardMetrics)
    ? data.dashboardMetrics.join(", ")
    : undefined;

  return (
    <div className="border border-gray-200 bg-white rounded-xl shadow-md p-4 w-full hover:shadow-lg transition-shadow h-full flex flex-col">

      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 leading-snug">
            {data?.name || "Project Name"}
          </h2>
        </div>

        <span
          className={`ml-4 flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getPriorityClasses(data?.priority)}`}
        >
          {data?.priority || "No Priority"}
        </span>
      </div>

      {data?.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 pb-2 border-b border-gray-100">
          {data.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-y-4 gap-x-6 my-4">
        <DataPoint label="Use Case" value={formattedUseCase} />
        <DataPoint label="Keywords" value={formattedKeywords} />
        <DataPoint label="Metrics" value={formattedWidgets} />
      </div>


      {(formattedDataSources || formattedSocialMedia) && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <DataPoint
            label="Data Sources"
            value={
              <>
                <span className="block">{formattedDataSources}</span>
                {formattedSocialMedia && (
                  <span className="block mt-1">
                    <span className="font-bold">SM: </span>
                    {formattedSocialMedia}
                  </span>
                )}
              </>
            }
          />
        </div>
      )}

      <div className="flex justify-end gap-2 mt-auto pt-5">
        <button
          onClick={() =>
            navigate(`/editPage/${encodeURIComponent(data?.name)}`)
          }
          type="button"
          className="px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-500 text-blue-500 hover:bg-blue-50 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          type="button"
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardP;
