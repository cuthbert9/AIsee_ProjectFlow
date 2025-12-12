import { useSContextStore } from "../Context/index.ts";
import CardP from "./CardP.tsx";
import { fetchProjects } from "../Context/index.ts";
import { useEffect } from "react";

const ProjectCard = () => {
  const projectss = useSContextStore((state) => state.projects);
  const sorted = [...projectss].reverse();


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="py-6 w-full mx-auto">
      {projectss.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading projects, please wait...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sorted.map((project: any, index: number) => (
            <CardP key={index} data={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
