import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider } from "@context/AppContext";
import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";

import { usePortalData } from "@hooks/usePortalData";
import { useFlag } from "@inubekit/flag";

import { GlobalStyles } from "./styles/global";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return null;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<AppPage />} errorElement={<ErrorPage />} />
      <Route path="logout" element={<LogOut />} />
    </>,
  ),
);

function getPortalCode(): string | null {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get("portal");
}

function App() {
  const portalCode = getPortalCode();

  if (!portalCode) {
    return <ErrorPage heading="Se debe ingresar un código de portal" />;
  }

  const [isReady, setIsReady] = useState(false);
  const [flagShown, setFlagShown] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { hasError } = usePortalData(portalCode);
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
