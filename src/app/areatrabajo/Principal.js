
//----[IMPORT FILES]---------------------------------------------------
import Cabecera from "./Cabecera";
import Menu from "./Menu";
//import PrincipalLayouts from "./PrincipalLayouts";

//--------------------------------------------------------------
const Principal = () => {
  //---[ VARIABLES Y CONSTANTES ]
  const useractivo = JSON.parse(localStorage.getItem("SESIONUSER")) || null;  if (!useractivo) {
    return <h2>Home (Espacio protegido: Usuario Autenticado es requerido)</h2>;
  }

  return (
    <>
      <Cabecera />
      <Menu />
    </>
  );

}
export default Principal;

