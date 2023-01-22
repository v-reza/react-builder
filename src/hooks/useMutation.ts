import { useOverlay } from "./useOverlay";
import { useCallback, useMemo, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";
import { baseUrl } from "../utils/axiosInstance";
export type useMutationProps = {
  ids?: string;
  resource: string;
  delete?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  onMutate?: (data: any) => void;
  overlay?: boolean;
};

export const useMutation = (props: useMutationProps) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const method = useMemo(() => {
    return props.delete ? "DELETE" : props.ids ? "PUT" : "POST";
  }, [props.ids, props.delete]);

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
    [props.onSuccess]
  );

  const onError = useCallback(
    (err: any) => {
      props.onError && props.onError(err);
    },
    [props.onError]
  );

  const onMutate = useCallback(
    (data: any) => {
      props.onMutate && props.onMutate(data);
    },
    [props.onMutate]
  );

  const mutation = useCallback(
    async (data?: any, overlayOnParam = false as boolean | undefined) => {
      let datas: any = null;
      setLoading(true);
      props.overlay || (overlayOnParam && show());
      onMutate(data);
      await axiosInstance[method.toLowerCase()](
        `${props.ids ? props.resource + "/" + props.ids : props.resource}`,
        data
      )
        .then((res: any) => {
          setData(res.data);
          setIsSuccess(true);
          onSuccess(res.data);
          return (datas = res.data);
        })
        .catch((err: any) => {
          setError(true);
          onError(err);
        })
        .finally(() => {
          setLoading(false);
          props.overlay || (overlayOnParam && hide());
        });
      return datas;
    },
    [props.ids]
  );

  return {
    loading,
    data,
    error,
    isSuccess,
    mutation,
    onSuccess,
    onError,
    onMutate,
  };
};

export default useMutation;
