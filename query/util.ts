import {
  AxiosSource,
  axiosInstances,
  API_ENDPOINTS,
  ApiNames,
} from "query/apiSetting";

export function getAxiosInstance(source: AxiosSource) {
  if (source in axiosInstances) {
    return axiosInstances[source];
  } else {
    throw new Error("Invalid AxiosSource");
  }
}

export async function getAPIdata({
  apiSource,
  apiName,
}: {
  apiSource: AxiosSource;
  apiName: keyof typeof ApiNames.Web2ETH | keyof typeof ApiNames.Web3ETH;
}) {
  const targetEndPoint = (
    API_ENDPOINTS?.[apiSource] as Record<string, string>
  )?.[apiName];
  if (targetEndPoint) {
    const response = await getAxiosInstance(apiSource).get(targetEndPoint);
    return response.data;
  } else {
    throw new Error("Invalid API endpoint");
  }
}
