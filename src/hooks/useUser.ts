import { useSelector } from "react-redux";

export type ProjectInterface = {
  id: string;
  increment_id: number;
  name: string;
  description: string;
}

export type CurrentUserInterface = {
  userId: string;
  username: string;
  email: string;
  project: [ProjectInterface]
}
const useUser = () => {
  const { currentUser }: { currentUser: CurrentUserInterface } = useSelector(
    (state: any) => state.user
  );
  return { currentUser };
};

export default useUser;
