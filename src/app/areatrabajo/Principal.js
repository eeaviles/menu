
//----[IMPORT FILES]---------------------------------------------------
import Cabecera from "./Cabecera";
import Menu from "./Menu";
import PrincipalLayouts from "./PrincipalLayouts";

//--------------------------------------------------------------
const Principal = () => {
  //---[ VARIABLES Y CONSTANTES ]
  const useractivo = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null; // Cambiado a sessionStorage 
  if (!useractivo) {
    return <h2>Home (Espacio protegido: Usuario Autenticado es requerido)</h2>;
  }

  console.log(useractivo.ROL);

  return (
    <>
      {useractivo.ROL === "Usuario" ? (
        <>
          <Cabecera />
          <Menu />
          <PrincipalLayouts />
        </>
      ) : (
        <>
          <Cabecera />
          <Menu />
          <PrincipalLayouts />
        </>
      )}
    </>
  );

}
export default Principal;

