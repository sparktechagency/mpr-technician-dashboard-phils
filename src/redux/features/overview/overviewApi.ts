import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStatus: builder.query({
      query: ({ period }) => ({
        url: `/serviceOrder/technician/dashboard`,
        method: "GET",
        params: { period },
      }),
      providesTags: [tagTypes.orders],
    }),
    getEarningsOverview: builder.query({
      query: ({ year }) => ({
        url: `/serviceOrder/technician/monthly/stats`,
        method: "GET",
        params: { year },
      }),
      providesTags: [tagTypes.overview, tagTypes.orders],
    }),
  }),
});

export const { useGetOrderStatusQuery, useGetEarningsOverviewQuery } =
  overviewApi;
