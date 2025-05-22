import { createSlice } from "@reduxjs/toolkit";

export const AlpaSlice = createSlice({
  name: "alpa",

  initialState: {  
    //ruta:"https://cafegarzan.com/menu/build/", //ruta web
    ruta:"http://localhost/menu/backend/index.php", //ruta local
  },

});

export const alpaSelector = (state) => state.alpa; // alpareducer, se registra en store
export default AlpaSlice.reducer; // alpareducer, se registra en store
