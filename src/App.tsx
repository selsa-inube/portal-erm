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
import { useStaffUserAccount } from "@hooks/useStaffUserAccount";

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
    : localStorage.getItem("portalCode")
      ? decrypt(localStorage.getItem("portalCode")!)
      : null;

  if (!portalCode) {
    console.error("Error: No se encontró un portalCode válido.");
    return <ErrorPage />;
  }

  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  const { hasError } = usePortalData(portalCode ?? "");

  const {
    userAccount,
    error: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount(user?.userAccountId ?? "");

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasError) {
      console.log("Redirigiendo a login...");
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasError]);

  useEffect(() => {
    console.log("Auth0 State:", { isAuthenticated, isLoading, user });
    if (isAuthenticated && user) {
      setIsReady(true);
    }
  }, [isAuthenticated, user]);

  if (isLoading || !isReady || userAccountLoading) {
    return <div>Loading...</div>;
  }

  if (hasError || userAccountError) {
    console.error("Error al cargar los datos:", {
      hasError,
      userAccountError,
      userAccount,
    });
    return <ErrorPage />;
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
