import React, { useCallback, useReducer, useState } from "react";
import { Children } from "../../utils/type";
import { FetchReducer } from "./FetchReducer";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { baseUrl } from "../../utils/axiosInstance";
import _ from "lodash"
export type FetchKey = {
  queryKey: string;
  resource: string;
  data: any;
};
export type FetchProviderType = {
  key: FetchKey[];
};
const initialState = [
  {
    queryKey: "",
    resource: "",
    data: {},
  },
];

export type FetchAction = {
  type: string;
  payload?: FetchKey;
};

export type FetchProviderValue = {
  state: FetchKey[];
  dispatch: React.Dispatch<any>;

  /**
   * function untuk refetch ulang sesuai querkey
   * @param querykey provider key yang sudah terdaftar, pastikan sebelumnya sudah pernah mekakai querykey tersebut
   * @returns void
   */
  invalidateQuery: (queryKey: string) => void;
};

export const FetchContext = React.createContext<FetchProviderValue>({
  state: initialState,
  dispatch: (action) => action,
  invalidateQuery: (queryKey) => {},
});

export const FetchProvider = (props: Children) => {
  const [state, dispatch] = useReducer(FetchReducer, initialState);
  const { accessToken } = useAuth();
  const axiosInstance: any = axios.create({
    baseURL: baseUrl.development,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const invalidateQuery = async (queryKey: string) => {
    const findQueryKey : FetchKey = _.find(state, (o) => o.queryKey === queryKey);
    if (!findQueryKey) throw new Error("Query Key not found, failed invalidate query");
    const { resource } = findQueryKey
    await axiosInstance.get(`${resource.split(".").join("/")}`).then((res: any) => {
      dispatch({
        type: "UPDATE",
        payload: {
          queryKey,
          resource,
          data: res.data,
        }
      })
    })
  }

  console.log("provider state", state);

  const value = {
    state,
    dispatch,
    invalidateQuery,
  };
  return (
    <FetchContext.Provider value={value}>
      {props.children}
    </FetchContext.Provider>
  );
};
