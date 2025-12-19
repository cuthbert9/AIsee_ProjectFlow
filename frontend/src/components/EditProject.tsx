import { useSContextStore } from "../Context/index.ts";
import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs.tsx";
import BasicsForm from "./BasicsForm.tsx";
import DataSources from "./DataSources.tsx";
import Configuration from "./Configuration.tsx";
import { FaArrowRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import type { Project } from "../Context/index.ts";
import { FormProvider, useForm } from "react-hook-form";
import { useProjects, useUpdateProject } from "../hooks/useProjects";

const EditPage = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();


  const { data: projects = [] } = useProjects();
  const { mutateAsync: updateProject } = useUpdateProject();
  const setActiveIndex = useSContextStore((state) => state.setActiveIndex);

  const [activeTab, setActiveTab] = useState("basics");
  const [currentProject, setCurrentProject] = useState<any>(null);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { reset, getValues } = methods;


  useEffect(() => {
    if (projectName && projects.length > 0) {
      const decodedName = decodeURIComponent(projectName);

      const project = projects.find((p: Project) => p.name === decodedName || p.name === projectName);

      if (project) {
        setCurrentProject(project);

        const formValues: any = {
          projectName: project.name,
          description: project.description,
          keywords: project.keywords?.map((k: string) => ({ value: k })) || [],
          priority: project.priority ? (project.priority.charAt(0).toUpperCase() + project.priority.slice(1)) : "Low",
          useCase: project.usecases || [],
          role: project.role,
          dataSources: project.datasources || [],
          socialMediaPlatforms: project.socials || [],
          widgets: project.dashboardMetrics || []
        };
        reset(formValues);
      } else {

        navigate("/ProjectCard");
      }
    }
  }, [projectName, projects, reset, navigate]);


  useEffect(() => {
    setActiveIndex(6);
  }, [setActiveIndex]);

  const handleSave = async () => {
    const updatedData = getValues();

    if (currentProject) {

      const projectPayload: any = {
        name: updatedData.projectName,
        description: updatedData.description,
        // Handle keyword mapping
        keywords: Array.isArray(updatedData.keywords)
          ? updatedData.keywords.map((k: any) => k.value || k)
          : [],
        priority: updatedData.priority?.toLowerCase() || "low",
        usecases: updatedData.useCase || [],
        role: updatedData.role,
        datasources: updatedData.dataSources || [],
        socials: updatedData.socialMediaPlatforms || [],
        dashboardMetrics: updatedData.widgets || []
      };

      try {
        await updateProject({ id: currentProject.id, projectData: projectPayload });
        navigate("/ProjectCard");
      } catch (e) {
        console.error("Failed to update project", e);
        alert("Failed to update project");
      }
    }
  };

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading project...</p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className={"mb-40 xl:mx-64"}>
        <h1 className={"text-center text-2xl mb-8"}>
          Edit Your Project Configuration

        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={"w-full"}>
            <TabsTrigger value="basics">Project Basics</TabsTrigger>
            <TabsTrigger value="dataSources">Data Sources </TabsTrigger>
            <TabsTrigger value="configs">Configurations</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <BasicsForm />
          </TabsContent>

          <TabsContent value="dataSources" >
            <DataSources />
          </TabsContent>

          <TabsContent value="configs" >
            <Configuration />
          </TabsContent>

          {activeTab === "configs" && (
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 justify-center bg-blue-500 text-lg text-white rounded-lg mr-4 w-30 p-3 hover:bg-blue-600 transition"
              >
                <h1>Save</h1>
                <FaArrowRight size={23} color="white" />
              </button>
            </div>
          )}
        </Tabs>
      </div>
    </FormProvider>
  );
};

export default EditPage;
