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
import { AppProvider, useAppContext } from "@context/AppContext";
import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { decrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";
import { useStaffUserAccount } from "@hooks/useStaffUserAccount";

import { GlobalStyles } from "./styles/global";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return null;
}

function FirstPage() {
  const { user } = useAppContext();
  const { isAuthenticated } = useAuth0();
  const portalCode = localStorage.getItem("portalCode");

  if (!isAuthenticated || !portalCode || portalCode.length === 0 || !user) {
    return <ErrorPage />;
  }

  return <AppPage />;
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
    : decrypt(localStorage.getItem("portalCode")!);

  if (!params.has("portal")) {
    return <ErrorPage errorCode={1001} />;
  }

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
  }

  const [isReady, setIsReady] = useState(false);
  const [flagShown, setFlagShown] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const { hasError } = usePortalData(portalCode);

  const {
    userAccount,
    error: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount(user?.userAccountId ?? "");

  const { addFlag } = useFlag();

  useEffect(() => {
    console.log("Usuario autenticado:", user);
    if (!isLoading && !isAuthenticated && !hasError) {
      loginWithRedirect();
    } else if (!isLoading && (isAuthenticated || hasError)) {
      if (!user?.userAccountId) {
        setIsReady(false);
      } else {
        setIsReady(true);
      }
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasError, user]);

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

  if (isLoading || !isReady || userAccountLoading) {
    return <div>Cargando...</div>;
  }

  if (hasError || userAccountError) {
    console.error("Error al cargar los datos del portal o de usuario:", {
      hasError,
      userAccountError,
      userAccount,
    });
    return <ErrorPage errorCode={500} />;
  }

  if (!userAccount || Object.keys(userAccount).length === 0) {
    console.error("No se pudo cargar la cuenta de usuario correctamente.");
    return <div>Error: No se pudo cargar la cuenta de usuario.</div>;
  }

  return (
    <AppProvider staffUserAccount={userAccount}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
