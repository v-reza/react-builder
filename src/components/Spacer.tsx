import React, { useState } from "react";
import { Children } from "../utils/type";
import clsx from "clsx";
export type SpacerProps = Children & {
  spaceY?: number;
  spaceX?: number;
  className?: string;
};

const Spacer = (props: SpacerProps) => {
  const { children, spaceY, spaceX } = props;

  return (
    <div
      className={clsx(
        {
          "space-y-2": spaceY === 2,
          "space-y-4": spaceY === 4,
          "space-y-6": spaceY === 6,
          "space-y-8": spaceY === 8,
          "space-y-10": spaceY === 10,
          "space-y-12": spaceY === 12,
          "space-y-16": spaceY === 16,
          "space-y-20": spaceY === 20,
          "space-y-24": spaceY === 24,
          "space-y-28": spaceY === 28,
          "space-y-32": spaceY === 32,
          "space-y-36": spaceY === 36,
          "space-y-40": spaceY === 40,
          "space-y-44": spaceY === 44,
          "space-y-48": spaceY === 48,
          "space-y-52": spaceY === 52,
          "space-y-56": spaceY === 56,
          "space-y-60": spaceY === 60,
          "space-y-64": spaceY === 64,
          "space-y-72": spaceY === 72,
          "space-y-80": spaceY === 80,
          "space-y-96": spaceY === 96,
          "space-y-px": spaceY === 0,
        },
        {
          "space-x-2": spaceX === 2,
          "space-x-4": spaceX === 4,
          "space-x-6": spaceX === 6,
          "space-x-8": spaceX === 8,
          "space-x-10": spaceX === 10,
          "space-x-12": spaceX === 12,
          "space-x-16": spaceX === 16,
          "space-x-20": spaceX === 20,
          "space-x-24": spaceX === 24,
          "space-x-28": spaceX === 28,
          "space-x-32": spaceX === 32,
          "space-x-36": spaceX === 36,
          "space-x-40": spaceX === 40,
          "space-x-44": spaceX === 44,
          "space-x-48": spaceX === 48,
          "space-x-52": spaceX === 52,
          "space-x-56": spaceX === 56,
          "space-x-60": spaceX === 60,
          "space-x-64": spaceX === 64,
          "space-x-72": spaceX === 72,
          "space-x-80": spaceX === 80,
          "space-x-96": spaceX === 96,
          "space-x-px": spaceX === 0,
        }, props.className
      )}
    >
      {children}
    </div>
  );
};

export default Spacer;
