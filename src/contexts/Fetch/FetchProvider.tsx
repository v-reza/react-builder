import React, { useReducer, useState } from "react";
import { Children } from "../../utils/type";
import { FetchReducer } from "./FetchReducer";
import _ from "lodash"
import useFetch from "../../hooks/useFetch";
import useFetchProvider from "../../hooks/useFetchProvider";
export type FetchKey = {
  resource: string;
  data: any
};
export type FetchProviderType = {
  key: FetchKey[];
};
const initialState = [
  {
    resource: "",
    data: {}
  },
];

export type FetchAction = {
  type: string;
  payload?: FetchKey;
};

export type FetchProviderValue = {
  state: FetchKey[];
  dispatch: React.Dispatch<any>;
  invalidateFetch: (source: string) => void;
};

export const FetchContext = React.createContext<FetchProviderValue>({
  state: initialState,
  dispatch: (action) => action,
  invalidateFetch: (source) => {},
});

export const FetchProvider = (props: Children) => {
  const [state, dispatch] = useReducer(FetchReducer, initialState);


  const invalidateFetch = (source: string) => {
    
  };

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
