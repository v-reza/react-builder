import { useContext } from "react";
import { FetchContext } from "../contexts/Fetch/FetchProvider";
const useFetchProvider = () => {
  const fetchProvider = useContext(FetchContext);
  return fetchProvider;
};

export default useFetchProvider;
