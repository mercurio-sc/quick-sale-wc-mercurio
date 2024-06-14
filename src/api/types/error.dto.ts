export interface ErrorResponse {
  statusCode: number;
  message: string;
  exception: Exception;
}

export interface Exception {
  name: string;
  message: string;
  _eid: string;
}
