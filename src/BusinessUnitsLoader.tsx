import { useEffect } from "react";

import { useAppContext } from "./context/AppContext/useAppContext";
import { useBusinessUnits } from "@hooks/useBusinessUnits";

interface BusinessUnitsLoaderProps {
  portalCode: string;
}

export function BusinessUnitsLoader(props: BusinessUnitsLoaderProps) {
  const { portalCode } = props;
  const { staffUser, setBusinessUnits } = useAppContext();
  const userAccount = staffUser?.userAccount || "";
  const { businessUnitsData, hasError, isFetching } = useBusinessUnits(
    userAccount,
    portalCode,
  );

  useEffect(() => {
    if (!isFetching && !hasError && businessUnitsData.length > 0) {
      setBusinessUnits(businessUnitsData);
    }
  }, [isFetching, hasError, businessUnitsData, setBusinessUnits]);

  return null;
}
