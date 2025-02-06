import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@src/context/AppContext/useAppContext";
import { ClientsUI } from "./interface";
import { IClient } from "@context/AppContext/types";

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

  const [search, setSearch] = useState<string>("");
  const [clientLocal, setClientLocal] = useState<IClientLocal>({
    ref: null,
    value: true,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (clientLocal.ref) {
      clientLocal.ref.checked = false;
    }
    setClientLocal({ ref: null, value: true });
    setSearch(event.target.value);
  };

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

  function filterClients(clients: IClient[], search: string): IClient[] {
    return clients.filter((client: IClient) => {
      const clientName = client.name.toUpperCase();
      const clientSigla = client.sigla.toUpperCase();
      const searchTerm = search.toUpperCase();
      return (
        clientName.includes(searchTerm) || clientSigla.includes(searchTerm)
      );
    });
  }

  return (
    <ClientsUI
      clients={clients}
      search={search}
      client={clientLocal}
      handleSearchChange={handleSearchChange}
      handleClientChange={handleChange}
      filterClients={filterClients}
      handleSubmit={handleSubmit}
    />
  );
}

export { Clients };
