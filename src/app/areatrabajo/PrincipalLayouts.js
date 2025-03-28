import { React } from "react";
//-----[ REDUX TOOLKIT IMPORT ]-----
import { useSelector } from "react-redux";
import { principalSelector } from "../redux/slices/PrincipalSlice";
//-----[ CARGAR ARCHIVOS ]-----
import Home from "./menuopcion/Home";
//---[PERFILES]
import VistaPrincipalEmpresa from "./menuopcion/PerfilEmpresa/VistaPrincipalEmpresa";
//---[Empresas]
import AgregarEmpresas from "./menuopcion/AgregarClientePorveedor";
//import ListarEmpresas from "./menu/ListarEmpresas";

/*
//---[Personas]
import AgregarPersonaNatural from "./menu/AgregarPersonaNatural";
import ListarUsuarios from "./menu/ListarUsuarios";
import ListarPersonas from "./menu/ListarPersonas";

//---[Ventas]
import MostrarVentas from "./menu/ventas/MostrarVentas";
import ListarDTE from "./menu/Dte/ListarDTE";

//---[PERFILES]
import MenuPersona from "./menuLateralPersona/MenuPersona";
import MenuEmpresa from "./menuLateralEmpresa/MenuEmpresa";
*/


export default function PrincipalLayouts() {//console.log("DESDE PRINCIPAL LAYOUT");
  //---[REDUX TOOLKIT]
  const { menuopcion } = useSelector(principalSelector);  

  return (
    <>
      {
        {
          Home: <Home />,
          VistaPrincipalEmpresa: <VistaPrincipalEmpresa />,
          AgregarEmpresas: <AgregarEmpresas />,
          /*
          AgregarPersonaNatural: <AgregarPersonaNatural />,
          ListarPersonas:  <ListarPersonas />,
          ListarUsuarios:  <ListarUsuarios />,
          ListarEmpleados: <ListarEmpleados />,
          MenuPersona: <MenuPersona />,          
          ListarEmpresas: <ListarEmpresas />,
          MenuEmpresa: <MenuEmpresa />,          
          ListarOrdenCompra: <ListarOrdenCompra />,
          IngresoOrdCompra: <IngresoOrdCompra />,
          MostrarInventario: <MostrarInventario />,
          RegistrarInventario: <RegistrarInventario />,
          MostrarVentas: <MostrarVentas />,
          ListarDte:<ListarDTE />, 
*/
        }[menuopcion]
      }
    </>
  );
}
