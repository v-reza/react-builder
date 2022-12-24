import React from "react";
import Base, { TextInputProps } from "../form/TextInput";
import useField from "../../hooks/useField";

type Props = {
  source: string;
} & TextInputProps;
const TextFormik = (props: Props) => {
  const { value, onChange, label, error } = useField(props);
  return (
    <Base
      {...props}
      value={value}
      label={label}
      error={error}
      onChange={onChange}
    />
  );
};

export default TextFormik;
