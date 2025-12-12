import Sidebar from "./components/SideBar.tsx";
import CreateProject from "./components/CreateProject.tsx";
import "./App.css";

function App() {
  return (
    <>
      <div className={"flex w-full h-full bg-gray-100"}>
        <Sidebar />
        <CreateProject />
      </div>
    </>
  );
}

export default App;
