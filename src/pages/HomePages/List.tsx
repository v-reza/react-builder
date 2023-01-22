import React from "react";
import { NewProject } from "./Layout";
import Button from "../../components/form/Button";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Text from "../../components/Text";
import Spacer from "../../components/Spacer";
import { ViewListIcon } from "@heroicons/react/outline";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useMutation } from "../../hooks";

export type ListProjectProps = {
  id: string;
  name: string;
  description: string;
};
export const ListProject = (props: ListProjectProps) => {
  const nav = useNavigate();
  const { updateToken } = useAuth();
  const { mutation } = useMutation({
    delete: true,
    ids: props.id,
    resource: "project/delete",
    overlay: true,
    onSuccess: (data) => {
      const { msg, accessToken } = data;
      updateToken(accessToken);
      toast.success(msg, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    },
  });

  return (
    <>
      <Spacer
        spaceX={4}
        className="relative w-72 border-2 border-indigo-300 rounded-lg h-44"
      >
        <div>
          <div className="flex p-4 w-full h-full">
            <div className="flow-root">
              <div className="relative -m-2 p-2 flex items-center space-x-4 rounded-xl ">
                <div className="bg-indigo-500 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg">
                  <ViewListIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <Text
                    label={props.name}
                    className="capitalize text-sm font-medium text-gray-900"
                  />

                  <Text
                    label={props.description}
                    className="mt-1 text-sm text-gray-500 break-all"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 w-full px-2 flex items-center justify-between">
            <Button
              label="Start"
              type="button"
              btn="outline-primary"
              width="max"
              onClick={() => {
                nav("/dashboard/" + props.id);
              }}
            />
            <Button
              label="Delete"
              type="button"
              btn="outline-danger"
              width="max"
              onClick={() => mutation()}
            />
          </div>
        </div>
      </Spacer>
    </>
  );
};

const List = () => {
  const { currentUser } = useUser();
  return (
    <>
      <div>
        <NewProject />
      </div>
      {currentUser?.project.map((item: any, i: number) => (
        <div key={i}>
          <ListProject {...item} />
        </div>
      ))}
    </>
  );
};

export default List;
