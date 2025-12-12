import { CaseStudies } from "./CaseStudies.tsx";
import ProjectDetailsForm from "./ProjectDetails.tsx";
import YourRole from "./YourRole.tsx";

const UseCaseSelection: React.FC = () => {
  return (
    <>
      <CaseStudies />
      <YourRole />
      <ProjectDetailsForm />
    </>
  );
};

export default UseCaseSelection;
