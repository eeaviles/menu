import {React, useState} from 'react'
import { Navbar, Nav, Image, NavDropdown, Offcanvas, Button } from "react-bootstrap";

//---[ REDUX ]
import { useDispatch } from "react-redux";
import { fijaropcion, fijarPerfilEmpesa } from "../redux/slices/PrincipalSlice";

//------------
const Menu = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false); //Para OffCanvas
  const handleClose = () => setShow(false); //Para OffCanvas
  const handleShow = () => setShow(true); //Para OffCanvas
  const useractivo = JSON.parse(localStorage.getItem("SESIONUSER")) || null;

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
                dispatch(fijaropcion("MenuEmpresa"));
                dispatch(fijarPerfilEmpesa(1));
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
                src={process.env.PUBLIC_URL + "/img/iconos/location_city_black_24dp.svg"}
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
                src={process.env.PUBLIC_URL + "/img/iconos/person_black_24dp.svg"}
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
                src={process.env.PUBLIC_URL + "/img/iconos/description_black_24dp.svg"}
                width="22"
                height="22"
              />
              <NavDropdown
                title="Ordenes de Compra"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListarOrdenCompra"));
                    handleClose();
                  }}
                >
                  Listar Ordenes de Compra
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("IngresoOrdCompra"));
                    handleClose();
                  }}
                >
                  Ingresar Orden de Compra
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("MostrarVentas"));
                    handleClose();
                  }}
                ></NavDropdown.Item>
              </NavDropdown>
            </div>

            <div className="D_cua">
              <Image
                width="22"
                height="22"
                src={process.env.PUBLIC_URL + "/img/iconos/inventory.svg"}
              />
              <NavDropdown title="Inventario" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("RegistrarInventario"));
                    handleClose();
                  }}
                >
                  Registrar Inventario
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("MostrarInventario"));
                    handleClose();
                  }}
                >
                  Mostrar Inventario
                </NavDropdown.Item>
              </NavDropdown>
            </div>

            <div className="D_cua">
              <Image
                width="22"
                height="22"
                src={ process.env.PUBLIC_URL + "/img/iconos/description_black_24dp.svg" }
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

            <div className="D_cua">
              <Image
                src={ process.env.PUBLIC_URL + "/img/iconos/summarize_black_24dp.svg" }
                width="22"
                height="22"
              />
              <NavDropdown title="Documentos" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(fijaropcion("ListarDte"));
                    handleClose();
                  }}
                >
                  DTE
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    //dispatch(clearStateBuscarIngresoXFechas());
                    //dispatch(fijaropcion("LiquidacionIngresos"));
                    handleClose();
                  }}
                >
                  Liquidación de Ingresos
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    //dispatch(clearStateListarTodosCreditos());// OJO CON ESTA LÍNEA
                    //dispatch(fijaropcion("ListarCreditos"));
                    handleClose();
                  }}
                >
                  Lista de Créditos
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    //dispatch(clearStateListaPersonasmora());
                    //dispatch(fijaropcion("BuscarReporte"));
                    handleClose();
                  }}
                >
                  Próximas Cuotas a Pagar
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
          <img
            src="/img/iconos/reorder.svg"
            alt="Menu Lateral"
            title="Menu Lateral"
          />
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