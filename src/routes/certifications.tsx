import { Route, Routes } from "react-router-dom";

import { HumanResourceOptions } from "@pages/certifications";
import { NewCertification } from "@pages/certifications/NewCertification";

function CertificationsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HumanResourceOptions />} />
      <Route path="/new-certification" element={<NewCertification />} />
    </Routes>
  );
}

export { CertificationsRoutes };
