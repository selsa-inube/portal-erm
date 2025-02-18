import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";

import { CheckingCredentialsUI } from "./interface";

function CheckingCredentials() {
  const { user, businessUnits } = useAppContext();
  const navigate = useNavigate();

  const checkCredentials = useCallback(() => {
    try {
      if (!user) {
        navigate("/login/error/not-available");
        return;
      }

      if (!businessUnits || businessUnits.length === 0) {
        navigate("/login/error/not-related-clients");
      } else if (businessUnits.length === 1) {
        navigate("/login/loading-app");
      } else {
        navigate(`/login/${user.id}/clients`);
      }
    } catch {
      navigate("/login/error/not-available");
    }
  }, [user, navigate, businessUnits]);

  useEffect(() => {
    const timer = setTimeout(checkCredentials, 2000);
    return () => clearTimeout(timer);
  }, [checkCredentials]);

  return <CheckingCredentialsUI />;
}

export { CheckingCredentials };
