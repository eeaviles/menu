//----[IMPORT REACTJS]---------------------------------------------------
//import React from "react";


//----[IMPORT FILES]---------------------------------------------------
import Login from "./login/Login";
import Principal from "./areatrabajo/Principal";
import Pag404 from "./pages/Pag404";


//----[IMPORT REACT-ROUTER-DOM]---------------------------------------------------
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const useractivo = JSON.parse(localStorage.getItem("SESIONUSER")) || null;
  if (!useractivo) {
    return <Navigate to="/" replace />;
  }
  return <Principal />;
};

const router = createBrowserRouter(
  [
    { path: "/", Component: Login },
    { path: "/areatrabajo", Component: PrivateRoute },
    { path: "*", Component: Pag404 },
  ],
  {
    basename: "/menu/build",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
