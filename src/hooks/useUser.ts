import { useSelector } from "react-redux";
import { ModelUser } from "../utils/model";

export const useUser = () => {
  const { currentUser }: { currentUser: ModelUser } = useSelector(
    (state: any) => state.user
  );
  return { currentUser };
};

export default useUser;
