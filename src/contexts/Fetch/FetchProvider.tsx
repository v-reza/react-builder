import React, { useCallback, useReducer, useState } from "react";
import { Children } from "../../utils/type";
import { FetchReducer } from "./FetchReducer";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { baseUrl } from "../../utils/axiosInstance";
export type FetchKey = {
  resource: string;
  data: any;
};
export type FetchProviderType = {
  key: FetchKey[];
};
const initialState = [
  {
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
   * function untuk refetch ulang sesuai resource
   * @param resource url api yang akan di fetch ulang, pastikan sebelumnya sudah pernah mekakai resource tersebut
   * @returns void
   */
  invalidateFetch: (resource: string) => void;
};

export const FetchContext = React.createContext<FetchProviderValue>({
  state: initialState,
  dispatch: (action) => action,
  invalidateFetch: (resource) => {},
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

  const invalidateFetch = async (resource: string) => {
    await axiosInstance.get(`${resource}`).then((res: any) => {
      dispatch({
        type: "UPDATE",
        payload: {
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
    invalidateFetch,
  };
  return (
    <FetchContext.Provider value={value}>
      {props.children}
    </FetchContext.Provider>
  );
};
