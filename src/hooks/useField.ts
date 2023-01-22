import { useCallback } from "react";
import { useFormikContext } from "../components/formik/FormFormik";

export const useField = (props: any) => {
  const { formik, setFieldValue } = useFormikContext();
  const { source } = props;
  const onChange = useCallback(
    (value: any) => {
      setFieldValue(source, value);
    },
    [source, setFieldValue]
  );
  return {
    value: formik.values[props.source],
    onChange,
    label: props.label,
    error: formik.errors[props.source],
  };
};

export default useField;
