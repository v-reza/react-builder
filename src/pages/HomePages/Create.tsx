import React from "react";
import Box from "../../components/Box";
import Spacer from "../../components/Spacer";
import * as Yup from "yup";
import FormFormik, { ResetForm } from "../../components/formik/FormFormik";
import TextFormik from "../../components/formik/TextFormik";
import Button from "../../components/form/Button";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useOverlay from "../../hooks/useOverlay";

const Form = () => {
  return (
    <div className="mt-20 px-56">
      <Box title="Create new project">
        <Spacer className="flex" spaceX={4}>
          <TextFormik source="name" label={false} placeholder="Name" />
          <TextFormik
            source="description"
            label={false}
            placeholder="Description"
          />
        </Spacer>
        <div className="mt-2">
          <Button
            type="submit"
            label="Create Project"
            width="max"
            btn="outline-primary"
          />
        </div>
      </Box>
    </div>
  );
};

const Create = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });
  const initialValues = {
    name: "",
    description: "",
  };

  const nav = useNavigate();
  const { updateToken } = useAuth()
  const { fetch } = useFetch({
    method: "POST",
    resource: "project/create",
    overlay: true,
    onSuccess: (data) => {
      const { msg, accessToken } = data;
      updateToken(accessToken)
      toast.success(msg, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    },
  });

  const onSubmit = async (values: any, { resetForm }: ResetForm) => {
    const data = {
      name: values.name,
      description: values.description,
    };
    await fetch({ data });
    resetForm({
      values: {
        name: "",
        description: "",
      }
    })
    nav("/");
  };

  return (
    <FormFormik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form />
    </FormFormik>
  );
};

export default Create;
