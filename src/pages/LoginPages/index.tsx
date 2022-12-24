import React, { useState } from "react";
import FormFormik, { ResetForm } from "../../components/formik/FormFormik";
import Form from "./Form";
import * as Yup from "yup";
import Layout from "./Layout";
import useAuth from "../../hooks/useAuth";
import { login } from "../../contexts/Auth/AuthAction";
import { toast } from "react-toastify";

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const { dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (
    values: any,
    { resetForm }: ResetForm
  ): Promise<void> => {
    const data = {
      email: values.email,
      password: values.password,
    };
    await login({
      dispatch,
      data,
      callback({ error, loading, message }) {
        setIsLoading(loading);
        if (error === false && message) {
          toast.success(message, {
            autoClose: 2000,
            hideProgressBar: true,
          });
          resetForm({
            values: {
              email: "",
              password: "",
            },
          });
        } else {
          toast.error(message, {
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      },
    });
  };

  return (
    <FormFormik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Layout>
        <Form loading={isLoading} />
      </Layout>
    </FormFormik>
  );
};

export default Login;
