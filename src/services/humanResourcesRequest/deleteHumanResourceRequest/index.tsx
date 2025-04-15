import { environment } from "@config/environment";
import { IDeleteResponse } from "./types";

interface IRemoveHumanResourcesRequest {
  humanResourceRequestIds: string[];
  reason?: string;
  remarks?: string;
}

export async function deleteHumanResourceRequest(
  requestId: string,
): Promise<IDeleteResponse> {
  const requestPayload: IRemoveHumanResourcesRequest = {
    humanResourceRequestIds: [requestId],
  };

  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Action": "RemoveHumanResourcesRequest",
      },
      body: JSON.stringify(requestPayload),
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}
