import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPendingOrders: builder.query({
      query: ({ search, page, limit }) => ({
        url: `/serviceOrder/pending`,
        method: "GET",
        params: { searchTerm: search, page, limit },
      }),
      providesTags: [tagTypes.orders],
    }),
    getAllOrder: builder.query({
      query: ({ status, search, page, limit }) => ({
        url: `/serviceOrder/my-orders`,
        method: "GET",
        params: { status, searchTerm: search, page, limit },
      }),
      providesTags: [tagTypes.orders],
    }),
    getSingleOrder: builder.query({
      query: ({ orderId }) => ({
        url: `/serviceOrder/${orderId}`,
        method: "GET",
      }),
    }),
    acceptOrder: builder.mutation({
      query: (req) => {
        console.log(req);
        return {
          url: `/serviceOrder/accept/${req?.params}`,
          method: "PATCH",
          body: req.body,
        };
      },
    }),
    completeOrder: builder.mutation({
      query: (req) => ({
        url: `/serviceOrder/complete/${req?.params}`,
        method: "PATCH",
      }),
    }),
    enRouteMail: builder.mutation({
      query: (req) => ({
        url: `/serviceOrder/en-route/${req?.params}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllPendingOrdersQuery,
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
  useAcceptOrderMutation,
  useCompleteOrderMutation,
  useEnRouteMailMutation,
} = overviewApi;
