import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Form = () => {
  return <div>form</div>;
};

const Dashboard = () => {
  return (
    <div className="md:pl-64 flex flex-col flex-1">
      <Routes>
        <Route index path="/home" element={<Form />} />
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  );
};

export default Dashboard;
