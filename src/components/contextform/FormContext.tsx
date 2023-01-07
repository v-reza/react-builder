import React, { useCallback } from "react";
import * as Yup from "yup";
import useFetchProvider from "../../hooks/useFetchProvider";
import useFetch from "../../hooks/useFetch";
import { ResetForm } from "../formik";

type Props = {
  children: React.ReactNode;
  defaultValues?: any;
  resource: string;
  source: string;
  ids?: string;
};

export type FormContextProps = {
  form: any;
  setForm: any;
  clearForm: any;
  onSave: any;
  refetch: () => void;
};

export const FormCtx = React.createContext<FormContextProps>({
  form: {},
  setForm: () => {},
  clearForm: () => {},
  onSave: () => {},
  refetch: () => {},
});

export const useFormContext = () => {
  if (!React.useContext(FormCtx)) {
    throw new Error("useFormContext must be used within a FormContext");
  }
  return React.useContext(FormCtx);
};

export const FormContext = (props: Props) => {
  const [form, setForm] = React.useState<any>(props.defaultValues ?? {});
  const fetchProvider = useFetchProvider();

  const resourceForm = React.useMemo(() => {
    const resource = props.ids
      ? `${props.resource}/${
          props.source ? `${props.source}/${props.ids}` : `${props.ids}`
        }`
      : `${props.resource}/${props.source}`;
    return resource;
  }, [props.ids]);

  const clear = useCallback(() => {
    setForm(props.defaultValues);
  }, [props.defaultValues]);

  const { fetch } = useFetch({
    method: props.ids ? "PUT" : "POST",
    resource: resourceForm,
  });

  const save = useCallback(async () => {
    await fetch({
      data: form,
    });
  }, []);

  const refetch = useCallback(() => {
    fetchProvider.invalidateFetch(resourceForm);
  }, []);

  const value: FormContextProps = {
    form,
    setForm,
    clearForm: clear,
    onSave: save,
    refetch,
  };

  return <FormCtx.Provider value={value}>{props.children}</FormCtx.Provider>;
};

export default FormContext;
