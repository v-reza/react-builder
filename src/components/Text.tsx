import React from "react";
import clsx from "clsx";
export type TextProps = {
  label: string | boolean;
  className?: string;
  onClick?: () => void;
};

export const Text = (props: TextProps) => {
  const { className, label } = props;
  const onClickText = () => {
    props.onClick && props.onClick();
  };
  return (
    <div>
      {label && (
        <span
          className={clsx(className ?? "text-sm font-medium text-gray-700")}
          onClick={onClickText}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Text;
