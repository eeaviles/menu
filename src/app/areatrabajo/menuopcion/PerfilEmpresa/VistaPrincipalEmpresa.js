import { React, useEffect, useState } from "react";
import { Row, Nav, Tab, Col, Image, Accordion, Card } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

//---[ REDUX ]
import { useSelector } from "react-redux";
import { principalSelector } from "../../../redux/slices/PrincipalSlice";
import { useObtempxidQuery } from "../../../redux/servicio/GenericApi";
import ActualizarEmpresa from "./ActualizarEmpresa";
import ListaSucursales from "./sucursales/ListaSucursales";
import Areas from "./Areas/Areas";
import PuestosTrabajos from "./PuestosTrabajos/PuestosTrabajos";
import Personas from "./Personas/Personas";
import Empleados from "./Empleados/Empleados";
import Usuarios from "./Usuarios/Usuarios";
import Categorias from "./Categorias/Categorias";
import Productos from "./Productos/Productos";
//---[ CSS ]
import "../../../css/Menu.css";  


const VistaPrincipalEmpresa = () => {
  //---[REDUX]

  const [activeKey, setActiveKey] = useState(null);  
  const [perfilempresa, setPerfilempresa] = useState(null);
  const { IDPEmpresaSelec } = useSelector(principalSelector); //TOMAR EL VALOR DELPERFIL DE EMPLRESA SELECCIONADO

  //---[CONSTANTES]
  let cam = {
    ID: IDPEmpresaSelec,
    controller: "EmpresasController",
    accion: "LIXXID",
  };
  const { data: dataperfilempresa, isSuccess } = useObtempxidQuery(cam);// Esta la empresa seleccionada en la BD?

  useEffect(() => {
    function setperfemp(e) {
      if (dataperfilempresa) {
        e = dataperfilempresa["IDEMPRE"];
      } else {
        e = IDPEmpresaSelec;
      }
      return e;
    }    
    setPerfilempresa((e) => setperfemp(e));
  }, [isSuccess, IDPEmpresaSelec, dataperfilempresa]);


  return (
    <>
      {isSuccess !== false && (
        <div>
          <div className="MenuPerfilPersonasTab">
            <Tab.Container id="left-tabs-example" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} >
              <Row>
                {perfilempresa === '1'  ?(
                  <>
                    <Col className="MenuPerfilPersonasColizq" xs={4} sm={4} md={4} lg={2} xl={2} >
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Administrar</Accordion.Header>
                          <Accordion.Body>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item>
                                <Nav.Link name="Perfil" id="Perfil" className="Tabstitulo" eventKey="1" >
                                  <div>Perfil</div>
                                </Nav.Link>
                              </Nav.Item>

                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="2">
                                  <div>Sucursales</div>
                                </Nav.Link>
                              </Nav.Item>

                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="3">
                                  <div>Areas</div>
                                </Nav.Link>
                              </Nav.Item>

                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="4">
                                  <div>Puestos de Trabajo</div>
                                </Nav.Link>
                              </Nav.Item>
                              <hr />
                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="5">
                                  <div>Personas</div>
                                </Nav.Link>
                              </Nav.Item>

                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="6">
                                  <div>Empleados</div>
                                </Nav.Link>
                              </Nav.Item>
                             
                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="7">
                                  <div>Usuarios</div>
                                </Nav.Link>
                              </Nav.Item>                                                       
                            </Nav>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>

                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Opciones del Ménu</Accordion.Header>
                          <Accordion.Body>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item style={{ padding: "5px" }}>
                                <Nav.Link name="Perfil" id="Perfil" className="Tabstitulo" eventKey="9" >
                                  <div>Categorías</div>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item style={{ padding: "5px" }}>
                                <Nav.Link className="Tabstitulo" eventKey="10">
                                  <div>Productos</div>
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Col>

                    <Col xs={6} sm={8} md={8} lg={10} xl={10}>
                      <Tab.Content>
                        <Tab.Pane eventKey="1"> <ActualizarEmpresa dataperfilempresa={dataperfilempresa} IDPEmpresaSelec={IDPEmpresaSelec} /> </Tab.Pane>
                        <Tab.Pane eventKey="2"><ListaSucursales IDPEmpresaSelec={IDPEmpresaSelec}  /></Tab.Pane>
                        <Tab.Pane eventKey="3"><Areas IDPEmpresaSelec={IDPEmpresaSelec} /></Tab.Pane>
                        <Tab.Pane eventKey="4"><PuestosTrabajos IDPEmpresaSelec={IDPEmpresaSelec} /></Tab.Pane>
                        <Tab.Pane eventKey="5"><Personas IDPEmpresaSelec={IDPEmpresaSelec}  /></Tab.Pane>
                        <Tab.Pane eventKey="6"><Empleados IDPEmpresaSelec={IDPEmpresaSelec}  /></Tab.Pane>
                        <Tab.Pane eventKey="7"><Usuarios IDPEmpresaSelec={IDPEmpresaSelec}  /></Tab.Pane>
                        <Tab.Pane eventKey="8"></Tab.Pane>
                        <Tab.Pane eventKey="9"><Categorias IDPEmpresaSelec={IDPEmpresaSelec} /></Tab.Pane>
                        <Tab.Pane eventKey="10"><Productos IDPEmpresaSelec={IDPEmpresaSelec} /></Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col className="MenuPerfilPersonasColizq" xs={4} sm={4}  md={4} lg={2} xl={2} >
                      <Card className="mppImage">
                        <div className="d-flex justify-content-center">
                          <Image
                            src="/img/logos/Menu_512x512.png"
                            width="80"
                            height="80"
                            className="fotoperfil"
                            roundedCircle
                          />
                        </div>
                        <Card.Body>
                          <Card.Text as="div">
                            <div className="mppTexto"></div>
                            <div className="mppTexto"></div>
                          </Card.Text>
                        </Card.Body>
                      </Card>

                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Administrar</Accordion.Header>
                          <Accordion.Body>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item>
                                <Nav.Link name="Perfil2" id="Perfil2" className="Tabstitulo" eventKey="1"  >
                                  <div>Perfil</div>
                                </Nav.Link>
                              </Nav.Item>

                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="2">
                                  <div>Sucursales</div>
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>

                      <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Productos</Accordion.Header>
                          <Accordion.Body>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item>
                                <Nav.Link name="Perfil" id="Perfil" className="Tabstitulo" eventKey="3" >
                                  <div>Marcas</div>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link className="Tabstitulo" eventKey="4">
                                  <div> Productos</div>
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Col>

                    <Col xs={6} sm={8} md={8} lg={10} xl={10}>
                      <Tab.Content>
                        <Tab.Pane eventKey="1"></Tab.Pane>
                        <Tab.Pane eventKey="2"></Tab.Pane>
                        <Tab.Pane eventKey="3"></Tab.Pane>
                        <Tab.Pane eventKey="4"></Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </>
                )}
              </Row>
            </Tab.Container>
          </div>
          <Toaster />
        </div>
      )}
    </>
  );


};

export default VistaPrincipalEmpresa;
