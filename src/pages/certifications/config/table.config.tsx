import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { formatDate } from "@utils/date";
import { HumanResourceRequest } from "@src/types/humanResourcesRequest.types";

export const formatHumanResourceData = (requests: HumanResourceRequest[]) =>
  requests.map((request) => ({
    requestNumber: { value: request.humanResourceRequestNumber },
    type: { value: request.humanResourceRequestType },
    date: { value: formatDate(request.humanResourceRequestDate) },
    status: { value: request.humanResourceRequestStatus },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon" as const,
      onClick: () =>
        console.log(
          `Ver detalles de la solicitud ${request.humanResourceRequestId}`,
        ),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon" as const,
      onClick: () =>
        console.log(`Eliminar solicitud ${request.humanResourceRequestId}`),
    },
  }));
