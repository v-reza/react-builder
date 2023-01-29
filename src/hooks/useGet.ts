import { baseUrl } from "./../utils/axiosInstance";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import useAuth from "./useAuth";
import useOverlay from "./useOverlay";
import { FetchContext } from "../contexts/Fetch/FetchProvider";
import _ from "lodash";

export type useGetProps = {
  resource: string;
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  overlay?: boolean;
  fetchOnWindowFocus?: boolean;
  enabled?: boolean;
};

export const useGet = (props: useGetProps) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
    async () => {
      let datas: any = null;
      setLoading(true);
      props.overlay && show();
      await axiosInstance
        .get(`${props.resource.split(".").join("/")}`)
        .then((res: any) => {
          setData(res.data)
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

  useEffect(() => {
    fetch()
  }, []);
  return { loading, data, error, isSuccess, fetch };
};

useGet.defaultProps = {
  method: "GET",
};

export default useGet;
