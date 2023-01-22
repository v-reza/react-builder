import React from "react";
import { Box, Grid, Text } from "../../components";
import { Button } from "../../components/form";
import { SaveIcon } from "@heroicons/react/outline";
import { TextInput, useFormContext } from "../../components/contextform";
import { toast } from "react-toastify";
import axios from "axios";
import { saveAs } from "file-saver";
import fs from "fs";
import { useFetchProvider } from "../../hooks";

const Configuration = () => {
  return <div>Configuration</div>;
};

const DetailProject = () => {
  return (
    <>
      <Grid grid={2} gap={10}>
        <TextInput source="name" label="Name" required={true} />
        <TextInput source="description" label="Description" />
      </Grid>
    </>
  );
};

type ProjectProps = {
  isConfiguration?: boolean;
};

const Project = (props: ProjectProps) => {
  const { form, onSave } = useFormContext();
  const fetchProvider = useFetchProvider()
  const save = async () => {
    const data = await onSave({
      data: form,
      overlay: true
    })
    if (data.msg) {
      toast.success(data.msg, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      fetchProvider.invalidateQuery("project")
      fetchProvider.invalidateQuery("list_project")
    }
  }

  return (
    <Box
      title="Project detail"
      toolbar={
        <Button
          type="button"
          btn="primary"
          label="Save"
          addClass="pl-10"
          icon={{
            position: "left",
            element: <SaveIcon className="w-5 h-5" />,
          }}
          onClick={save}
        />
      }
    >
      {props.isConfiguration ? <Configuration /> : <DetailProject />}
    </Box>
  );
};

export default Project;
