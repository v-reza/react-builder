import { baseUrl } from "./../utils/axiosInstance";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import useAuth from "./useAuth";
import useOverlay from "./useOverlay";
import { FetchContext } from "../contexts/Fetch/FetchProvider";
import _ from "lodash";

export type useQueryProps = {
  queryKey: string;
  resource: string;
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  overlay?: boolean;
  fetchOnWindowFocus?: boolean;
  cacheQuery?: boolean;
  enabled?: boolean;
};

export type fetchData = {
  overlayFetch?: boolean;
};

export const useQuery = (props: useQueryProps) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { show, hide } = useOverlay();
  const fetchProvider = useContext(FetchContext);
  const axiosInstance: any = axios.create({
    baseURL: baseUrl.development,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const {
    fetchOnWindowFocus = false,
    cacheQuery = true,
    enabled = true,
  } = props;

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
    async () => {
      let datas: any = null;
      setLoading(true);
      props.overlay && show();
      await axiosInstance
        .get(`${props.resource.split(".").join("/")}`)
        .then((res: any) => {
          if (cacheQuery) {
            fetchProvider.dispatch({
              type: "ADD",
              payload: {
                queryKey: props.queryKey,
                resource: props.resource,
                data: res.data,
              },
            });
          }
          setLoading(false);
          setIsSuccess(true);
          onSuccess(res.data);
          props.overlay && hide();
          return (datas = res.data);
        })
        .catch((err: any) => {
          setError(err);
          setIsSuccess(false);
          setLoading(false);
          onError(err);
          props.overlay && hide();
        });
      return datas;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.resource]
  );

  const onWindowFocus = () => {
    const exists = _.find(fetchProvider.state, { resource: props.resource });
    if (fetchOnWindowFocus) {
      fetch();
      console.log("fetch window focus");
    } else {
      if (exists) {
        setData(exists?.data);
        setLoading(false);
      } else {
        fetch();
      }
    }
  };

  useEffect(() => {
    if (enabled) {
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
  }, [loading, fetchProvider.state, props.resource]);

  return { loading, data, error, isSuccess, fetch };
};

useQuery.defaultProps = {
  method: "GET",
  refetchProvider: false,
  fetchOnWindowFocus: false,
};

export default useQuery;
