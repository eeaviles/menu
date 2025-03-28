import { React, useState, useEffect } from "react";
import { Navbar, Nav, Image, NavDropdown, Offcanvas, Button } from "react-bootstrap";

//---[ REDUX ]
import { useDispatch } from "react-redux";
import { fijaropcion, fijarPerfilEmpesa } from "../redux/slices/PrincipalSlice";
import { useObtempxidQuery } from "../redux/servicio/GenericApi";

//------------
const Menu = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false); //Para OffCanvas
  const handleClose = () => setShow(false); //Para OffCanvas
  const handleShow = () => setShow(true); //Para OffCanvas
  const useractivo = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;
  const [perfilempresa, setPerfilempresa] = useState(null);

  //let IDPEmpresaSelec = null;

  let cam = {
    ID: 1, //listar directamente la empresa de inicio
    controller: "EmpresasController",
    accion: "LIXXID",
  };
  const { data: dataperfilempresa, isSuccess } = useObtempxidQuery(cam);

   useEffect(() => {
     function setperfemp(e) {
       if (dataperfilempresa) {
         e = dataperfilempresa["IDEMPRE"]; //si existe empresa principal
       } else {
         e = '1';// no exite empresa principal
       }
       console.log(e);
       return e;
     }
     setPerfilempresa((e) => setperfemp(e));
     dispatch(fijarPerfilEmpesa(perfilempresa));
   }, [isSuccess, dataperfilempresa, dispatch, perfilempresa]);



  function selecionMenu(menuelegido) {
    switch (menuelegido) {
      case "Tecnico":
        return <></>;

      case "Administrador":
        return (
          <>
            <div
              className="D_cua"
              onClick={() => {
                dispatch(fijaropcion("VistaPrincipalEmpresa"));
                handleClose();
              }}
            >
              <Image
                src={process.env.PUBLIC_URL + "/img/iconos/home_black_24dp.svg"}
                width="22"
                height="22"
                alt=""
              />
              <div className="D_sp">
                <span> Inicio</span>
              </div>
            </div>

            <div className="D_cua">
              <Image
                src={
                  process.env.PUBLIC_URL +
                  "/img/iconos/location_city_black_24dp.svg"
                }
                width="22"
                height="22"
                alt=""
              />
              <NavDropdown title="Empresas" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("AgregarEmpresas"));
                    handleClose(); //GUARDAR CANVAS DESPUES DE SELECCIONAR OPCIÓN
                  }}
                >
                  Agregar Empresas
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListarEmpresas"));
                    handleClose(); //GUARDAR CANVAS DESPUES DE SELECCIONAR OPCIÓN
                  }}
                >
                  Listar Empresas
                </NavDropdown.Item>
              </NavDropdown>
            </div>

            <div className="D_cua">
              <Image
                src={
                  process.env.PUBLIC_URL + "/img/iconos/person_black_24dp.svg"
                }
                width="22"
                height="22"
                alt=""
              />
              <NavDropdown title="Personas" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("AgregarPersonaNatural"));
                    handleClose();
                  }}
                >
                  Agregar Persona
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListarPersonas"));
                    handleClose();
                  }}
                >
                  Listar Personas
                </NavDropdown.Item>

                <hr />
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListarUsuarios"));
                    handleClose();
                  }}
                >
                  Listar Usuarios
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListarEmpleados"));
                    handleClose();
                  }}
                >
                  Listar Empleados
                </NavDropdown.Item>
              </NavDropdown>
            </div>

            <div className="D_cua">
              <Image
                width="22"
                height="22"
                src={
                  process.env.PUBLIC_URL +
                  "/img/iconos/description_black_24dp.svg"
                }
              />
              <NavDropdown title="Ventas" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("MostrarVentas"));
                    handleClose();
                  }}
                >
                  Listar Ventas
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </>
        );

      default:
        console.log("Menú soliictado no encontrado");
        return <></>;
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" className="Nav" style={{ justifyContent: "flex-end" }} >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {
              //-----[SELECCION DEL BLOQUE DE CÓDIGO DEL MENÚ CORRESPONDIENTE ]-----
              selecionMenu(useractivo.ROL)
            }
          </Nav>
        </Navbar.Collapse>

        <Button id="botonmenuasociado" variant="reorder" onClick={handleShow}>
          <img src="/img/iconos/reorder.svg" alt="Menu Lateral" title="Menu Lateral" />
        </Button>

      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="offcanvaheader">
          <Offcanvas.Title className="offcanvaimg">
            <img
              alt=""
              src={process.env.PUBLIC_URL + "/servapp/build/img/logos/SERVIFACO_256x62.png"}
              width="256"
              height="61"
              className="d-inline-block "
            />
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="offcanvabody">
          <Nav className="justify-content-start flex-column pe-3">
            {
              //-----[SELECCION DEL BLOQUE DE CÓDIGO DEL MENÚ CORRESPONDIENTE ]-----
              selecionMenu("Administrador", useractivo.ROL)
            }
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
}

export default Menu