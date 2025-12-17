import Stepper from "./stepper.tsx";
import SetupOptions from "./SetupOptions.tsx";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SelectUseCase from "./ProjectBasics.tsx";
import DataSources from "./DataSources.tsx";
import Configuration from "./Configuration.tsx";
import ReviewProject from "./Review.tsx";
import { FiMessageSquare } from "react-icons/fi";
import BottomNav from "./BottomNav.tsx";
import ProjectCard from "./ProjectCard.tsx";
import { useSContextStore } from "../Context/index.ts";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import EditPage from "./EditProject.tsx";
import axios from "axios";

export default function CreateProject() {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    getValues,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = methods;



  const activeIndex = useSContextStore((state) => state.activeIndex);
  const addProject = useSContextStore((state) => state.addProject);
  const setActiveIndex = useSContextStore((state) => state.setActiveIndex);
  const formData = useSContextStore((state) => state.formData);
  const setFormData = useSContextStore((state) => state.setFormData);
  const submitAttempted = useSContextStore((state) => state.submitAttempted);
  const setSubmitAttempted = useSContextStore(
    (state) => state.setSubmitAttempted,
  );
  const clearFormData = useSContextStore((state) => state.clearFormData);
  const navigate = useNavigate();
  const location = useLocation();

  const BACKEND_URL = "http://localhost:3000";

  // Use ref to track if we've cleared the form to prevent infinite loops
  const hasCleared = useRef(false);

  // Load persisted form data on mount
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      reset(formData);
      setTimeout(() => {
        trigger();
      }, 100);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  // handle route changes to sync activeIndex and manage form state 
  useEffect(() => {
    const pathToIndex: { [key: string]: number } = {
      "/": 1,
      "/setupOptions": 1,
      "/basics": 2,
      "/dataSources": 3,
      "/configuration": 4,
      "/review": 5,
      "/ProjectCard": 6,
    };

    const currentIndex = pathToIndex[location.pathname] || 1;
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }

    // Auto-clear form when navigating to root route
    if (location.pathname === "/") {
      const currentFormData = formData;
      if (
        currentFormData &&
        Object.keys(currentFormData).length > 0 &&
        !hasCleared.current
      ) {
        hasCleared.current = true;
        clearFormData();
        reset({
          projectName: "",
          description: "",
          keywords: [],
          keywordInput: "",
          priority: "Low",
          dataSources: [],
          socialMediaPlatforms: [],
          widgets: [],
          setupMethod: "quick",
        });
        // Reset the flag after clearing to allow future clears
        setTimeout(() => {
          hasCleared.current = false;
        }, 100);
      }
    } else {
      // Reset the flag when navigating away from root
      hasCleared.current = false;

      // Trigger validation when navigating to any page (including back navigation)
      const currentFormData = formData;
      if (currentFormData && Object.keys(currentFormData).length > 0) {
        setTimeout(() => {
          trigger();
        }, 100);
      }
    }
  }, [
    location.pathname,
    activeIndex,
    setActiveIndex,
    clearFormData,
    reset,
    trigger,
  ]);



  const navigator = (index: number) => {
    switch (index) {
      case 2:
        navigate("/basics");
        break;
      case 3:
        navigate("/dataSources");
        break;
      case 4:
        navigate("/configuration");
        break;
      case 5:
        navigate("/review");
        break;

      default:
        navigate("/setupOptions");
    }
  };

  const isStepValid = () => {
    const currentErrors = errors;
    const currentValues = getValues();

    if (activeIndex === 2) {
      // Project Basics
      return (
        !currentErrors.projectName &&
        !currentErrors.description &&
        !currentErrors.priority &&
        !!currentValues.projectName &&
        !!currentValues.description
      );
    } else if (activeIndex === 3) {
      // Data Sources
      return (
        !currentErrors.dataSources &&
        currentValues.dataSources &&
        currentValues.dataSources.length > 0
      );
    } else if (activeIndex === 4) {
      // Configuration
      return (
        !currentErrors.widgets &&
        currentValues.widgets &&
        currentValues.widgets.length > 0
      );
    }
    return true;
  };

  const handleNext: any = async () => {

    // Set submit attempted to true when Next is clicked
    setSubmitAttempted(true);

    // Force validation check for current step
    let isValidStep = isStepValid();

    // Also trigger react-hook-form validation to show errors if any
    await trigger();

    // Re-check validity after trigger (though isStepValid checks current state)
    isValidStep = isStepValid();

    // Only navigate if form is valid
    if (isValidStep) {
      setActiveIndex(activeIndex + 1);
      navigator(activeIndex + 1);
      // Reset submit attempted for next page
      setSubmitAttempted(false);

    } else {

    }
  };

  const handleBack = () => {
    setActiveIndex(activeIndex - 1);
    navigator(activeIndex - 1);
    // Reset submit attempted when going back
    setSubmitAttempted(false);
  };
  const values = getValues();

  // Get error message based on current page
  const getErrorMessage = () => {
    if (activeIndex === 2) {
      // Project Basics page
      if (errors.projectName) return errors.projectName.message as string;
      if (errors.description) return errors.description.message as string;
      if (errors.keywords) return errors.keywords.message as string;
      return "Please fill in all required fields";
    } else if (activeIndex === 3) {
      // Data Sources page
      if (errors.dataSources) return errors.dataSources.message as string;
      return "Please select at least one data source";
    } else if (activeIndex === 4) {
      // Configuration page
      if (errors.widgets) return errors.widgets.message as string;
      return "Please select at least one dashboard widget";
    }
    return "Please complete the form";
  };

  const createProject = async (projectData: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/projects`,
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.error || "Failed to create project");
      } else if (error.request) {
        throw new Error("Cannot reach server. Check your connection or backend.");
      } else {
        throw new Error("Something went wrong while creating the project.");
      }
    }
  };




  const onSubmit = async (data: any) => {


    // Map form data to backend Project structure
    const projectPayload: any = {


      name: data.projectName,
      description: data.description,
      keywords: Array.isArray(data.keywords)
        ? data.keywords.map((k: any) => k.value || k) // Handle {value: string} or string
        : [],
      priority: data.priority?.toLowerCase() || "low",
      usecases: data.useCase || [],
      role: data.role || "",
      datasources: data.dataSources || [],
      socials: data.socialMediaPlatforms || [],
      dashboardMetrics: data.widgets || [],
    };



    addProject(projectPayload);
    try {
      await createProject(projectPayload);
    } catch (e) {
      console.error("Error creating project:", e);
    }
  };


  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 bg-white min-h-screen ml-0 md:ml-72"
      >
        <div
          className={
            "px-4 md:px-10 py-4 border-b border-gray-300 bg-white fixed top-0 left-0 md:left-72 right-0 z-50"
          }
        >
          {activeIndex !== 6 ? (
            <button
              type={"button"}
              onClick={() => navigate("/ProjectCard")}
              className="flex-row text-sm text-gray-500 hover:text-blue-600"
            >
              <div className={"flex gap-2"}>
                <IoArrowBackOutline size={20} />

                <h1> Back to Projects </h1>
              </div>
            </button>
          ) : (
            <div className="flex justify-between w-full pr-4 items-center">
              <div className={"flex gap-2"}>
                <h1 className={" font-bold text-2xl md:text-2xl text-gray-800"}>
                  {" "}
                  Projects{" "}
                </h1>
              </div>

              <div className={" gap-2"}>
                <button
                  type={"button"}
                  onClick={() => navigate("/")}
                  className={"flex bg-blue-500 p-2  rounded-sm gap-2"}
                >
                  <IoIosAdd size={23} color={"white"} />
                  <h1 className={" font-semibold text-white"}>New Project </h1>
                </button>
              </div>
            </div>
          )}
        </div>

        {activeIndex !== 6 && (
          <div className="px-4 md:px-10 py-4 mt-12 md:mt-15 fixed bg-white z-40 left-0 md:left-72 right-0 xl:mx-64">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mt-4">
              Create New Project
            </h1>
            <p className="text-gray-500 mt-1">
              Set up a new monitoring project in just a few steps
            </p>

            <Stepper activeStep={activeIndex} />
          </div>
        )}

        <div className="fixed bottom-10 right-10 border border-gray-200 shadow-2xl hover:shadow-4xl p-3 rounded-full bg-white">
          <FiMessageSquare size={30} color="black" />
        </div>

        <div
          className={`flex-1 px-4 md:px-10 py-8 mt-40 md:mt-40 lg:mt-80 z-20 ${activeIndex !== 6 ? "xl:mx-64" : ""}`}
        >
          <Routes>

            <Route path="/" element={<SetupOptions />} />
            <Route path="/setupOptions" element={<SetupOptions />} />
            <Route path={"/basics"} element={<SelectUseCase />} />
            <Route path={"/dataSources"} element={<DataSources />} />
            <Route path={"/configuration"} element={<Configuration />} />
            <Route
              path={"/review"}
              element={<ReviewProject project={values} />}
            />
            <Route path="/ProjectCard" element={<ProjectCard />} />
            <Route path="/editPage/:projectName" element={<EditPage />} />




          </Routes>

          {activeIndex !== 6 && activeIndex !== 1 && (
            <div className="flex">
              <BottomNav
                next={activeIndex == 5 ? "Create Project" : ""}
                handleNext={
                  activeIndex == 5
                    ? handleSubmit(onSubmit)
                    : activeIndex == 6
                      ? navigate("/ProjectCard")
                      : handleNext
                }
                handleBack={handleBack}
                valid={isStepValid()}
                errorMessage={getErrorMessage()}
                submitAttempted={submitAttempted}
              />
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
