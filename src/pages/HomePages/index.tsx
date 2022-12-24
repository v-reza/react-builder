import React, { useCallback, useEffect } from "react";
import Layout from "./Layout";
import List from "./List";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Layout>
        <List />
      </Layout>
    </>
  );
};

export default Home;
