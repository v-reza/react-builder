import React from "react";
import { PublicButtonProps } from "./typeButton";
import clsx from "clsx";

export type ButtonProps = PublicButtonProps & {
  icon?: {
    position: "left" | "right";
    element: React.ReactNode;
  };
  positionIcon?: "left" | "right";
  className?: string;
  classIcon?: string;
  children?: React.ReactNode;
  labelClassName?: string;
  width?: "max" | "full";
  addClass?: string;
  btn?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "info"
    | "light"
    | "dark"
    | "link"
    | "outline-primary"
    | "outline-secondary"
    | "outline-danger"
    | "outline-warning"
    | "outline-success"
    | "outline-info"
    | "outline-light"
    | "outline-dark"
    | "outline-link"
    | "disabled";
};

export const Button = (props: ButtonProps) => {
  const {
    type,
    icon,
    positionIcon,
    className,
    label,
    width = "full",
    btn = "primary",
    disabled,
  } = props;
  const onClick = () => {
    props.onClick && props.onClick();
  };

  const widthClass = width === "full" ? "w-full" : "w-max";
  const buttonClass = {
    primary: `${widthClass} border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none`,
    secondary: `${widthClass} border-gray-300 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none`,
    danger: `${widthClass} border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none`,
    warning: `${widthClass} border-transparent bg-yellow-300 text-white hover:bg-yellow-400 focus:outline-none`,
    success: `${widthClass} border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none`,
    info: `${widthClass} border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none`,
    light: `${widthClass} border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none`,
    dark: `${widthClass} border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none`,
    link: `${widthClass} border-transparent bg-transparent text-indigo-600 hover:bg-indigo-50 focus:outline-none`,
    "outline-primary": `${widthClass} border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 focus:outline-none`,
    "outline-secondary": `${widthClass} border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none`,
    "outline-danger": `${widthClass} border-red-600 text-red-600 bg-transparent hover:bg-red-50 focus:outline-none`,
    "outline-warning": `${widthClass} border-yellow-300 text-yellow-300 bg-transparent hover:bg-yellow-50 focus:outline-none`,
    "outline-success": `${widthClass} border-green-600 text-green-600 bg-transparent hover:bg-green-50 focus:outline-none`,
    "outline-info": `${widthClass} border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:outline-none`,
    "outline-light": `${widthClass} border-gray-100 text-gray-900 bg-transparent hover:bg-gray-50 focus:outline-none`,
    "outline-dark": `${widthClass} border-gray-800 text-gray-800 bg-transparent hover:bg-gray-50 focus:outline-none`,
    "outline-link": `${widthClass} border-transparent text-indigo-600 bg-transparent hover:bg-indigo-50 focus:outline-none`,
    disabled: `${widthClass} border-transparent bg-gray-300 text-gray-400 cursor-not-allowed`,
  };
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          className ??
            `group relative flex ${widthClass} justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium ${buttonClass[btn]}`,
          props.addClass
        )}
      >
        {props.children && props.children}
        {icon && icon.position === "left" && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pr-3">
            {icon.element}
          </span>
        )}
        <span className={clsx(props.labelClassName)}>{label}</span>
        {icon && icon.position === "right" && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon.element}
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
