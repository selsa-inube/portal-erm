import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { formatDate } from "@utils/date";
import { ICertificationsTable } from "../components/CertificationsTable/types";
import {
  EStatus,
  EType,
  HumanResourceRequest,
} from "@src/types/humanResourcesRequest.types";

export const formatHumanResourceData = (
  requests: HumanResourceRequest[],
): ICertificationsTable[] =>
  requests.map((request) => ({
    requestNumber: { value: request.humanResourceRequestNumber },
    type: {
      value:
        EType[
          request.humanResourceRequestType as unknown as keyof typeof EType
        ],
    },
    date: { value: formatDate(request.humanResourceRequestDate) },
    status: {
      value:
        EStatus[
          request.humanResourceRequestStatus as unknown as keyof typeof EStatus
        ],
    },
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
    dataDetails: {
      value: {
        ...request.humanResourceRequestData,
        description: request.humanResourceRequestDescription,
      },
    },
  }));
