import { Route, Routes } from "react-router-dom";

import { HumanResourceOptions } from "@pages/certifications";

function CertificationsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HumanResourceOptions />} />
    </Routes>
  );
}

export { CertificationsRoutes };
