// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios";
import { Config } from "../configs";
import { METHOD_TYPE } from "../utils";

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: axiosBaseQuery({
    baseUrl: Config.baseUrl,
  }),
  endpoints(build) {
    return {
      profile: build.query({
        query: ({ userId }: { userId: string }) => {
          return {
            url: `/profile`,
            method: METHOD_TYPE.GET,
            params: { userId },
          };
        },
      }),
    };
  },
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLazyProfileQuery } = profileApi;
