import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
export type ResetForm = {
  resetForm: (values: { [field: string]: any }) => void;
};
export type FormFormikProps = {
  initialValues: any;
  validationSchema?: any;
  children: React.ReactNode;
  onSubmit: (values: any, { resetForm }: ResetForm) => void;
  className?: string;
};

export type FormFormikContext = {
  formik: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onSubmit: (values: any, { resetForm }: ResetForm) => void;
};

export const FormFormikCtx = React.createContext<FormFormikContext>({
  formik: {},
  setFieldValue: () => {},
  onSubmit: () => {},
});

export const useFormikContext = () => React.useContext(FormFormikCtx);

export const FormFormik = (props: FormFormikProps) => {
  const { initialValues, validationSchema } = props;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema ?? Yup.object({}),
    onSubmit: props.onSubmit,
  });

  return (
    <FormFormikCtx.Provider
      value={{
        formik,
        setFieldValue: formik.setFieldValue,
        onSubmit: formik.handleSubmit,
      }}
    >
      <form onSubmit={formik.handleSubmit} className={props.className}>
        {props.children}
      </form>
    </FormFormikCtx.Provider>
  );
};

export default FormFormik;
