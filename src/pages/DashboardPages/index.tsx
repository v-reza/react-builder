import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Text from "../../components/Text";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import { ResourceForm, useFormContext } from "../../components/contextform";
import DropdownList from "../../components/contextform/DropdownList";
import { Box, Spacer } from "../../components";
import { Button } from "../../components/form";
import { DownloadIcon, SaveIcon } from "@heroicons/react/outline";
import Project from "./Project";

const Form = () => {
  const { form } = useFormContext();
  const nav = useNavigate();
  const [isConfiguration, setIsConfiguration] = useState(false)
  const { projectId } = useParams();
  console.log("form ctx", form)
  return (
    <Spacer className="p-10" spaceY={10}>
      <div className="flex items-center justify-between bg-white shadow-lg rounded-md px-4">
        <Spacer className="flex items-center justify-center" spaceX={4}>
          <div>
            <Text label="Current project" />
          </div>
          <div>
            <DropdownList
              source="current_project"
              resource="project.listproject"
              queryKey="list_project"
              valueSource="name"
              ids={projectId ?? ""}
              onClick={(row: any) => {
                nav(`/dashboard/${row.id}`);
              }}
              bottomContent={
                <Text
                  label="Close project"
                  onClick={() => nav("/dashboard")}
                  className="text-gray-500"
                />
              }
            />
          </div>
        </Spacer>
        <div>
          <Button
            type="button"
            btn="primary"
            label="Download generate code"
            labelClassName="text-sm text-gray-200"
            addClass="pl-10"
            icon={{
              position: "left",
              element: <DownloadIcon className="w-5 h-5 text-gray-200" />,
            }}
          />
        </div>
      </div>
      <Spacer className="flex items-center" spaceX={4}>
        <Button
          type="button"
          btn={!isConfiguration ? "primary" : "outline-secondary"}
          label="Project"
          width="max"
          onClick={() => setIsConfiguration(false)}
        />
        <Button
          type="button"
          btn={isConfiguration ? "primary" : "outline-secondary"}
          label="Configuration"
          width="max"
          onClick={() => setIsConfiguration(true)}
        />
      </Spacer>
      <Project isConfiguration={isConfiguration}/>
    </Spacer>
  );
};

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const { projectId } = useParams();

  return (
    <>
      <ResourceForm resource="project" ids={projectId} queryKey="project">
        {isAuthenticated && <Navbar />}
        <div className="md:pl-64 flex flex-col flex-1">
          <Routes>
            <Route index path="/" element={<Form />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </ResourceForm>
    </>
  );
};

export default Dashboard;
