import {
  parse as yamlParse,
  stringify as yamlStringify,
} from 'https://deno.land/std/encoding/yaml.ts';
import { RequestResponse } from './mockServerTypes.ts';
import { Service } from './types.ts';

export async function compile(
  services: Service[],
  datasets: Record<string, RequestResponse[]>[],
  outputPath: string
) {
  let config: any = {};

  for (const service of services) {
    const serviceRequestResponses = datasets.reduce(
      (rrs: RequestResponse[], ds) => {
        const serviceRequestResponses = ds[service.name];
        rrs = [...serviceRequestResponses, ...rrs];
        return rrs;
      },
      []
    );
    const serviceConfig = {
      ...service,
      endpoint: serviceRequestResponses,
    };
    config.services.push({
      ...serviceConfig,
    });
  }

  const mockServerConfig = yamlStringify(config);
  return Deno.writeTextFile(outputPath, mockServerConfig);
}
