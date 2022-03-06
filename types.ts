export interface IBuilder {
  buildInfo: DatasetBuildInfo[];
}

export enum Method {
  POST = 'POST',
  GET = 'GET',
}

export interface Request {
  path: string;
  method?: Method;
}

export interface RequestReponse extends Request {
  response: any;
  responses?: Array<any>;
}

export type ServicesRequestResponses = Record<
  string,
  Record<string, RequestReponse>
>;

export interface DatasetBuildInfo {
  name: string;
  servicesRequestReponses: ServicesRequestResponses;
}

export interface Service {
  name: string;
  port: number;
}
