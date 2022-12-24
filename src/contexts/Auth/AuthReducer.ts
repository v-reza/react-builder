import { AuthContextType } from "./AuthContext";

export type AuthAction = {
  type: string;
  payload?: AuthContextType;
};

export const AuthReducer = (
  state: AuthContextType,
  action: AuthAction
): AuthContextType => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload!.accessToken,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
      };
    case "UPDATE_TOKEN": {
      return {
        ...state,
        accessToken: action.payload!.accessToken,
      };
    }
    default:
      return state;
  }
};
