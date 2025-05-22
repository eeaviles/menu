import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//--------------------------------------------------

// Determinar si estamos en local o en el servidor
const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

// Configurar la baseUrl dinámicamente
const baseUrl = isLocalhost
  ? "http://localhost/menu/backend/index.php" // Ruta local
  : "https://www.cafegarzan.com/menu/backend/index.php"; // Ruta servidor

//---------------------------------------------------


// Crear la API
export const LoginApi = createApi({
  reducerPath: "loginapi", // Nombre en el store
  /*
    baseQuery: fetchBaseQuery({
      //baseUrl: "http://localhost/menu/backend/index.php", //Ruta local
      baseUrl: "https://www.cafegarzan.com/menu/backend/index.php", //Ruta servidor
    }),
  */

  //---------------------------------------------
  baseQuery: fetchBaseQuery({
    baseUrl, // Usar la baseUrl dinámica
  }),

  //---------------------------------------------


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