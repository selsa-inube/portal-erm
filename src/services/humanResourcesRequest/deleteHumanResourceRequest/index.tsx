import { environment } from "@config/environment";

import { IDeleteResponse } from "./types";

export async function deleteHumanResourceRequest(
  body: IDeleteResponse,
): Promise<IDeleteResponse> {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Action": "RemoveHumanResourcesRequest",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}
