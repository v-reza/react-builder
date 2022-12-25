import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthContextProvider as AuthGuard } from "./contexts/Auth/AuthContext";
import MasterLayout from "./pages/MasterLayout";
import LoadingOverlay from "./pages/LoadingOverlay";
import { FetchProvider } from "./contexts/Fetch/FetchProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthGuard>
        <MasterLayout>
          <LoadingOverlay>
            <FetchProvider>
              <App />
            </FetchProvider>
          </LoadingOverlay>
        </MasterLayout>
      </AuthGuard>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
