import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GenericApi = createApi({
  reducerPath: "genericapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/menu/backend/index.php",
  }), //---[PASO 1]
  //keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  //refetchOnFocus: true,
  //refetchOnReconnect: true,
  tagTypes: [
    "Personas",
    "Empresas",
    "EmpresasN",
    "Areas",
    "Sucursales",
    "puestostrabajo",
    "Marcas",
    "Categorias",
    "Productos",
    "Proveedores",
    "OrdenesCompra",
    "EmpresasContactos",
    "DetalleCompra",
    "Inventario",
    "Clientes",
    "Ventas",
    "DetalleVentas",
    "Documentos",
    "TipoEstablecimiento",
    "Departamento",
    "Municipio",
    "PuntoVenta",
    "Emp_Cat019",
    "Cat019",
    "Cat015",
    "EmpresaImpuestos",
    "Dte",
  ],

  endpoints: (build) => ({
    //-----[ GET-PERSONAS-USUARIOS ]
    obtener: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Personas"],
    }),

    //GET-PERSONAS-USUARIOS XID
    obtpersonaxid: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Personas"],
    }),

    //POST-PERSONAS-USUARIOS
    enviar: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Personas"],
    }),

    //---[ EMPRESAS ]-------------------------------
    //GET-EMPRESAS
    obtemp: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Empresas"],
    }),

    //GET-EMPRESASXID  [ PROY MENU ]
    obtempxid: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Empresas"],
    }),

    //GET-EMPRESAS
    obtempprincipal: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Empresas"],
    }),

    //GET-EMPRESASXIDN PARA componente select en formulario agregar proveedores y agregar clientes CASO ESPECIAL
    obtempxidN: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&S=${cam.S}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["EmpresasN"],
    }),

    //POST-EMPRESAS [ PROY MENU ]
    envremp: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Empresas"],
    }),

    //---[ AREAS ]
    //POST-AREAS
    envareas: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Areas"],
    }),
    //GET-AREAS
    obtareas: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Areas"],
    }),

    //---[ SUCURSALES ]
    //---[ GET-SUCURSALES ]---- VERIFICAR: SOLAMENTE EL QUERY QUE LLEVA ID PARA TODOS LOS GET

    //----[MODULO MENU ]-----------------------------------------------------------
    obtsucursales: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Sucursales"],
    }),
    //------------------------------------------------------------------------------
    
    obtsucursalesxid: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Sucursales"],
    }),
    

    //---[ POST-SUCURSALES ]
    envsucursales: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Sucursales"],
    }),

    //---[ PUESTOSTRABAJOS ]-----------------------------
    //---[ GET-PUESTOSTRABAJOS ]
    obtptbjo: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["puestostrabajo"],
    }),
    //---[ POST-PUESTOSTRABAJOS ]
    envobtptbjo: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["puestostrabajo"],
    }),

    //---[ MARCAS ]--------------------------------------
    //---[GET-MARCAS]
    obtmarcasxid: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Marcas"],
    }),
    //---[ POST-MARCAS ]
    envmarca: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Marcas"],
    }),

    //---[ CATEGORIAS ]-----------------------------------
    //---[GET-CATEGORIAS]
    obtcategorias: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Categorias"],
    }),
    envcategorias: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Categorias"],
    }),

    //---[ PRODUCTOS ]------------------------------------
    //---[GET-PRODUCTOS]
    obtproductos: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Productos"],
    }),
    obtproductosxid: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Productos"],
    }),
    //---[ POST-PRODUCTOS ]
    envproductos: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Productos"],
    }),
    //---[ POST-PRODUCTOS--- CONSIDERANDO NO-JSON ]
    envproductosform: build.mutation({
      query: (paquete) => ({
        url: "index.php",
        method: "POST",
        body: paquete,
        credentials: "include",
      }),
      invalidatesTags: ["Productos", "Inventario"],
    }),

    //---[PROVEEDORES]-------------------------------------
    //---[GET-PROVEEDORES]------
    obtproveedoresxid: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Proveedores"],
    }),
    //---[ POST-PRODUCTOS ]
    envproveedores: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Proveedores"],
    }),

    //---[OREDENES COMPRA]----------------------------------
    //---[GET-OREDENES COMPRA]------
    obtordenescompraxid: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["OrdenesCompra"],
    }),
    //---[POST-OREDENES COMPRA]
    envordencompra: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["OrdenesCompra"],
    }),

    //---[EMPRESAS CONTACTO]----------------------------------
    //---[GET EMPRESAS CONTACTO]
    obtempcont: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["EmpresasContactos"],
    }),

    //---[DETALLES COMPRAS]-----------------------------------
    //---[GET DETALLES COMPRAS]
    obtdetcomp: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["DetalleCompra"],
    }),

    //---[POST DETALLES COMPRA]
    envdetcomp: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["DetalleCompra", "OrdenesCompra"],
    }),

    //---[INVENTARIO]------------------------------------------
    obtinventario: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Inventario"],
    }),

    //---[ CLIENTES ]------------------------------------------
    //---[ GET-CLIENTES ]
    obtcliente: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Clientes"],
    }),
    //---[ POST-CLIENTES ]
    envcliente: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Clientes"],
    }),

    //---[ VENTAS ]------------------------------------------
    //---[ GET-VENTAS ]
    Gventas: build.query({
      //USAR UseQuery
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&fc`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Ventas", "Dte"],
    }),

    Obtventas: build.query({
      //USAR UseLazyqQuery
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&fc=${cam.fc}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Ventas", "Dte"],
    }),

    //---[ POST-VENTAS ]
    Mventas: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Ventas"],
    }),

    Mventassintags: build.mutation({
      // OJO: Sin invalidatesTags de cambio
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
    }),

    //---[ DETALLEVENTAS ]------------------------------------------------
    //---[ GET-VENTAS ]
    Gdetalleventas: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["DetalleVentas"],
    }),

    //---[ DOCUMENTOS ]---------------------------------------
    //---[ GET-DOCUMENTOS ]
    Gdocumentos: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Documentos"],
    }),
    //---[ POST-DOCUMENTOS ]
    Mdocumentos: build.mutation({
      query: (paquete) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "index.php",
        method: "POST",
        body: JSON.stringify(paquete),
        credentials: "include",
      }),
      invalidatesTags: ["Documentos"],
    }),
    //---[ OBTENER-TIPO DE ESTABLECIMEINTOS ]-----------------------------
    ObTipoEstablecimeinto: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["TipoEstablecimiento"],
    }),
    //---[ OBTENER DEPARTAMENTOS ]----------------------------------------
    ObtDepartamento: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Departamento"],
    }),
    //---[ OBTENERMUNICIPIOS ]--------------------------------------------
    ObtMunicipio: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Municipio"],
    }),
    //---[ PUNTO DE VENTAS ]----------------------------------------------
    ObtPuntoVenta: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["PuntoVenta"],
    }),

    //---[ EMPRESA CATEGORIA Emp_Cat019 ]------------------------------------------------
    ObtEmp_Cat019: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Emp_Cat019"],
    }),
    
    //---[ CATEGORIA 019 ]------------------------------------------------
    ObtCat019: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Cat019"],
    }),
    //---[ CATEGORIA 015 ]------------------------------------------------
    ObtCat015: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Cat015"],
    }),
    //---[ Empresaimpuestoscam ]------------------------------------------
    ObtEmpresaImpuestos: build.query({
      query: (cam) => ({
        url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["EmpresaImpuestos"],
    }),
    //---[ DTE ]-----------------------------------------------
    Dte: build.query({
      query: (cam) => ({
        url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&obj=${cam.obj}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Dte"],
    }),
  }),
});

export const {
  useEnviarMutation,
  useObtenerQuery,
  useObtpersonaxidQuery,
  //---[EMPRESAS]
  useObtempQuery,
  useObtempxidQuery,
  useObtempxidNQuery,
  useObtempprincipalQuery,
  useEnvrempMutation,

//----------------------------------------------------------------
  
  //---[AREAS]
  useObtareasQuery,
  useEnvareasMutation,
  //---[SUCURSALES]
  useObtsucursalesQuery,
  useEnvsucursalesMutation,
  //---[PUESTOSTRABAJO]
  useObtptbjoQuery,
  useEnvobtptbjoMutation,
  //---[MARCAS]
  useObtmarcasxidQuery,
  useEnvmarcaMutation,
  //---[CATEGORIAS]
  useObtcategoriasQuery,
  useEnvcategoriasMutation,
  //---[PRODICTOS]
  useObtproductosQuery,
  useObtproductosxidQuery,
  useEnvproductosMutation,
  useEnvproductosformMutation,
  //---[PROVEEDORES]
  useObtproveedoresxidQuery,
  useEnvproveedoresMutation,
  //---[ORDENESCOMPRA]
  useObtordenescompraxidQuery,
  useEnvordencompraMutation,
  //---[EMPRESAS CONTACTOS]
  useObtempcontQuery,
  //---[DETALLE OMPRAS ]
  useObtdetcompQuery,
  useEnvdetcompMutation,
  //---[ IVENTARIO ]
  useObtinventarioQuery,
  //---[ CLIENTES ]
  useObtclienteQuery,
  useEnvclienteMutation,
  //---[ VENTAS ]
  useGventasQuery, useLazyObtventasQuery, useMventasMutation,  useMventassintagsMutation,

  //---[ DOCUMENTOS ]
  useGdocumentosQuery,
  useMdocumentosMutation,
  //---[DETALLEVENTAS]
  useGdetalleventasQuery,
  //---[TIPO DE ESTABLECIMEINTO CAT9]
  useObTipoEstablecimeintoQuery,
  //---[DEPARTAMENTO CAT12]
  useObtDepartamentoQuery,
  //---[MUNICIPIO CAT13]
  useObtMunicipioQuery,
  //---[PuntoVenta]
  useObtPuntoVentaQuery,
  //---[Emp_Cat019]--- utilizada en menu
  useObtEmp_Cat019Query,
  //---[CAT019]--- utilizada en menu
  useObtCat019Query,
  //---[CAT015]
  useObtCat015Query,
  //---[EmpresaImpuestos]
  useObtEmpresaImpuestosQuery,
  //---[DTE]
  useDteQuery,
} = GenericApi;
