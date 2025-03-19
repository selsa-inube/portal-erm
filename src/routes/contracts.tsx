import { Route, Routes } from "react-router-dom";

import { Contracts } from "@pages/contracts";

function ContractsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Contracts />} />
    </Routes>
  );
}

export { ContractsRoutes };
