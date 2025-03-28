import { createSlice } from "@reduxjs/toolkit";

export const principalSlice = createSlice({
  name: "principal",
  initialState: {
    menuopcion: "", //VISTA DE TRABAJO OCULTA, NO HAY VISTA POR DEFECTO AL INICIO
    perIDPselec: null, //utilizado en MenuPersona
    IDPEmpresaSelec: "", //utilizado en MenuEmpresa
    DATOS: null,
  },

  reducers: {
    clearMenuopcion: (state) => {
      state.menuopcion = null;
      return state;
    },

    fijardatos: (state, { payload }) => {
      //OJO YA NO SE OCUPA EN EDITRAPERSONANATURAL
      state.DATOS = payload;
      return state;
    },

    fijaropcion: (state, { payload }) => {
      state.menuopcion = payload;
      return state;
    },

    //---[PERSONA]
    fijarPerfilPersona: (state, { payload }) => {
      state.perIDPselec = payload;
      return state;
    },

    clearPerfilPersona: (state) => {
      state.perIDPselec = null;
      return state;
    },

    //---[EMPRESA]
    fijarPerfilEmpesa: (state, { payload }) => {
      state.IDPEmpresaSelec = payload;
      return state;
    },

    clearPerfilEmpresa: (state) => {
      state.IDPEmpresaSelec = null;
      return state;
    },
  },

  extraReducers: (builder) => {},
});

export const principalSelector = (state) => state.principal;
export const {
  clearMenuopcion,
  fijaropcion,
  fijarPerfilPersona,
  clearPerfilPersona,
  fijardatos,
  fijarPerfilEmpesa,
  clearPerfilEmpresa,
} = principalSlice.actions;
export default principalSlice.reducer;