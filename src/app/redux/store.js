import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/LoginSlice"; // Importar un reducer
import principalReducer from "./slices/PrincipalSlice"; // Importar un reducer
import { LoginApi } from "./servicio/apiLogin"; // Importar la API
import { GenericApi } from "./servicio/GenericApi";

export const store = configureStore({
  reducer: {
    login: loginReducer, // Registrar el reducer en el store
    principal: principalReducer,
    [LoginApi.reducerPath]: LoginApi.reducer, // Registrar la API en el store Login
    [GenericApi.reducerPath]: GenericApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginApi.middleware, GenericApi.middleware), // Agregar el middleware de la API
});

export default store;
