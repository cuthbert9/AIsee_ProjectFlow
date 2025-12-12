export default function ReviewProject({ project }: any) {


  const {
    projectName,
    description,
    priority,
    setupMethod,
    keywords,
    dataSources,
    widgets,
  } = project;



  return (
    <div className="w-full border-t border-gray-100 mx-auto bg-white rounded-lg shadow-lg p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          Review Your Project
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Confirm all settings before creating your project
        </p>
      </div>

      {/* Project Information */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Project Information
        </h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Name:</span>{" "}
            <span className="text-gray-900">{projectName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Description:</span>{" "}
            <span className="text-gray-900">{description || "—"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Priority:</span>{" "}
            <span className="text-gray-900 bg-gray-200 p-1">{priority}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Setup Method:</span>{" "}
            <span className="text-gray-900  bg-gray-200 p-1 ">
              {setupMethod || "quick"}
            </span>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">
          Keywords <span className="text-gray-500">({keywords?.length})</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {keywords?.length > 0 ? (
            keywords?.map((keyword: any) => (
              <span
                key={keyword}
                className="inline-flex items-center px-3 py-1 bg-gray-200  text-sm font-medium"
              >
                {keyword.value}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No keywords added</span>
          )}
        </div>
      </div>

      {/* Data Sources */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">
          Data Sources{" "}
          <span className="text-gray-500">({dataSources?.length})</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {dataSources?.length > 0 ? (
            dataSources?.map((source: string) => (
              <span
                key={source}
                className="flex items-center px-3 py-1 bg-gray-100 text-gray-700  text-sm font-medium"
              >
                {source}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No sources selected</span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">
          Socials{" "}
          <span className="text-gray-500">
            ({project.socialMediaPlatforms?.length})
          </span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.socialMediaPlatforms?.length > 0 ? (
            project.socialMediaPlatforms?.map((source: string) => (
              <span
                key={source}
                className="flex items-center px-3 py-1 bg-gray-100 text-gray-700  text-sm font-medium"
              >
                {source}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No Sociala selected</span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">
          Dashboard Widgets{" "}
          <span className="text-gray-500">({widgets?.length})</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {widgets?.length > 0 ? (
            widgets?.map((widget: string) => (
              <span
                key={widget}
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700  text-sm font-medium"
              >
                {widget}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No widgets selected</span>
          )}
        </div>
      </div>
    </div>
  );
}
