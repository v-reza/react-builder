import { baseUrl } from "./../utils/axiosInstance";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import useAuth from "./useAuth";
import useOverlay from "./useOverlay";
import { FetchContext } from "../contexts/Fetch/FetchProvider";
import _ from "lodash";

export type useFetchProps = {
  resource: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "REFETCH";
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  overlay?: boolean;
  fetchOnWindowFocus?: boolean;
};

export type fetchData = {
  data?: any;
};

const useFetch = (props: useFetchProps) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const readOnly = props.method === "GET" ? true : false;
  const { show, hide } = useOverlay();
  const fetchProvider = useContext(FetchContext);
  const axiosInstance: any = axios.create({
    baseURL: baseUrl.development,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { fetchOnWindowFocus = false } = props;

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

  const refetchProvider = async (resource: string) => {
    if (props.method === "REFETCH") {
      setLoading(true);
      await axiosInstance
        .get(`${resource}`)
        .then((res: any) => {
          fetchProvider.dispatch({
            type: "UPDATE",
            payload: {
              resource: resource,
              data: res.data,
            },
          });
          setLoading(false);
          setIsSuccess(true);
          onSuccess(res.data);
          props.overlay && hide();
          return;
        })
        .catch((err: any) => {
          setError(err);
          setIsSuccess(false);
          setLoading(false);
          onError(err);
          props.overlay && hide();
        });
    }
  };

  const fetch = useCallback(
    async (fetch: fetchData) => {
      setLoading(true);
      props.overlay && show();
      await axiosInstance[props.method.toLowerCase()](
        `${props.resource}`,
        !readOnly ? fetch.data : null
      )
        .then((res: any) => {
          fetchProvider.dispatch({
            type: "ADD",
            payload: {
              resource: props.resource,
              data: res.data,
            },
          });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.resource]
  );

  const onWindowFocus = () => {
    const exists = _.find(fetchProvider.state, { resource: props.resource });
    if (fetchOnWindowFocus) {
      fetch({});
      console.log("fetch window focus");
    } else {
      if (exists) {
        setData(exists?.data);
        setLoading(false);
      } else {
        fetch({});
      }
    }
  };

  useEffect(() => {
    if (
      props.method !== "POST" &&
      props.method !== "PUT" &&
      props.method !== "DELETE" &&
      props.method !== "REFETCH"
    ) {
      if (props.fetchOnWindowFocus) {
        window.addEventListener("focus", onWindowFocus);
      } else {
        onWindowFocus();
      }
      return () => {
        window.removeEventListener("focus", onWindowFocus);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(_.find(fetchProvider.state, { resource: props.resource })?.data);
  }, [loading, fetchProvider.state, props.resource, props.method]);

  return { loading, data, error, isSuccess, fetch, refetchProvider };
};

useFetch.defaultProps = {
  method: "GET",
  refetchProvider: false,
  fetchOnWindowFocus: false,
};

export default useFetch;
