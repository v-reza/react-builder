import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import FormContext, { useFormContext } from "./FormContext";
import useFetchProvider from "../../hooks/useFetchProvider";
import { FormFormik } from "../formik";

export type ResourceForm = {
  resource: string;
  source?: string | null;
  validationForm?: any;
  ids?: string;
};

type Props = ResourceForm & {
  defaultFormValues?: any;
  activeSource?: any;
  children: React.ReactNode;
};

export const ResourceFormContext = React.createContext<ResourceForm>({
  resource: "",
  validationForm: {},
});

const Form = (props: Props) => {
  const { setForm, onSave, refetch } = useFormContext();
  const { data, fetch } = useFetch({
    method: "GET",
    resource: props.resource,
  });

  useEffect(() => {
    data &&
      setForm((oldForm: any) => {
        if (props.activeSource) {
          return {
            ...oldForm,
            ...data,
            ...data[props.activeSource]?.active,
          };
        } else {
          return {
            ...oldForm,
            ...data,
          };
        }
      });
  }, [data, props.activeSource]);

  const memoizedResource = React.useMemo(() => {
    return props.resource;
  }, [props.resource]);

  useEffect(() => {
    fetch({});
  }, [memoizedResource]);

  const value: ResourceForm = {
    resource: props.resource,
    validationForm: props.validationForm,
    source: props.source,
  };

  return (
    <ResourceFormContext.Provider value={value}>
      <FormFormik
        initialValues={props.defaultFormValues}
        onSubmit={onSave}
        validationSchema={props.validationForm}
      >
        {props.children}
      </FormFormik>
    </ResourceFormContext.Provider>
  );
};

export const ResourceForm = (props: Props) => {
  const resourceForm = React.useMemo(() => {
    const resource = props.ids
      ? `${props.resource}/${
          props.source ? `${props.source}/${props.ids}` : `${props.ids}`
        }`
      : `${props.resource}/${props.source}`;
    return resource;
  }, [props.ids]);
  return (
    <FormContext
      defaultValues={props.defaultFormValues}
      resource={props.resource}
      source={props.source ?? ""}
      ids={props.ids}
    >
      <Form {...props} resource={resourceForm} activeSource={props.resource} />
    </FormContext>
  );
};

export default ResourceForm;
