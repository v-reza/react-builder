import React from "react";
import useField from "../../hooks/useField";
import Base, { EmailInputProps } from "../form/EmailInput"
type Props = {
  source: string;
} & EmailInputProps;
export const EmailFormik = (props: Props) => {
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

export default EmailFormik;
