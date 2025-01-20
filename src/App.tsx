import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { useFlag } from "@inubekit/flag";

import { useAuth0 } from "@auth0/auth0-react";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider } from "@context/AppContext";
import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { decrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";

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

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalCode = params.get("portal")
    ? params.get("portal")
    : decrypt(localStorage.getItem("portalCode")!);

  if (!params.has("portal")) {
    return <ErrorPage errorCode={1001} />;
  }

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
  }

  const [isReady, setIsReady] = useState(false);
  const [flagShown, setFlagShown] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { hasError, errorType } = usePortalData(portalCode);
  const { addFlag } = useFlag();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasError) {
      loginWithRedirect();
    } else if (!isLoading && (isAuthenticated || hasError)) {
      setIsReady(true);
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasError]);

  useEffect(() => {
    if (hasError && errorType === "api_error" && !flagShown) {
      addFlag({
        title: "Error",
        description: "Error en la consulta del código del portal",
        appearance: "dark",
        duration: 10000,
      });
      setFlagShown(true);
    }
  }, [hasError, flagShown, addFlag, errorType]);

  if (isLoading || !isReady) {
    return <div>Cargando...</div>;
  }

  if (hasError) {
    return <ErrorPage errorCode={500} />;
  }

  return (
    <AppProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}
export default App;
