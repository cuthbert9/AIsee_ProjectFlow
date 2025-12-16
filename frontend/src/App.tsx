import Sidebar from "./components/SideBar.tsx";
import CreateProject from "./components/CreateProject.tsx";
import "./App.css";
import LoginPage from "./auth/login.tsx";
import { useState,useEffect} from "react";

function App() {
//@ts-ignore
const [isAuthenticated, setIsAuthenticated] = useState(false);



useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
}, []);


  return (
    <>
       {!isAuthenticated ? (
        <LoginPage  />
      ) : ( <div className={"flex w-full h-full bg-gray-100"}>
        <Sidebar />
        <CreateProject />
      </div>
      )
       }
 
    </>
  );
}

export default App;
