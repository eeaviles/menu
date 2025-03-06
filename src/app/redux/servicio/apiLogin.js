
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Crear la API
export const LoginApi = createApi({
  reducerPath: "loginapi", // Nombre en el store

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/menu/backend/index.php",
  }),

  //-----[TAGS]--------------------------------------------------------------
  tagTypes: ["Post"], // Definir los tipos de tags

  //-----[GETS]--------------------------------------------------------------
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts", // Endpoint para traer posts
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`, // Endpoint para traer un post por ID
    }),

    //-----[POST]--------------------------------------------------------------
    authLogin: builder.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "",
        method: "post",
        body: JSON.stringify(paquete),
        cache: "default",
        mode: "cors",
        credentials: "include",
        referrerPolicy: "no-referrer",
      }),
    }),
  }),

  onError: (error) => {
    console.error("Error en la API:", error);
  },
});

// Exportar el hook que RTK Query genera automáticamente
export const { useAuthLoginMutation } = LoginApi;