import Stepper from "./stepper.tsx";
import SetupOptions from "./SetupOptions";
import { IoArrowBackOutline } from "react-icons/io5";
import { Routes, Route } from "react-router-dom";
import SelectUseCase from "./ProjectBasics.tsx";
import DataSources from "./DataSources.tsx";
import Configuration from "./Configuration.tsx";
import ReviewProject from "./Review.tsx";

export default function CreateProject() {
  const project = {
    name: "Apple watch",
    description: "Description",
    priority: "medium",
    setupMethod: "quick",
    keywords: ["Media"],
    dataSources: ["News", "Radio", "Forum", "Social"],
    widgets: [
      "MentionsVolume",
      "SentimentOverview",
      "TopEntities",
      "RadioTrends",
      "AlInsights",
      "AlertsSnapshot",
    ],
  };

  return (
    <main className="flex-1 bg-white min-h-screen ml-100   ">
      <div
        className={"px-10 py-8 w-full border-b border-gray-300 bg-white  fixed"}
      >
        <button className="flex-row text-sm text-gray-500 hover:text-blue-600">
          <div className={"flex gap-2"}>
            <IoArrowBackOutline size={20} />
            <h1> Back to Projects </h1>
          </div>
        </button>
      </div>

      <div className="px-10 py-4 w-full mx-66 mt-23 fixed bg-white ">
        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Create New Project
        </h1>
        <p className="text-gray-500 mt-1">
          Set up a new monitoring project in just a few steps
        </p>
        <Stepper activeStep={1} />
      </div>

      <div className={"flex-1 px-10 py-8 mx-66  mt-74 z-20"}>
        <Routes>
          <Route path="/" element={<SetupOptions />} />
          <Route path={"/Basics"} element={<SelectUseCase />} />
          <Route path={"/DataSources"} element={<DataSources />} />
          <Route path={"/Configuration"} element={<Configuration />} />
          <Route
            path={"/Review"}
            element={<ReviewProject project={project} />}
          />
        </Routes>
      </div>
    </main>
  );
}
