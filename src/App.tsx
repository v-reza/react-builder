import React, { useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./pages/HomePages";
import Login from "./pages/LoginPages";
import { ToastContainer } from "react-toastify";
import Register from "./pages/RegisterPages";
import Create from "./pages/HomePages/Create";
import Navbar from "./pages/Navbar";
import Dashboard from "./pages/DashboardPages";

export type NavRouteProps = {
  path: string;
  element: React.FC<{}>;
  requiredAuth?: boolean;
};

const NavRoute = (props: NavRouteProps) => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        path={props.path}
        element={
          props.requiredAuth ? (
            isAuthenticated ? (
              <props.element />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <props.element />
          )
        }
      />
    </Routes>
  );
};

export const RenderIsAuthComponent = (
  ComponentIsAuth: React.FC<{}>
): React.ReactNode => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <ComponentIsAuth />
  ) : (
    <Navigate to={"/auth/login"} />
  );
};
function App() {
  const { isAuthenticated } = useAuth();
  const projectId = localStorage.getItem("projectId");

  // const zip = new JSZip()

  // const onDownload = () => {
  //   const folderOne = zip.folder("folderOne");
  //   const folderTwo = zip.folder("folderTwo");
  //   folderOne?.file("fileOne.js", `function helloWorld () {
  //     console.log("Hello World Folder One");
  //   }`);
  //   folderOne?.folder("folderOneOne")?.file("fileOneOne.txt", "Hello World Folder One One");
  //   folderTwo?.file("fileTwo.txt", "Hello World Folder Two");
  //   zip.generateAsync({type:"blob"})
  //   .then(function(content) {
  //       // see FileSaver.js
  //       saveAs(content, "example.zip");
  //   });
  // }

  return (
    <HashRouter>
      <ToastContainer />
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/dashboard/*" element={RenderIsAuthComponent(Dashboard)} />

        <Route path="/">
          <Route
            index
            element={
              projectId ? (
                <Navigate to="/dashboard/home" />
              ) : (
                RenderIsAuthComponent(Home)
              )
            }
          />
          <Route
            path="create"
            element={
              projectId ? (
                <Navigate to="/dashboard/home" />
              ) : (
                RenderIsAuthComponent(Create)
              )
            }
          />
        </Route>

        <Route path="/auth">
          <Route
            path="login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
