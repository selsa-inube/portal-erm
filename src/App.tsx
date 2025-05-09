import { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Home } from "@src/pages/home";
import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { decrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";
import { useStaffUserAccount } from "@hooks/useStaffUserAccount";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { CertificationsRoutes } from "@routes/certifications";

import { LoginRoutes } from "./routes/login";
import { EmployeesRoutes } from "./routes/employees";
import { HolidaysRoutes } from "./routes/holidays";
import { Login } from "./pages/login";
import { GlobalStyles } from "./styles/global";
import { BusinessUnitsLoader } from "./BusinessUnitsLoader";
import { useAppContext } from "./context/AppContext/useAppContext";
import { AppProvider } from "./context/AppContext";
import { ProtectedAppPage } from "./ProtectedAppPage";
import { Contracts } from "./pages/contracts";
import { RequestsRoutes } from "./routes/requests";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return null;
}

function FirstPage() {
  const { user, setStaffUser } = useAppContext();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const {
    userAccount,
    hasError: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount({
    userAccountId: user?.id ?? "",
  });

  useEffect(() => {
    if (userAccount && !userAccountLoading && !userAccountError) {
      setStaffUser(userAccount);
      navigate("/login", { replace: true });
    }
  }, [
    userAccount,
    userAccountLoading,
    userAccountError,
    setStaffUser,
    navigate,
  ]);

  if (!isAuthenticated) {
    return <ErrorPage />;
  }

  if (userAccountLoading) {
    return <div>Cargando!!...</div>;
  }

  if (userAccountError || !userAccount) {
    return <ErrorPage errorCode={1004} />;
  }

  return <Login />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={<FirstPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="home/*" element={<Home />} />
      <Route path="login/*" element={<LoginRoutes />} />
      <Route path="/*" element={<ProtectedAppPage />}>
        <Route path="holidays/*" element={<HolidaysRoutes />} />
        <Route path="certifications/*" element={<CertificationsRoutes />} />
        <Route path="contracts/*" element={<Contracts />} />
        <Route path="requests/*" element={<RequestsRoutes />} />
      </Route>
      <Route
        path="/employees/*"
        element={<ProtectedAppPage withNav={false} withBanner={false} />}
      >
        <Route path="*" element={<EmployeesRoutes />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
      <Route path="*" element={<ProtectedAppPage />} />
    </>,
  ),
);

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;

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
    isFetching: isFetchingManagers,
  } = useBusinessManagers(portalData);

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasPortalError &&
      !isFetching &&
      !isFetchingManagers
    ) {
      loginWithRedirect();
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    hasPortalError,
    isFetching,
    isFetchingManagers,
  ]);

  if (isLoading || isFetching || isFetchingManagers) {
    return <div>Cargando...</div>;
  }

  if (hasPortalError || hasManagersError) {
    return <ErrorPage errorCode={businessManagersCode ?? 1001} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppProvider
      dataPortal={portalData}
      businessManagersData={businessManagersData}
      businessUnitsData={[]}
    >
      <GlobalStyles />
      <BusinessUnitsLoader portalCode={portalCode} />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
