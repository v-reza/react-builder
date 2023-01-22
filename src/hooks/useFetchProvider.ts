import { useContext } from "react";
import { FetchContext } from "../contexts/Fetch/FetchProvider";
export const useFetchProvider = () => {
  const fetchProvider = useContext(FetchContext);
  return fetchProvider;
};

export default useFetchProvider;
