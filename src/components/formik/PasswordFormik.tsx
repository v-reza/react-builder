import React from "react";
import useField from "../../hooks/useField";
import Base, { PasswordInputProps } from "../form/PasswordInput";

type Props = {
  source: string;
} & PasswordInputProps;

const PasswordFormik = (props: Props) => {
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

export default PasswordFormik;
