import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";

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

  const {
    userAccount,
    hasError: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount({
    userAccountId: user?.id ?? "",
  });

  if (!isAuthenticated) {
    return <ErrorPage />;
  }

  if (userAccountLoading) {
    return <div>Cargando!!...</div>;
  }

  if (userAccountError || !userAccount) {
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
    return <ErrorPage errorCode={1001} />;
  }

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { portalData, hasError, isFetching } = usePortalData(portalCode);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasError && !isFetching) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasError]);

  if (isLoading || isFetching) {
    return <div>Cargando...</div>;
  }

  if (hasError) {
    return <ErrorPage errorCode={hasError} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppProvider dataPortal={portalData}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
