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
  const { user, setstaffUser } = useAppContext();
  const { isAuthenticated } = useAuth0();
  const portalCode = localStorage.getItem("portalCode");

  const {
    userAccount,
    error: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount({ userAccountId: user?.id ?? "" });

  useEffect(() => {
    if (userAccount && Object.keys(userAccount).length > 0) {
      setstaffUser(userAccount);
    }
  }, [userAccount]);

  if (!isAuthenticated || !portalCode || portalCode.length === 0 || !user) {
    return <ErrorPage />;
  }

  if (userAccountLoading) {
    return <div>Cargando!!...</div>;
  }

  if (
    userAccountError ||
    !userAccount ||
    Object.keys(userAccount).length === 0
  ) {
    return <ErrorPage errorCode={1004} />;
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

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
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
  }, [isLoading, isAuthenticated, loginWithRedirect]);

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
  if (isLoading || !isReady) {
    return <div>Cargando...</div>;
  }

  if (hasError) {
    console.error("Error al cargar los datos del portal:", hasError);
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
