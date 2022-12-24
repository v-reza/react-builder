import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { accessToken, isAuthenticated } = state;

  const updateToken = (accessToken: string) => {
    dispatch({
      type: "UPDATE_TOKEN",
      payload: {
        accessToken,
      },
    });
    localStorage.setItem("accessToken", accessToken);
  };

  return { accessToken, isAuthenticated, dispatch, updateToken };
};

export default useAuth;
