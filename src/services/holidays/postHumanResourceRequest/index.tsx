import { IRequestBody, IHumanResourceResponse } from "./types";

export async function postHumanResourceRequest(
  requestBody: IRequestBody,
): Promise<IHumanResourceResponse> {
  const response = await fetch(
    "http://localhost:3001/ihurem-persistence-process-service/api/human-resources-requests",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
}
