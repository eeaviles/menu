import { createSlice } from "@reduxjs/toolkit";

export const AlpaSlice = createSlice({
  name: "alpa",

  initialState: {
    //---[GENERICO]
    accion: {
      listar: "LI",
      listarxid: "LXID",
      actualizar: "AC",
      agregar: "AG",
      listarxidex: "LXIDEX",
      listarxidtrex: "LXIDTREX",
      listarforselect: "LIFS",
      listarxfecha: "LXFECH",
    },    
    //---[ IMPUETOS ]
    impuestoscam: { controller: "ImpuestosController" },
    //---[ EMPRESAIMPUESTOS ]
    empresaimpuestoscam: { controller: "EmpresaImpuestosController" },
    //---[ TIPO DE ESTABLECIMEINTO CAT09 ]
    cat9cam: { controller: "Cat9Controller" },
    //---[ DEPARTAMENTO CAT12 ]
    cat12cam: { controller: "Cat12Controller" },
    //---[ MUNICIPIO CAT13 ]
    cat13cam: { controller: "Cat13Controller" },
    //---[PUNTOS DE VENTA]
    puntodeventacam: { controller: "PuntoVentaController" },
    //---[ACTIVIDA ECONOICA ]
    cat019cam: { controller: "Cat019Controller" },
  },
  reducers: {},
  extraReducers: {},
});

export const alpaSelector = (state) => state.alpa; // alpareducer, se registra en store
//export const {clearStateListarUsuarios, clearStateAgregarUsuarios, clearStateActualizarUsuarios, clearStateBuscarUsuariosXID,} = UsuarioSlice.actions;
export default AlpaSlice.reducer; // alpareducer, se registra en store
