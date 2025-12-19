import CardP from "./CardP.tsx";
import { useProjects } from "../hooks/useProjects.ts";

const ProjectCard = () => {

  const { data: projectss = [], isLoading,isFetching } = useProjects();

  const sorted = [...projectss].reverse();



  if (isLoading || isFetching) {
    return (
      <div className="py-6 w-full mx-auto">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading projects, please wait...</p>
        </div>
      </div>
    );
  }

  if (!projectss || projectss.length === 0) {
    return (
      <div className="py-6 w-full mx-auto">
        <p className="text-center text-gray-500">No projects found. Create a new project to get started.</p>
      </div>
    );
  }

  return (
    <div className="py-6 w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projectss && sorted.map((project: any, index: number) => (
          <CardP key={index} data={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
