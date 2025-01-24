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

  if (!params.has("portal") || portalCode === "") {
    return <ErrorPage errorCode={1001} />;
  }

  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { portalData, hasError, errorType, isFetching } = usePortalData(
    portalCode ?? "",
  );

  useEffect(() => {
    if (!isLoading) {
      if (hasError) {
        setIsReady(false);
      } else if (!isAuthenticated) {
        loginWithRedirect();
      } else {
        setIsReady(true);
      }
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasError]);

  if (isLoading || isFetching) {
    return <div>Cargando...</div>;
  }

  if (hasError) {
    if (errorType === "api_error") {
      return <ErrorPage errorCode={500} />;
    }
    return <ErrorPage errorCode={1001} />;
  }

  if (!isReady) {
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
