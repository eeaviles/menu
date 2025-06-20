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
      case "Usuario":
        return (
          <>
            <div className="D_cua" onClick={() => { dispatch(fijaropcion("PuntoVistaVenta")); handleClose(); }}>
              <Image src={process.env.PUBLIC_URL + "/img/iconos/home_black_24dp.svg"}
                width="22" height="22" alt="" />
              <div className="D_sp">
                <span> Menú del día</span>
              </div>
            </div>

            <div className="D_cua">
              <Image width="22" height="22" src={ "./img/iconos/description_black_24dp.svg" }/>
              <NavDropdown title="Menú" id="collasible-nav-dropdown">

                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("MenuCrearMenu"));
                    handleClose();
                  }}
                > Crear Menú
                </NavDropdown.Item>
                
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListadoMenus"));
                    handleClose();
                  }}
                > Listado de Menús
                </NavDropdown.Item>
              
              </NavDropdown>
            </div>

            <div className="D_cua">
              <Image width="22" height="22" src={ "./img/iconos/description_black_24dp.svg" }/>
              <NavDropdown title="Ordenes" id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                      dispatch(fijaropcion("PuntoVistaVenta"));
                      handleClose();
                    }}
                  > Crear una  Orden
                  </NavDropdown.Item>                
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(fijaropcion("ReporteOrdenes"));
                      handleClose();
                    }}
                  > Listado de Ordenes
                  </NavDropdown.Item>
              </NavDropdown>
            </div>

          </>
        );

      case "Administrador":
        return (
          <>
            <div className="D_cua"
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
              <Image width="22" height="22" src={ "./img/iconos/description_black_24dp.svg" }/>
              <NavDropdown title="Menú" id="collasible-nav-dropdown">

                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("MenuCrearMenu"));
                    handleClose();
                  }}
                > Crear Menú
                </NavDropdown.Item>
                
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListadoMenus"));
                    handleClose();
                  }}
                > Listado de Menús
                </NavDropdown.Item>
              
              </NavDropdown>
            </div>

            <div className="D_cua">
              <Image width="22" height="22" src={ "./img/iconos/description_black_24dp.svg" }/>
              <NavDropdown title="Ordenes" id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                      dispatch(fijaropcion("PuntoVistaVenta"));
                      handleClose();
                    }}
                  > Crear una  Orden
                  </NavDropdown.Item>                
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(fijaropcion("ReporteOrdenes"));
                      handleClose();
                    }}
                  > Listado de Ordenes
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
      <Navbar collapseOnSelect expand="md" variant="dark" className="Nav" style={{ justifyContent: "flex-end" }} >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {
              //-----[SELECCION DEL BLOQUE DE CÓDIGO DEL MENÚ CORRESPONDIENTE ]-----
              selecionMenu(useractivo.ROL)
            }
          </Nav>
        </Navbar.Collapse>

        <Button id="botonmenuasociado" variant="reorder" onClick={handleShow}>
          <img src="./img/iconos/reorder.svg" alt="Menu Lateral" title="Menu Lateral" />
        </Button>

      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="offcanvaheader">
          <Offcanvas.Title className="offcanvaimg">
            <img
              alt=""
              src="./img/logos/Menu_64x64.png"
              width="64"
              height="64"
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