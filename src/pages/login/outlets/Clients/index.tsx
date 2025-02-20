import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext/useAppContext";
import { IClient } from "@context/AppContext/types";

import { ClientsUI } from "./interface";

interface IClientLocal {
  ref: HTMLInputElement | null;
  value: boolean;
}

function Clients() {
  const { businessUnits, handleClientChange } = useAppContext();
  const navigate = useNavigate();

  const clients: IClient[] = businessUnits.map((unit) => ({
    id: unit.businessUnitPublicCode,
    name: unit.descriptionUse,
    sigla: unit.abbreviatedName,
    logo: unit.urlLogo,
  }));

  const [clientLocal, setClientLocal] = useState<IClientLocal>({
    ref: null,
    value: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientLocal({ ref: event.target, value: false });
    const selectedClient = clients.find(
      (client) => client.name === event.target.value,
    );
    if (selectedClient) {
      handleClientChange(selectedClient);
    }
  };

  const handleSubmit = () => {
    navigate("/login/loading-app");
  };

  return (
    <ClientsUI
      clients={clients}
      client={clientLocal}
      handleClientChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export { Clients };
