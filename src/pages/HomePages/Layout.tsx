import React from "react";
import Text from "../../components/Text";
import { Children } from "../../utils/type";
import Grid from "../../components/Grid";
import useUser from "../../hooks/useUser";
import Button from "../../components/form/Button";
import { useNavigate } from "react-router-dom";

export const NewProject = () => {
  const nav = useNavigate();
  return (
    <div>
      <Button
        label="Create a new project"
        type="button"
        onClick={() => nav("create")}
        labelClassName="mt-2 block text-sm font-medium text-gray-900"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      </Button>
    </div>
  );
};

const Layout = (props: Children) => {
  const { currentUser } = useUser();
  return (
    <>
      <div className="w-full ">
        <div className="py-20 ">
          <div className="flex items-center justify-center">
            <Text label="My Project" className="font-bold text-2xl" />
          </div>
          <div className="w-full flex items-center justify-center py-10">
            <div className="h-max bg-white shadow-lg rounded-xl w-max p-6">
              <Text
                label={currentUser?.project.length + " saved project"}
                className="mb-4"
              />
              {currentUser?.project.length > 0 ? (
                <div className="mt-4">
                  <Grid grid={1} sm={2} gap={20}>
                    {props.children}
                  </Grid>
                </div>
              ) : (
                <div className="mt-4">
                  <NewProject />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
