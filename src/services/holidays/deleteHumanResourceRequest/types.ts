export interface IDeleteResponse {
  status: string;
  message: string;
  data: {
    requestId: string;
    timestamp: string;
  };
}
