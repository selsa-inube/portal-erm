import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage } from "@components/layout/AppPage";
import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { decrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";

import { useBusinessManagers } from "./hooks/useBusinessManagers";
import { GlobalStyles } from "./styles/global";
import { AppProvider } from "./context/AppContext";

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

  if (!portalCode) {
    return <ErrorPage errorCode={1001} />;
  }

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const {
    portalData,
    hasError: hasPortalError,
    isFetching,
  } = usePortalData(portalCode);

  const {
    businessManagersData,
    hasError: hasManagersError,
    codeError: businessManagersCode,
  } = useBusinessManagers(portalData);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasPortalError && !isFetching) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasPortalError]);

  if (isLoading || isFetching) {
    return <div>Cargando...</div>;
  }

  if (hasPortalError || hasManagersError) {
    return (
      <ErrorPage errorCode={businessManagersCode ?? hasPortalError ?? 1001} />
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppProvider
      dataPortal={portalData}
      businessManagersData={businessManagersData}
    >
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
