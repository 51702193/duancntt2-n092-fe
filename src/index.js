import React, { memo } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";

import MainPage from "./containers/MainPage";
import ViewAll from "./containers/ViewAll";
import AdminPage from "./containers/AdminPage";
import PostNews from "./containers/PostNews";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";

import { GoogleOAuthProvider } from "@react-oauth/google";
import TopNav from "./components/TopNav";
import useUser from "./hooks/useUser";

const router = (props) =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainPage />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* ... etc. */}
        </Route>
        <Route path="/cong-dong-du-an" element={<ViewAll />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dang-tin-tuc" element={<PostNews {...props} />} />
        <Route path="*" element={<div>404 not found</div>} />
      </>
    )
  );

const App = memo(() => {
  const { isLoadingFetchAuthUser, authUser } = useUser();

  return (
    <>
      <TopNav
        authUser={authUser}
        isLoadingFetchAuthUser={isLoadingFetchAuthUser}
      />
      <main className="main">
        <RouterProvider router={router({ authUser, isLoadingFetchAuthUser })} />
      </main>
    </>
  );
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <GoogleOAuthProvider clientId="188789041069-5p15dp7j6akls94ma73mb3v0gleptbpi.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <ToastContainer />
    </ErrorBoundary>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
