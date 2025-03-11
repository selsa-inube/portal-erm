import { Route, Routes } from "react-router-dom";

import { HolidaysOptions } from "@pages/holidays";
import { RequestPayment } from "@pages/holidays/RequestPayment";

function HolidaysRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HolidaysOptions />} />
      <Route path="/request-payment" element={<RequestPayment />} />
    </Routes>
  );
}

export { HolidaysRoutes };
