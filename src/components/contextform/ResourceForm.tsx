import React, { useEffect } from "react";
import FormContext, { useFormContext } from "./FormContext";
import { FormFormik } from "../formik";
import { useQuery } from "../../hooks";

export type ResourceForm = {
  resource: string;
  source?: string | null;
  validationForm?: any;
  ids?: string;
  queryKey: string
  afterLoad?: (data: any) => any
};

type Props = ResourceForm & {
  defaultFormValues?: any;
  activeSource?: any;
  children: React.ReactNode;
};

export const ResourceFormContext = React.createContext<ResourceForm>({
  resource: "",
  validationForm: {},
  queryKey: ""
});

export const useResourceFormContext = () => {
  const context = React.useContext(ResourceFormContext);
  if (!context) {
    throw new Error("useResourceFormContext must be used within a ResourceFormContext");
  }
  return context
}

const Form = (props: Props) => {
  const { setForm, onSave } = useFormContext();
  const { data, fetch } = useQuery({
    queryKey: props.queryKey,
    resource: props.resource
  })
  useEffect(() => {
    data &&
      setForm((oldForm: any) => {
        return {
          ...oldForm,
          ...data.data,
        }
      });
  }, [data]);

  const memoizedResource = React.useMemo(() => {
    return props.resource;
  }, [props.resource]);

  useEffect(() => {
    fetch();
  }, [memoizedResource]);

  const value: ResourceForm = {
    resource: props.resource,
    validationForm: props.validationForm,
    source: props.source,
    queryKey: props.queryKey
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
      <Form {...props} resource={resourceForm} afterLoad={props.afterLoad}/>
    </FormContext>
  );
};

export default ResourceForm;
