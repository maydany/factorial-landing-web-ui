import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  API_ENDPOINTS,
  QueryResponses,
  ApiNames,
  ApiSources,
} from "./apiSetting";
import { getAxiosInstance } from "./util";

import {} from "query/apiSetting";
export interface QueryRes<T> {
  curTimestamp: number;
  data: T;
  result: "ok" | "error"; // dummy typing
}

/**
 * @description Get data from various endpoints
 * @param {string} apiSource - data sources (web2, eth, etc)
 * @param {string} apiName - a key of api endpoints
 * @param {any} payload - query payload
 */
export const useDataQuery = ({
  apiSource,
  apiName,
  payload,
  initialData = null,
  refetchInterval,
}: {
  apiSource: keyof typeof ApiSources;
  apiName: keyof typeof ApiNames.Web2ETH | keyof typeof ApiNames.Web3ETH;
  payload?: any;
  initialData?: any;
  refetchInterval?: number;
}) => {
  const targetEndPoint = (
    API_ENDPOINTS?.[apiSource] as Record<string, string>
  )?.[apiName];

  // check validity of apiSource and apiName
  if (targetEndPoint) {
    // TODO: payload handling
    // set axios instance(different baseURL) based on apiSource
    const axiosInstance = getAxiosInstance(apiSource);
    const queryData = {
      name: [`${apiSource}/${apiName}`],
      fn: () => axiosInstance.get(targetEndPoint),
      refetchInterval,
    };

    switch (apiName) {
      case ApiNames.Web2ETH["assetInfo"]:
        return handleResponse<QueryRes<QueryResponses.Web2ETH.assetInfo>>(
          useQuery(queryData.name, queryData.fn, {
            initialData,
            refetchInterval: queryData.refetchInterval,
          })
        );
    }
  } else {
    // when params are invalid
    const errorMsg = `Invalid endpoint: ${apiSource} - ${apiName}`;
    console.error(errorMsg);
    return {
      data: null,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      error: null,
      errorMsg,
    };
  }
};

// helpers
export function handleResponse<T>({
  isLoading,
  isFetching,
  isSuccess,
  error,
  data,
}: UseQueryResult<AxiosResponse<T>, Error | AxiosError>) {
  const errorMsg = handleError(error);

  return {
    isLoading,
    isFetching,
    isSuccess,
    error,
    errorMsg,
    data: data?.data,
  };
}

export function handleError(error: Error | AxiosError | null): string {
  let errorMsg = "";

  if (error !== null) {
    if (axios.isAxiosError(error)) {
      console.group();

      if (error.response) {
        errorMsg = `Error occured: \n${
          error.response.data?.message ?? error.response.data ?? "Unknown error"
        }`;
        console.log("Error response", error.response);
      } else if (error.request) {
        errorMsg = "Server is not responding currently.";
        console.log("Request was", error.request);
      } else {
        errorMsg = "Invalid request";
        console.log("Invalid request", error.message);
      }

      console.groupEnd();
    }
  }

  return errorMsg;
}
