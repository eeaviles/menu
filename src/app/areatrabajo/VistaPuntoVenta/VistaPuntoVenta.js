import { React, useState } from "react";
import { Row, Nav, Tab, Col } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import Iconoboton from "./Iconoboton";
import "../../css/PuntoVenta.css";  
import MenuDiario from "./MenuDiario";

const VistaPuntoVenta = () => {
  //---[REDUX]
  const [selectedItem, setSelectedItem] = useState(null); 
  const [activeKey, setActiveKey] = useState(null);  
  const imgsrc1 = "Plato_fuerte4.png";
  const imgsrc2 = "Plato_fuerte5.png";
  const imgsrc3 = "Bebidas_5.png";
  const imgsrc4 = "ensalada_5.png";
  const imgsrc5 = "postre.png";

  const handleItemClick = (key) => {
    setSelectedItem(key); // Actualiza el elemento seleccionado
    setActiveKey(key); // Cambia el Tab activo
  };

  return (
    <div>
        <div className="MenuPerfilPersonasTab">
          <Tab.Container 
          id="left-tabs-example" 
          activeKey={activeKey} 
          onSelect={(k) => setActiveKey(k)}
          >
            <Row>
              <>
                <Col className="MenuPerfilPersonasColizq mppImage2" xs={4} sm={4} md={4} lg={2} xl={2} >
                  <Nav variant="pills" className="flex-column centrar_nav">
                    
                    <Nav.Item style={{marginTop:"0px"}}>
                      <Nav.Link 
                      className={`Tabstitulo_catcomida nav-link2 ${selectedItem === "1" ? "selected" : ""}`}
                      eventKey="1" 
                      onClick={() => handleItemClick("1")}
                      >
                        <Iconoboton nombreimagen={imgsrc1} />
                        <div className="textoCategorias">Menú Diario</div>             
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{marginTop:"5px"}}>
                      <Nav.Link 
                      className={`Tabstitulo_catcomida nav-link2 ${selectedItem === "2" ? "selected" : ""}`}
                      eventKey="2"
                      onClick={() => handleItemClick("2")}                      
                      >
                        <Iconoboton nombreimagen={imgsrc2} />
                        <div className="textoCategorias">Plato Fuerte</div>           
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{marginTop:"5px"}}>
                    <Nav.Link 
                      className={`Tabstitulo_catcomida nav-link2 ${selectedItem === "3" ? "selected" : ""}`}
                      eventKey="3"
                      onClick={() => handleItemClick("3")}
                      >
                        <Iconoboton nombreimagen={imgsrc3} />
                        <div className="textoCategorias">Bebidas</div>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{marginTop:"5px"}}>
                      <Nav.Link className={`Tabstitulo_catcomida nav-link2 ${selectedItem === "4" ? "selected" : ""}`}
                      eventKey="4"
                      onClick={() => handleItemClick("4")}>
                        <Iconoboton nombreimagen={imgsrc4} />
                        <div className="textoCategorias">Ensaldas</div>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{marginTop:"5px"}}>
                      <Nav.Link className={`Tabstitulo_catcomida nav-link2 ${selectedItem === "5" ? "selected" : ""}`}
                      eventKey="5"
                      onClick={() => handleItemClick("5")}>
                        <Iconoboton nombreimagen={imgsrc5} />
                        <div className="textoCategorias">Postres</div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>

                <Col xs={6} sm={8} md={8} lg={10} xl={10}>
                  <>
                    <Tab.Content>
                      <Tab.Pane eventKey="1"><MenuDiario /></Tab.Pane>
                      <Tab.Pane eventKey="2"></Tab.Pane>
                      <Tab.Pane eventKey="3"></Tab.Pane>
                      <Tab.Pane eventKey="4"></Tab.Pane>
                      <Tab.Pane eventKey="5"></Tab.Pane>
                    </Tab.Content>
                    <div className="container mx-auto contenedor ">
                    <div className="Titulo">ORDEN A PROCESAR</div>
                    </div>  
                  </>
                </Col>
              </>
            </Row>
          </Tab.Container>
        </div>
      <Toaster />
    </div>
  );
};

export default VistaPuntoVenta;
