import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setUser } from "../../redux/reducer/userReducer";

export type AuthContextType = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

export type AuthContextValue = {
  state: AuthContextType;
  dispatch: React.Dispatch<any>;
};

type AuthContextProps = {
  children: React.ReactNode;
};

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: localStorage.getItem("accessToken") ? true : false,
};

export const AuthContext = createContext<AuthContextValue>({
  state: initialState,
  dispatch: (action) => action,
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    const decodedUser = async (): Promise<void> => {
      if (state.accessToken) {
        const decodedUser = jwtDecode(state.accessToken);
        dispatchRedux(setUser({ user: decodedUser }));
      }
    };
    decodedUser();
  }, [dispatchRedux, state.accessToken]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
