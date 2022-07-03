import * as Builder from './types.ts';
import { RequestReponse, ServicesRequestResponses } from './types.ts';
import * as MockServerSettings from './mockServerTypes.ts';

export class DatasetBuilder {
  buildInfo: Builder.DatasetBuildInfo;

  constructor(datasetName: string) {
    this.buildInfo = {
      name: datasetName,
      servicesRequestReponses: {},
    };
  }

  assign(serviceRequestResponses: Record<string, RequestReponse[]>) {
    for (const service of Object.keys(serviceRequestResponses)) {
      const requestResponses = serviceRequestResponses[service];
      this.buildInfo.servicesRequestReponses[service] =
        toRequestResponseRecord(requestResponses);
    }
    return this;
  }

  override(service: string, request: Builder.Request, response: object) {
    const id = getId(request);

    this.buildInfo.servicesRequestReponses[service][id] = {
      ...request,
      response,
    };
    return this;
  }

  build() {
    const { name, servicesRequestReponses } = this.buildInfo;
    return toMockServerRequestResponses(name, servicesRequestReponses);
  }
}

function getId(request: Builder.Request) {
  const { method, path } = request;
  return `${method} ${path}`;
}

function toRequestResponseRecord(
  requestResponses: RequestReponse[]
): Record<string, RequestReponse> {
  const result: Record<string, RequestReponse> = {};
  for (const requestResponse of requestResponses) {
    const id = getId(requestResponse);
    result[id] = requestResponse;
  }
  return result;
}

function toMockServerRequestResponses(
  datasetName: string,
  servicesRequestResponses: ServicesRequestResponses
): Record<string, MockServerSettings.RequestResponse[]> {
  const result: Record<string, MockServerSettings.RequestResponse[]> = {};

  for (const serviceName of Object.keys(servicesRequestResponses)) {
    const serviceRequestResponses = Object.values(
      servicesRequestResponses[serviceName]
    );
    result[serviceName] = serviceRequestResponses.map((rr) => {
      const { path, method, response } = rr;
      return {
        path,
        headers: { testset: datasetName },
        method: method ? method : Builder.Method.GET,
        response: JSON.stringify(response),
      };
    });
  }
  return result;
}
