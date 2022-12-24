import React, { useState } from "react";
import FormFormik, { ResetForm } from "../../components/formik/FormFormik";
import Form from "./Form";
import * as Yup from "yup";
import Layout from "./Layout";
import useAuth from "../../hooks/useAuth";
import { login, register } from "../../contexts/Auth/AuthAction";
import { toast } from "react-toastify";

const Register = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (
    values: any,
    { resetForm }: ResetForm
  ): Promise<void> => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    await register({
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
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
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

export default Register;
