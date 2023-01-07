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
    <div className={grids.classes} style={props.style}>
      {props.children}
    </div>
  );
};

export default Grid;
