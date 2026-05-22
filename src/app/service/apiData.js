import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com"}),
    endpoints: function( builder ) {
        return {
            // get all products
            getAllProducts: builder.query({
                query: () => "/products"
            }),
            // get single product
            getSingleProduct: builder.query({
                query: ( id ) => `/products/${id}`
            }),
            // add new product
            addNewProduct: builder.mutation({
                query: ( data ) => ({
                    url: `/products/add`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: data
                })
            }),
            // update new product ( uses same implementation as add new product )
            updateProduct: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/products/${ id }`,
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                })
            }),
            // delete product ( uses same implementation as add new product )
            deleteProduct: builder.mutation({
                query: ( id ) => ({
                    url: `/products/${ id }`,
                    method: "DELETE"
                })
            })
        }
    }
})

export const { 
    useGetAllProductsQuery, 
    useGetSingleProductQuery, 
    useAddNewProductMutation,
    useUpdateProductMutation
} = productsApi