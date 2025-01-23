import { useState, useEffect } from "react";
import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";

interface UseStaffUserAccountProps {
  userAccountId: string;
  onUserAccountLoaded?: (userAccount: IStaffUserAccount) => void;
}

export const useStaffUserAccount = ({
  userAccountId,
  onUserAccountLoaded,
}: UseStaffUserAccountProps) => {
  const [userAccount, setUserAccount] = useState<IStaffUserAccount | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (!userAccountId) {
        setError("El ID de cuenta de usuario es necesario");
        setUserAccount(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await staffUserAccountById(userAccountId);
        setUserAccount(data);
        if (onUserAccountLoaded) {
          onUserAccountLoaded(data); // Ejecuta el callback si existe
        }
      } catch (err) {
        console.error(err);
        setError("Hubo un error al obtener los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccount();
  }, [userAccountId, onUserAccountLoaded]);

  return { userAccount, loading, error };
};
