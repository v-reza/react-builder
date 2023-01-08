import React from "react";
import {
  DropdownListProps as TypeDropdown,
  DropdownList as Base,
} from "../form";
import useFieldContext from "./useFieldContext";
import Text from "../Text";
import _ from "lodash";

export type DropdownListProps = TypeDropdown & {
  source: string;
  valueSource: string;
  primaryKey: string;
};

export const DropdownList = (props: DropdownListProps) => {
  const { value, activeSource } = useFieldContext(props);
  const labelValue = activeSource ? activeSource[props.valueSource] : "";

  const onClick = (row: any) => {
    props.onClick && props.onClick(row);
  }

  return (
    <Base label={labelValue} {...props}>
      {value?.map((item: any) => {
        return <Text label={item[props.valueSource]} key={item.id} onClick={() => onClick(item)}/>;
      })}
    </Base>
  );
};

export default DropdownList;
