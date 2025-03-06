import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/LoginSlice"; // Importar un reducer
import { LoginApi } from "./servicio/apiLogin"; // Importar la API

export const store = configureStore({
  reducer: {
    login: loginReducer, // Registrar el reducer en el store
    [LoginApi.reducerPath]: LoginApi.reducer, // Registrar la API en el store Login
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginApi.middleware), // Agregar el middleware de la API
});

export default store;
