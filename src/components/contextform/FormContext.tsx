import React, { useCallback } from "react";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "../../hooks";

type Props = {
  children: React.ReactNode;
  defaultValues?: any;
  resource: string;
  source: string;
  ids?: string;
};

type Saving = {
  data: any;
  overlay: boolean;
};

export type FormContextProps = {
  form: any;
  setForm: any;
  clearForm: any;
  onSave: ({ data, overlay }: Saving) => Promise<any>;
  resource: string;
};

export const FormCtx = React.createContext<FormContextProps>({
  form: {},
  setForm: () => {},
  clearForm: () => {},
  onSave: () => Promise.resolve({ msg: "" }),
  resource: "",
});

export const useFormContext = () => {
  if (!React.useContext(FormCtx)) {
    throw new Error("useFormContext must be used within a FormContext");
  }
  return React.useContext(FormCtx);
};

export const FormContext = (props: Props) => {
  const [form, setForm] = React.useState<any>(props.defaultValues ?? {});
  const resourceForm = React.useMemo(() => {
    const resource = `${props.resource}/${props.source}`;
    return resource;
  }, [props.ids]);

  const clear = useCallback(() => {
    setForm(props.defaultValues);
  }, [props.defaultValues]);

  const { updateToken } = useAuth();
  const { mutation } = useMutation({
    ids: props.ids,
    resource: resourceForm,
    onSuccess: (data) => {
      const { accessToken } = data;
      if (accessToken) {
        updateToken(accessToken);
      }
    }
  })
  
  const save = useCallback(async ({ data, overlay = false }: Saving) => {
    // return await fetch({ data, overlayFetch: overlay });
    return await mutation(data, overlay)
  }, [props.ids, resourceForm]);

  const value: FormContextProps = {
    form,
    setForm,
    clearForm: clear,
    onSave: save,
    resource: props.resource,
  };

  return <FormCtx.Provider value={value}>{props.children}</FormCtx.Provider>;
};

export default FormContext;
