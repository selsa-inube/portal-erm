import { Routes, Route } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { NewEmployee } from "@pages/Employees/NewEmployee";

function EmployeesRoutes() {
  return (
    <Routes>
      <Route path="new-employee" element={<NewEmployee />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export { EmployeesRoutes };
