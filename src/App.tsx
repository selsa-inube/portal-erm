import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { environment } from "./config/environment";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  void logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return <h1>You have been logged out.</h1>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/logout" element={<LogOut />} />
    </>,
  ),
);

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <RouterProvider router={router} />;
}

export { App };
