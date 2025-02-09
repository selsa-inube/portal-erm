import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { formatDate } from "@utils/date";
import { HumanResourceRequest } from "@ptypes/certifications.types";

export const formatHumanResourceData = (requests: HumanResourceRequest[]) =>
  requests.map((request) => ({
    requestNumber: { value: request.human_resource_request_number },
    description: { value: request.human_resource_request_description },
    type: { value: request.human_resource_request_type },
    date: { value: formatDate(request.human_resource_request_date) },
    status: { value: request.human_resource_request_status },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon" as const,
      onClick: () =>
        console.log(
          `Ver detalles de la solicitud ${request.human_resource_request_id}`,
        ),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon" as const,
      onClick: () =>
        console.log(`Eliminar solicitud ${request.human_resource_request_id}`),
    },
  }));
