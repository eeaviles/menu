import { React } from "react";
//-----[ REDUX TOOLKIT IMPORT ]-----
import { useSelector } from "react-redux";
import { principalSelector } from "../redux/slices/PrincipalSlice";

//-----[ CARGAR ARCHIVOS PARA ADMINISTARCIÓN ]-----
import Home from "./menuopcion/Home";
//---[PERFILES]
import VistaPrincipalEmpresa from "./menuopcion/PerfilEmpresa/VistaPrincipalEmpresa";
//---[Empresas]
import AgregarEmpresas from "./menuopcion/AgregarClientePorveedor";

//-----[CARGAR ARCHIVOS PARA PUNTO DE VENTAS]
import PuntoVistaVenta from "./VistaPuntoVenta/VistaPuntoVenta";
import MenuCrearMenu from "./VistaPuntoVenta/MenuCrearMenu";
import ReporteOrdenes from "./VistaPuntoVenta/ReporteOrdenes";
import ListadoMenus from "./VistaPuntoVenta/ListadoMenus";

export default function PrincipalLayouts() {//console.log("DESDE PRINCIPAL LAYOUT");
  //---[REDUX TOOLKIT]
  const { menuopcion } = useSelector(principalSelector);  
  console.log ("menuopcion", menuopcion);

  return (
    <>
      {
        {
          Home: <Home />,
          VistaPrincipalEmpresa: <VistaPrincipalEmpresa />,
          AgregarEmpresas: <AgregarEmpresas />,
          PuntoVistaVenta: <PuntoVistaVenta />,
          MenuCrearMenu: <MenuCrearMenu/>,
          ReporteOrdenes: <ReporteOrdenes />,
          ListadoMenus: <ListadoMenus />,
        }[menuopcion]
      }
    </>
  );
}
