import React from "react";
import { ExclamationCircleIcon, LockClosedIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { PublicInputProps } from "./typeInput";

export type PasswordInputProps = PublicInputProps & {
  withIcon?: boolean;
};

export const PasswordInput = (props: PasswordInputProps) => {
  const { label, value, readOnly, placeholder, error, withIcon = false } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.onChange && props.onChange(event.target.value);
  };
  const classes = {
    "focus:ring-red-500 focus:border-red-500 border-red-300 text-red-900 placeholder-red-300":
      error,
    "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300": !error,
    "text-gray-900 placeholder-gray-500": !error,
  };
  return (
    <div>
      {label && (
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        {withIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        )}
        <input
          type="password"
          className={clsx(
            props.className ??
              `block w-full ${
                withIcon && "pl-10"
              } appearance-none rounded-md border px-3 py-2 focus:z-10 sm:text-sm`,
            classes
          )}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          required={props.required}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
};

PasswordInput.defaultProps = {
  label: "Password",
  readOnly: false,
  placeholder: "Enter your password",
  error: false,
  withIcon: false,
};

export default PasswordInput;
