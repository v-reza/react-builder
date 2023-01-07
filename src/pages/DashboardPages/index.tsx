import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Text from "../../components/Text";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import { DropdownList } from "../../components/form";
import { ResourceForm, useFormContext } from "../../components/contextform";

const Form = () => {
  const { form } = useFormContext()
  console.log("form", form)
  return (
    <div>
      <DropdownList label="test">
        <Text label="halo" />
        <Text label="halo2" />
      </DropdownList>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const projectId = localStorage.getItem("projectId");
  return (
    <>
      <ResourceForm resource="project" ids={projectId?.toString()} source={null}>
        {isAuthenticated && <Navbar />}
        <div className="md:pl-64 flex flex-col flex-1">
          <Routes>
            <Route index path="/home" element={<Form />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </ResourceForm>
    </>
  );
};

export default Dashboard;
