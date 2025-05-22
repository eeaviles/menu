import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//-------------------------------------------------

// Determinar si estamos en local o en el servidor
const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

// Configurar la baseUrl dinámicamente
const baseUrl = isLocalhost
  ? "http://localhost/menu/backend/index.php" // Ruta local
  : "https://www.cafegarzan.com/menu/backend/index.php"; // Ruta servidor

//------------------------------------------------

export const GenericApi = createApi({
  reducerPath: "genericapi",

//---------------------------------------------------

  baseQuery: fetchBaseQuery({
    baseUrl, // Usar la baseUrl dinámica
  }),
  
//---------------------------------------------------

  refetchOnMountOrArgChange: true,

  tagTypes: [  
    "Empresas",
    "EmpresasN",
    "Areas",
    "Sucursales",
    "puestostrabajo",
    "Categorias",
    "Productos",
    "EmpresasContactos",
    "Clientes",
    "TipoEstablecimiento",
    "Departamento",
    "Municipio",
    "PuntoVenta",
    "Emp_Cat019",
    "Cat019",
    "Cat015",
    //----[UTILIZADOS EN PORY MENU]
    "ORDENES",
    "MENUS",
    "MENUSDETALLES",
    "DETALLESORDENES",
    "AREAS",
    "SUCURSALES",
    "PUESTOSTRABAJOS",
    "PERSONAS",
    "USUARIOS",
    "ROLES",
    "CATEGORIAS",
    "PRODUCTOS"
    ],

  endpoints: (build) => ({
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




    //----[ UTILIZADAS EN PROYECTO MENU ]-------------------------------------------------------------------------

    //---[ CATEGORIAS ]--------------------------------
    //---[GET-TODAS LAS CATEGORIAS]
      obtcategorias: build.query({
        query: (cam) => ({
          url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["CATEGORIAS"],
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
        invalidatesTags: ["CATEGORIAS"],
      }), 

    //---[ ORDENES ]-----------------------------------  

      //---[ GUARDAR ORDENES]-------------------------------
      ordenes: build.mutation({
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
        invalidatesTags: ["ORDENES"],
      }),   
      obtordenes: build.query({
        query: (cam) => ({
          url: `index.php?controller=${cam.controller}&accion=${cam.accion}&ID=${cam.ID}&FI=${cam.FI}&FF=${cam.FF}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["ORDENES"],
      }),   
      obtdetallesordenes: build.query({
        query: (cam) => ({
          url: `index.php?controller=${cam.controller}&accion=${cam.accion}&ID=${cam.ID}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["DETALLESORDENES"],
      }),
    
    //---[ MENUS ]-----------------------------------  

      //---[ Gaurdar Menús]---------------------------------
      menus: build.mutation({
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
        invalidatesTags: ["MENUS"],
      }),
      obtmenus: build.query({
        query: (cam) => ({
          url: `index.php?controller=${cam.controller}&accion=${cam.accion}&ID=${cam.ID}&FI=${cam.FI}&FF=${cam.FF}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["MENUS"],
      }),  

    //---[ MENUDETALLES ]-----------------------------
      obtmenudetalle: build.query({
        query: (cam) => ({
          url: `index.php?controller=${cam.controller}&accion=${cam.accion}&ID=${cam.ID}&FI=${cam.FI}&FF=${cam.FF}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["MENUS", "MENUSDETALLES"],
      }),
      menudetalle: build.mutation({
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
        invalidatesTags: ["MENUSDETALLES"],
      }),

    //---[ PRODUCTOS]------------------------------
      obtproductos: build.query({
        query: (cam) => ({
          url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["PRODUCTOS"],
      }),
      obtproductosxid: build.query({
        query: (cam) => ({
          url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&TIPOCAT=${cam.TIPOCAT}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["PRODUCTOS"],
      }),

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
        invalidatesTags: ["PRODUCTOS"],
      }),

      envproductosfile: build.mutation({
        query: (formData) => ({
          url: "index.php",
          method: "POST",
          body: formData, // Enviar FormData directamente
          credentials: "include",
        }),
        invalidatesTags: ["PRODUCTOS"],
      }),

    //---[SUCURSALES]----------------------------------
      obtsucursales: build.query({
        query: (cam) => ({
          url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["SUCURSALES"],
      }),

    //---[AREAS]---------------------------------------
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
        invalidatesTags: ["AREAS", "SUCURSALES"],
      }),
      obtareas: build.query({
        query: (cam) => ({
          url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&IDPF=${cam.IDPF}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["AREAS"],
      }),
    
    //---[PUESTOSTRABAJOS]----------------------------------
      obtptbjo: build.query({
        query: (cam) => ({
          url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&IDPF=${cam.IDPF}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["PUESTOSTRABAJOS"],
      }),
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
        invalidatesTags: ["PUESTOSTRABAJOS"],
      }),

    //-----[ PERSONAS ]----------------------------------------
      obtperonas: build.query({
        query: (cam) => ({
          url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["PERSONAS"],
      }),        
      obtpersonasxid: build.query({
        query: (cam) => ({
          url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["PERSONAS"],
      }),        
      mutpersonas: build.mutation({
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
        invalidatesTags: ["PERSONAS"],
      }),

    //---[ USUARIOS ]--------------------------------------------
      obtusuarios: build.query({
        query: (cam) => ({
          url: `index.php?controller=${cam.controller}&accion=${cam.accion}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["USUARIOS"],
      }),        
      mutusuarios: build.mutation({
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
        invalidatesTags: ["USUARIOS"],
      }),

    //---[ ROLES ]----------------------------------------------
      obtroles: build.query({
        query: (cam) => ({
          url: `index.php?ID=${cam.ID}&controller=${cam.controller}&accion=${cam.accion}&IDPF=${cam.IDPF}`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["ROLES"],
      }),        
      mutroles: build.mutation({
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
        invalidatesTags: ["ROLES"],
      }),
  }),
});

export const {
  //---[EMPRESAS]
  useObtempQuery,
  useObtempxidQuery,
  useObtempxidNQuery,
  useObtempprincipalQuery,
  useEnvrempMutation,

  //---[PROVEEDORES]
  useObtproveedoresxidQuery,
  useEnvproveedoresMutation,

  //---[EMPRESAS CONTACTOS]
  useObtempcontQuery,
 
  //---[ CLIENTES ]
  useObtclienteQuery,
  useEnvclienteMutation,


  //---[UTILIZADOS EN MUNU]----------------------------------------------------
  
    //---[TIPO DE ESTABLECIMEINTO CAT9]
      useObTipoEstablecimeintoQuery,

    //---[DEPARTAMENTO CAT12]
      useObtDepartamentoQuery,

    //---[MUNICIPIO CAT13]
      useObtMunicipioQuery,

    //---[PuntoVenta]
      useObtPuntoVentaQuery,

    //---[Emp_Cat019]--- 
      useObtEmp_Cat019Query,

    //---[CAT019]--- 
      useObtCat019Query,

    //---[CATEGORIAS]
      useObtcategoriasQuery,
      useEnvcategoriasMutation,
      useLazyObtcategoriasQuery,

    //---[ ORDENES DE MENU ]
      useObtordenesQuery,
      useLazyObtordenesQuery,
      useOrdenesMutation,

    //---[ MENUS ]
      useMenusMutation,
      useObtmenusQuery,
      useLazyObtmenusQuery,

    //---[MENUDETALLES]
      useObtmenudetalleQuery,
      useMenudetalleMutation,

    //---[ DETALLESORDENES ]
      useObtdetallesordenesQuery,

    //---[SUCURSALES]
      useObtsucursalesQuery,
      useEnvsucursalesMutation,

    //---[AREAS]
      useObtareasQuery,
      useEnvareasMutation,
      useLazyObtareasQuery,

    //---[PUESTOSTRABAJO]
      useObtptbjoQuery,
      useEnvobtptbjoMutation,
      useLazyObtptbjoQuery,

    //---[ PERSONAS ]
      useObtperonasQuery,
      useObtpersonasxidQuery,
      useMutpersonasMutation,  

    //---[ USUARIOS ]
      useObtusuariosQuery,
      useMutusuariosMutation,

    //---[ ROLES ]
      useObtrolesQuery, 
      useLazyObtrolesQuery,
      useMutrolesMutation,
    
    //---[ PRODUCTOS ]
      useObtproductosQuery,
      useObtproductosxidQuery,
      useEnvproductosMutation,
      useEnvproductosfileMutation,

} = GenericApi;
