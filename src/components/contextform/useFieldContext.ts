import { useCallback } from "react";
import { useEffect } from "react";
import React from "react";
import _, { isArray } from "lodash";
import { useFormContext } from "./FormContext";

const useFieldContext = (props: any) => {
  const { label, source } = props;
  const { form, setForm, resource } = useFormContext();
  useEffect(() => {
    if (props.value !== undefined && props.value !== null) {
      setForm((oldForm: any) => {
        const newValues = _.setWith(oldForm, source, props.value, Object);
        return {
          ...newValues,
        };
      });
    }
  }, [props.value]);

  const labelTranslate = label ?? source;

  const onChange = useCallback((value: any) => {
    setForm((oldForm: any) => {
      const newValues = _.setWith(oldForm, source, value, Object);
      return {
        ...newValues,
      };
    });
  }, []);


  const val = _.get(form, source) ?? "";
  const active = _.get(form, source.split(".")[0] + ".active") ?? undefined;

  return {
    value: val,
    onChange,
    label: labelTranslate,
    activeSource: active,
  };
};

export default useFieldContext;
