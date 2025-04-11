import { environment } from "@config/environment";

import { IDeleteResponse } from "./types";

export async function deleteHumanResourceRequest(
  requestId: string,
): Promise<IDeleteResponse> {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests/${requestId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
}
