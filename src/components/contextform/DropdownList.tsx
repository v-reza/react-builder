import React, { useEffect, useMemo, useState } from "react";
import {
  DropdownListProps as TypeDropdown,
  DropdownList as Base,
} from "../form";
import useFieldContext from "./useFieldContext";
import Text from "../Text";
import _ from "lodash";
import { useFormContext } from "./FormContext";
import { useAuth, useQuery } from "../../hooks";
import jwtDecode from "jwt-decode";
import { ModelUser } from "../../utils/model";

export type ListSource = {
  source: string;
};

export type DropdownListProps = TypeDropdown & {
  resource: string | "token";
  source: string;
  valueSource: string;
  ids: string;
  queryKey?: string
};

export const DropdownList = (props: DropdownListProps) => {
  const { form, setForm } = useFormContext();
  const [value, setValue] = useState<any>(null);
  const { accessToken } = useAuth();
  const { data, fetch } = useQuery({
    queryKey: props.queryKey ?? props.resource,
    resource: props.resource,
    enabled: props.resource !== "token",
    fetchOnWindowFocus: true,
  });

  useEffect(() => {
    fetch()
  }, [])

  const labelValue = _.get(form, `${props.source}.${props.valueSource}`);

  useEffect(() => {
    if (props.resource === "token") {
      const decoded: any = jwtDecode(accessToken ?? "");
      setValue(decoded[props.source]);
    }
  }, [props.resource]);

  useEffect(() => {
    data && setValue(data.data);
  }, [data]);

  useEffect(() => {
    setForm((oldForm: any) => {
      const newSource = _.setWith(
        oldForm,
        props.source,
        _.find(data?.data, {
          id: props.ids,
        }),
        Object
      );
      return {
        ...oldForm,
        ...newSource,
      };
    });
  }, [props.ids, data]);

  const onClick = (row: any) => {
    props.onClick && props.onClick(row);
  };

  return (
    <Base label={labelValue} {...props}>
      {value?.map((item: any) => {
        return (
          <Text
            label={item[props.valueSource]}
            key={item.id}
            onClick={() => onClick(item)}
          />
        );
      })}
    </Base>
  );
};

export default DropdownList;
