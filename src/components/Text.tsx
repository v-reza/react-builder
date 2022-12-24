import React from "react";
import clsx from "clsx";
export type TextProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

const Text = (props: TextProps) => {
  const { className, label } = props;
  const onClickText = () => {
    props.onClick && props.onClick();
  };
  return (
    <div>
      <span
        className={clsx(className ?? "text-sm font-medium text-gray-700")}
        onClick={onClickText}
      >
        {label}
      </span>
    </div>
  );
};

export default Text;
