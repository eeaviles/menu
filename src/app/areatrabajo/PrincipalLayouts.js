import { React } from "react";
//-----[ REDUX TOOLKIT IMPORT ]-----
import { useSelector } from "react-redux";
import { principalSelector } from "../../features/Slices/PrincipalSlice";
//-----[ CARGAR ARCHIVOS ]-----
import Home from "./Home";
import ListarUsuarios from "./menu/ListarUsuarios";
import ListarPersonas from "./menu/ListarPersonas";
import ListarEmpleados from "./menu/ListarEmpleados";
import AgregarPersonaNatural from "./menu/AgregarPersonaNatural";
import MenuPersona from "./menuLateralPersona/MenuPersona";
import AgregarEmpresas from "./menu/AgregarEmpresas";
import ListarEmpresas from "./menu/ListarEmpresas";
import MenuEmpresa from "./menuLateralEmpresa/MenuEmpresa";
import ListarOrdenCompra from "./menu/OrdenCompra/ListarOrdenCompra";
import IngresoOrdCompra from "./menu/OrdenCompra/IngresoOrdCompra";
//---[Inventario]
import MostrarInventario from "./menu/Inventario/MostrarInventario";
import RegistrarInventario from "./menu/Inventario/RegistrarInventario";
//---[Ventas]
import MostrarVentas from "./menu/ventas/MostrarVentas";
import ListarDTE from "./menu/Dte/ListarDTE";

export default function PrincipalLayouts() {//console.log("DESDE PRINCIPAL LAYOUT");
  //---[REDUX TOOLKIT]
  const { menuopcion } = useSelector(principalSelector);  

  return (
    <>
      {
        {
          Home: <Home />,
          AgregarPersonaNatural: <AgregarPersonaNatural />,
          ListarPersonas:  <ListarPersonas />,
          ListarUsuarios:  <ListarUsuarios />,
          ListarEmpleados: <ListarEmpleados />,
          MenuPersona: <MenuPersona />,
          AgregarEmpresas: <AgregarEmpresas />,
          ListarEmpresas: <ListarEmpresas />,
          MenuEmpresa: <MenuEmpresa />,          
          ListarOrdenCompra: <ListarOrdenCompra />,
          IngresoOrdCompra: <IngresoOrdCompra />,
          MostrarInventario: <MostrarInventario />,
          RegistrarInventario: <RegistrarInventario />,
          MostrarVentas: <MostrarVentas />,
          ListarDte:<ListarDTE />, 
        }[menuopcion]
      }
    </>
  );
}
