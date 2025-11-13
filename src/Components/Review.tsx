
import BottomNav from "./BottomNav.tsx";


interface ProjectData {
    name: string;
    description: string;
    priority: string;
    setupMethod: string;
    keywords: string[];
    dataSources: string[];
    widgets: string[];
}

interface ReviewProjectProps {
    project: ProjectData;
    onBack?: () => void;
    onCreate?: () => void;
}

//@ts-ignore
export default function ReviewProject({project, onBack, onCreate, }: ReviewProjectProps) {
    const {
        name,
        description,
        priority,
        setupMethod,
        keywords,
        dataSources,
        widgets,
    } = project;



    return (
        <div className="w-full border-t border-gray-100 mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-gray-900">Review Your Project</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Confirm all settings before creating your project
                </p>
            </div>

            {/* Project Information */}
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Information</h2>
                <div className="space-y-3 text-sm">
                    <div>
                        <span className="font-medium text-gray-700">Name:</span>{' '}
                        <span className="text-gray-900">{name}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Description:</span>{' '}
                        <span className="text-gray-900">{description || '—'}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Priority:</span>{' '}
                        <span className="text-gray-900">{priority}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Setup Method:</span>{' '}
                        <span className="text-gray-900">{setupMethod}</span>
                    </div>
                </div>
            </div>

            {/* Keywords */}
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                    Keywords <span className="text-gray-500">({keywords.length})</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                    {keywords.length > 0 ? (
                        keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                {keyword}
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
                    Data Sources <span className="text-gray-500">({dataSources.length})</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                    {dataSources.length > 0 ? (
                        dataSources.map((source) => (
                            <span
                                key={source}
                                className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                            >
                {source}
              </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No sources selected</span>
                    )}
                </div>
            </div>

            {/* Dashboard Widgets */}
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                    Dashboard Widgets <span className="text-gray-500">({widgets.length})</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                    {widgets.length > 0 ? (
                        widgets.map((widget) => (
                            <span
                                key={widget}
                                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                            >
                {widget}
              </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No widgets selected</span>
                    )}
                </div>
            </div>

            <BottomNav next={'Create Project'}/>
        </div>
    );
}