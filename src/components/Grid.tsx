import React from "react";
import { Children } from "../utils/type";
import clsx from "clsx";
import useGrid from "../hooks/useGrid";
// import { GridType } from './classGrid'
export type GridType = {
  grid?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  gap?: number;
  gapX?: number;
  gapY?: number;
};
export type GridProps = Children & {
  style?: React.CSSProperties;
  className?: string;
} & GridType;

export const Grid = (props: GridProps) => {
  const grids = useGrid(props);
  return (
    <div
      className={clsx(
        "grid",
        {
          "grid-cols-1": props.grid === 1,
          "grid-cols-2": props.grid === 2,
          "grid-cols-3": props.grid === 3,
          "grid-cols-4": props.grid === 4,
          "grid-cols-5": props.grid === 5,
          "grid-cols-6": props.grid === 6,
          "grid-cols-7": props.grid === 7,
          "grid-cols-8": props.grid === 8,
          "grid-cols-9": props.grid === 9,
          "grid-cols-10": props.grid === 10,
          "grid-cols-11": props.grid === 11,
          "grid-cols-12": props.grid === 12,
          "grid-cols-none": props.grid === 0,
        },
        {
          "sm:grid-cols-1": props.sm === 1,
          "sm:grid-cols-2": props.sm === 2,
          "sm:grid-cols-3": props.sm === 3,
          "sm:grid-cols-4": props.sm === 4,
          "sm:grid-cols-5": props.sm === 5,
          "sm:grid-cols-6": props.sm === 6,
          "sm:grid-cols-7": props.sm === 7,
          "sm:grid-cols-8": props.sm === 8,
          "sm:grid-cols-9": props.sm === 9,
          "sm:grid-cols-10": props.sm === 10,
          "sm:grid-cols-11": props.sm === 11,
          "sm:grid-cols-12": props.sm === 12,
          "sm:grid-cols-none": props.sm === 0,
        },
        {
          "md:grid-cols-1": props.md === 1,
          "md:grid-cols-2": props.md === 2,
          "md:grid-cols-3": props.md === 3,
          "md:grid-cols-4": props.md === 4,
          "md:grid-cols-5": props.md === 5,
          "md:grid-cols-6": props.md === 6,
          "md:grid-cols-7": props.md === 7,
          "md:grid-cols-8": props.md === 8,
          "md:grid-cols-9": props.md === 9,
          "md:grid-cols-10": props.md === 10,
          "md:grid-cols-11": props.md === 11,
          "md:grid-cols-12": props.md === 12,
          "md:grid-cols-none": props.md === 0,
        },
        {
          "lg:grid-cols-1": props.lg === 1,
          "lg:grid-cols-2": props.lg === 2,
          "lg:grid-cols-3": props.lg === 3,
          "lg:grid-cols-4": props.lg === 4,
          "lg:grid-cols-5": props.lg === 5,
          "lg:grid-cols-6": props.lg === 6,
          "lg:grid-cols-7": props.lg === 7,
          "lg:grid-cols-8": props.lg === 8,
          "lg:grid-cols-9": props.lg === 9,
          "lg:grid-cols-10": props.lg === 10,
          "lg:grid-cols-11": props.lg === 11,
          "lg:grid-cols-12": props.lg === 12,
          "lg:grid-cols-none": props.lg === 0,
        },
        {
          "xl:grid-cols-1": props.xl === 1,
          "xl:grid-cols-2": props.xl === 2,
          "xl:grid-cols-3": props.xl === 3,
          "xl:grid-cols-4": props.xl === 4,
          "xl:grid-cols-5": props.xl === 5,
          "xl:grid-cols-6": props.xl === 6,
          "xl:grid-cols-7": props.xl === 7,
          "xl:grid-cols-8": props.xl === 8,
          "xl:grid-cols-9": props.xl === 9,
          "xl:grid-cols-10": props.xl === 10,
          "xl:grid-cols-11": props.xl === 11,
          "xl:grid-cols-12": props.xl === 12,
          "xl:grid-cols-none": props.xl === 0,
        },
        {
          "gap-0": props.gap === 0,
          "gap-1": props.gap === 1,
          "gap-2": props.gap === 2,
          "gap-3": props.gap === 3,
          "gap-4": props.gap === 4,
          "gap-5": props.gap === 5,
          "gap-6": props.gap === 6,
          "gap-7": props.gap === 7,
          "gap-8": props.gap === 8,
          "gap-9": props.gap === 9,
          "gap-10": props.gap === 10,
          "gap-11": props.gap === 11,
          "gap-12": props.gap === 12,
          "gap-14": props.gap === 14,
          "gap-16": props.gap === 16,
          "gap-20": props.gap === 20,
          "gap-24": props.gap === 24,
          "gap-28": props.gap === 28,
          "gap-32": props.gap === 32,
          "gap-36": props.gap === 36,
          "gap-40": props.gap === 40,
          "gap-44": props.gap === 44,
          "gap-48": props.gap === 48,
          "gap-52": props.gap === 52,
          "gap-56": props.gap === 56,
          "gap-60": props.gap === 60,
          "gap-64": props.gap === 64,
          "gap-72": props.gap === 72,
          "gap-80": props.gap === 80,
          "gap-96": props.gap === 96,
        },
        props.className
      )}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Grid;
