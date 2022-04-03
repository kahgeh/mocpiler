import { yaml } from './deps.ts';
import { RequestResponse } from './mockServerTypes.ts';
import { Service } from './types.ts';

export async function compile(
  services: Service[],
  datasets: Record<string, RequestResponse[]>[],
  outputPath: string
) {
  let config: any = { services: [], management: { port: 9999 } };

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
      endpoints: serviceRequestResponses,
    };
    config.services.push({
      ...serviceConfig,
    });
  }
  config.management = {
    port: 9999,
  };
  const mockServerConfig = yaml.stringify(config);
  return Deno.writeTextFile(outputPath, mockServerConfig);
}
