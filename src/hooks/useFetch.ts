import { baseUrl, publicRequest } from "./../utils/axiosInstance";
import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";
import useOverlay from "./useOverlay";

export type useFetchProps = {
  resource: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  overlay?: boolean;
};

export type fetchData = {
  data?: any
}

const useFetch = (props: useFetchProps) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const readOnly = props.method === "GET" ? true : false;
  const { show, hide } = useOverlay();

  const axiosInstance: any = axios.create({
    baseURL: baseUrl.development,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const onSuccess = useCallback(
    (data: any) => {
      props.onSuccess && props.onSuccess(data);
    },
    [props]
  );

  const onError = useCallback(
    (err: any) => {
      props.onError && props.onError(err);
    },
    [props]
  );

  const fetch = useCallback(
    async  (fetch: fetchData) => {
      setLoading(true);
      props.overlay && show();
      await axiosInstance[props.method.toLowerCase()](
        `${props.resource}`,
        !readOnly ? fetch.data : null
      )
        .then((res: any) => {
          setData(res.data);
          setLoading(false);
          setIsSuccess(true);
          onSuccess(res.data);
          props.overlay && hide();
        })
        .catch((err: any) => {
          setError(err);
          setIsSuccess(false);
          setLoading(false);
          onError(err);
          props.overlay && hide();
        });
    },
    [axiosInstance, props.method, props.resource, props.onSuccess]
  );

  useEffect(() => {
    if (
      props.resource &&
      props.method !== "POST" &&
      props.method !== "PUT" &&
      props.method !== "DELETE"
    ) {
      fetch({});
    }
    return () => {};
  }, [props.resource]);

  return { loading, data, error, isSuccess, fetch };
};

useFetch.defaultProps = {
  methods: "GET",
};

export default useFetch;
