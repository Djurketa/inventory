import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nomenclaturesApi = createApi({
	reducerPath: "nomenclaturesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/" }),
	endpoints: (builder) => ({
		getSuppliers: builder.query({
			query: (data) => "suppliers", //id logovanog korisnika
		}),
		getItems: builder.query({
			query: (data) => "items", //id logovanog korisnika
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetSuppliersQuery, useGetItemsQuery } = nomenclaturesApi;
