import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
   
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ search = '', category = '', page = 1 }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (category) params.append('category', category);
                params.append('page', page);
                return `products?${params.toString()}`;
            },
            providesTags: (result) =>
                result?.products
                    ? [...result.products.map(({ _id }) => ({ type: 'Product', id: _id })), { type: 'Product', id: 'LIST' }]
                    : [{ type: 'Product', id: 'LIST' }],
        }),
        addProduct: builder.mutation({
            query: (newProduct) => {
                console.log('API: Adding product:', newProduct);
                return {
                    url: 'products',
                    method: 'POST',
                    body: newProduct,
                };
            },
            invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Product', id: 'TOP' }, { type: 'Product', id: 'STATS' }],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Product', id }, 
                { type: 'Product', id: 'LIST' }, 
                { type: 'Product', id: 'TOP' }, 
                { type: 'Product', id: 'STATS' }
            ],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Product', id }, 
                { type: 'Product', id: 'LIST' }, 
                { type: 'Product', id: 'TOP' }, 
                { type: 'Product', id: 'STATS' }
            ],
        }),
        getTopProducts: builder.query({
            query: ({ limit = 3 } = {}) => `products/top?limit=${limit}`,
            providesTags: [{ type: 'Product', id: 'TOP' }],
        }),
        getCategoryStats: builder.query({
            query: () => 'products/stats',
            providesTags: [{ type: 'Product', id: 'STATS' }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetTopProductsQuery,
    useGetCategoryStatsQuery
} = apiSlice;

export default apiSlice;
