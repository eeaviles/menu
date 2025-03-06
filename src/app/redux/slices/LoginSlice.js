import { createSlice } from "@reduxjs/toolkit";

// Crear el slice para el login
export const loginSlice = createSlice({
  name: "login",

  // Estado inicial
  initialState: {
    login: { controller: "UsuariosController", accion: "login" },
    logout: { controller: "UsuariosController", accion: "loginout" },
    sesionObtener: { controller: "SessionController", accion: "obtener" },
  },

  // Reducers (vacío por ahora, pero preparado para futuras expansiones)
  reducers: {},

  // Extra reducers usando la notación de función
  extraReducers: (builder) => { },
  
});

// Selector para obtener el estado del login
export const loginSelector = (state) => state.login;

// Exportar el reducer del slice
export default loginSlice.reducer;
