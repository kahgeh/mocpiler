export interface RequestResponse {
  path: string;
  headers: Record<string, string>;
  method: string;
  response: string;
}
