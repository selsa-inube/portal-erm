import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider, useAppContext } from "@context/AppContext";
import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";

import { usePortalData } from "@hooks/usePortalData";
import { useFlag } from "@inubekit/flag";

import { GlobalStyles } from "./styles/global";
import { decrypt } from "./utils/encrypt";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return null;
}

function FirstPage() {
  const { user } = useAppContext();
  const portalCode = localStorage.getItem("portalCode");
  return (portalCode && portalCode.length === 0) || !user ? (
    <AppPage />
  ) : (
    <AppPage />
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="/*" element={<AppPage />} />
      <Route path="logout" element={<LogOut />} />
    </>,
  ),
);

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalCode = params.get("portal")
    ? params.get("portal")
    : localStorage.getItem("portalCode")
      ? decrypt(localStorage.getItem("portalCode")!)
      : null;

  if (!portalCode) {
    return <ErrorPage />;
  }

  const [isReady, setIsReady] = useState(false);
  const [flagShown, setFlagShown] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { hasError } = usePortalData(portalCode ?? "");
  const { addFlag } = useFlag();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasError) {
      loginWithRedirect();
    } else {
      setIsReady(true);
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasError]);

  useEffect(() => {
    if (hasError && !flagShown) {
      addFlag({
        title: "Error",
        description: "Error en la consulta del código del portal",
        appearance: "dark",
        duration: 10000,
      });
      setFlagShown(true);
    }
  }, [hasError, flagShown, addFlag]);

  if (!isReady) {
    return null;
  }

  if (hasError) {
    return <ErrorPage />;
  }

  return (
    <AppProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
