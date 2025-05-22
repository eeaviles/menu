import { React, useState, useEffect  } from "react";
import { Row, Nav, Tab, Col, Table, Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import "../../css/PuntoVenta.css";  
import MenuProdXCat from "./MenuProdXCat";
import { useObtcategoriasQuery, useMenusMutation  } from "../../redux/servicio/GenericApi";

const MenuCrearMenu = () => {
  
  //---[ USESTATE]---
    const [selectedItem, setSelectedItem] = useState(2); 
    const [activeKey, setActiveKey] = useState(2);   
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [nombreMenu, setNombreMenu] = useState(""); // Estado para el estado de la orden
    const [comentariomenu, setComentariomenu] = useState(''); // Estado para el comentario del menú
    const [fechaProgramada, setFechaProgramada] = useState(""); // Estado para el estado de la orden
    const [obtcategoriascam, setObtcategoriascam] = useState(null); // Estado para las categorías
    const [menuscam, setMenuscam] = useState(null); // Estado para las órdenes
  
  //---[ Obtener SESIONUSER desde sessionStorage ]
    const SESIONUSER = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;
    const IDUSER = SESIONUSER?.IDUSER; //---[ Capturar IDUSER ]

  //---[QUERY MUTACION: GUARDAR ORDENES ]---
    const [enviardata, { data: R_menus, isSuccess:isR_menus }] = useMenusMutation();

  //---[ CAM PARA OBTENER TODAS LAS CATEGORÍAS ]---    
    useEffect(() => {  
      setObtcategoriascam({//---[ TODAS LAS ATEGORIAS ]
        controller: "CategoriasController",
        accion: "LI",
      });
    }, []);
    
  //---[ CAM PARA GUARDAR MENUS ]
    useEffect(() => {  
      setMenuscam({
          controller: "MenuController",
          accion: "AG",
        });
    }, []);

  //---[ MENSAJE DE MUTACIÓN y REINICIO DE PRODUCTOS SELECCIONADOS ]---
    useEffect(() => {
      if (isR_menus) {
        if (R_menus) {
          toast(R_menus.E, {
            duration: 4000,
            position: "top-center",
            className: "toaststyle",
          });
          setProductosSeleccionados([]);
        }
      }
    }, [isR_menus, R_menus]);
  

  //---[ QUERY: OBTENER CATEGORÍAS ]----
      const { data: ListaCategorias, isSuccess: isListaCategorias} = useObtcategoriasQuery(obtcategoriascam,{ skip: !obtcategoriascam });

      const handleItemClick = (key) => {
        setSelectedItem(key); // Actualiza el elemento seleccionado
        setActiveKey(key); // Cambia el Tab activo
      };

  //---[ AGREGAR PRODUCTO SELECCIONADO AL OBEJETO DE SALIDA ]---
      const agregarProducto = (producto) => {
        setProductosSeleccionados((prev) => {
          const nuevoEstado = [...prev, { ...producto, descuento: 0, cantidad: 1  }]; 
          return nuevoEstado;
        });
      };

  //---[ ACTUALIZAR EL VALOR DE LA CANTIDAD CON EL VALOR QUE PROVIENE DE SU INPUNT ]---
    const actualizar = (index, name, valor) => {
      setProductosSeleccionados((prev) => {
        const nuevoEstado = [...prev];
        nuevoEstado[index][name] = valor === "" || valor.endsWith(".") ? valor : parseFloat(valor) || 0;
        return nuevoEstado;
      });
    };
    
  //---[ ELIMINAR PRODUCTO SELECCIONADO DEL OBJETO DE SALIDA ]---
    const borrarRegistro = (index) => {
      setProductosSeleccionados((prev) => prev.filter((_, i) => i !== index));
    };

  //---[ ELIMINAR TODAS LAS PROPIEDADES DEL OBJETO DE SALIDA ]---
    const borrarTodosRegistros = () => {
      setProductosSeleccionados([]);
    };

  //---[ MOSTRAR MENSAJES DE CARGA SI LAS CATEGORÍAS NO ESTAN DISPONIBLES ]---
    if (!isListaCategorias) {
      return (
        <div className="container mx-auto contenedor">
          <div className="Titulo">Cargando categorías...</div>
        </div>
      );
    }

    //-----[ ENVIO DE MENU A LA API ]-----  
    const onSubmit = (e) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      e.stopPropagation();
      // Validar si productosSeleccionados está vacío
      if (!productosSeleccionados || productosSeleccionados.length === 0) {
        toast.error("No hay productos seleccionados para guardar la orden.", {
          duration: 4000,
          position: "top-center",
          className: "toaststyle",
        });
        return; // Salir de la función si productosSeleccionados está vacío
      }

      // Validar si los campos requeridos están completos
      if (!nombreMenu || !fechaProgramada) {
        toast.error("Por favor, completa todos los campos requeridos.", {
          duration: 4000,
          position: "top-center",
          className: "toaststyle",
        });
        return;
      }

      let enviardataApi = {
        ...menuscam,
        PRODSEL: productosSeleccionados,
        NMENU:nombreMenu,
        FPROG:fechaProgramada,
        IDUSER: IDUSER,
        COMMENU:comentariomenu,
      };
      enviardata(enviardataApi);
      toast.remove();
    }

    const obtenerFechaMinimaLocal = () => {
      const hoy = new Date();
      const anio = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses comienzan en 0
      const dia = String(hoy.getDate()).padStart(2, "0");
      return `${anio}-${mes}-${dia}`;
    }

   return (
    <div>
        <div className="MenuPerfilPersonasTab">
          <Tab.Container  id="left-tabs-example"  activeKey={activeKey}  onSelect={(k) => setActiveKey(k)} >
          <Row>
            <>
              <Col name="colizq" className="MenuPerfilPersonasColizq mppImage2 col-equal-height" xs={4} sm={4} md={4} lg={2} xl={2}>
                <div className="d-flex justify-content-center">
                  <div className="textoCategorias" style={{ fontWeight: 'bold', lineHeight: 4 }}>CREAR MENÚ</div>
                </div>
                <Nav variant="pills" className="flex-column d-flex justify-content-center"> 
                  {ListaCategorias.map((categoria) => (
                    <Nav.Item key={categoria.IDCAT} className="text-center flex-fill" style={{"--bs-nav-link-padding-y": "1rem"}} > 
                      <Nav.Link 
                        className={`Tabstitulo_catcomida nav-link2 ${selectedItem === categoria.IDCAT? "selected" : ""}`}
                        eventKey={categoria.IDCAT}
                        onClick={() => handleItemClick(categoria.IDCAT)}
                      >                        
                        <div className="textoCategorias">{categoria.NOMBRECAT}</div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}

                </Nav>
              </Col>

              <Col name="colder" className="col-equal-height" xs={6} sm={8} md={8} lg={10} xl={10}>
                  
                <Tab.Content name="Tab1" className="justify-content-start w-100 align-items-start ">
                  {ListaCategorias.map((categoria) => (             
                    <Tab.Pane key={categoria.IDCAT} eventKey={categoria.IDCAT}>                          
                      <MenuProdXCat
                      IDCategoria={categoria.IDCAT} 
                      NombreCategoria={categoria.NOMBRECAT}              
                      onProductoSeleccionado={agregarProducto} // Pasar callback
                      TIPOCAT={categoria.TIPOCAT} // Pasar el tipo de categoría                         
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
  
                <br />
               <Form name="TotalForm" onSubmit={onSubmit} >
                  <div name="divintermedio" className="contenedor d-flex align-items-center gap-3 p-2">
                    
                      <Form.Group controlId="NMENU" className="me-3">
                        <Form.Label className="ATBJformLabel">Nombre del menú</Form.Label>
                        <Form.Control
                          required
                          as="input"
                          type="text"
                          name="NMENU"
                          className="ATBJFormInput W-auto"
                          value={nombreMenu} 
                          onChange={(e) => {setNombreMenu(e.target.value);
                          }} // Actualizar el estado
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="FPROG" className="me-3">
                        <Form.Label className="ATBJformLabel">Programar Fecha:</Form.Label>
                        <Form.Control
                          required
                          as="input"
                          type="date"
                          min={obtenerFechaMinimaLocal()}
                          name="FPROG"
                          className="ATBJFormInput W-auto"
                          value={fechaProgramada}
                          onChange={(e) => setFechaProgramada(e.target.value)} // Actualizar el estado
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="COMENU" className="me-3">
                          <Form.Label className="ATBJformLabel">Comentario adicional:</Form.Label>
                          <Form.Control
                            required
                            as="input"
                            type="text"
                            name="COMENU"                   
                            className="ATBJFormInput W-auto"
                            value={comentariomenu} 
                            onChange={(e) => {setComentariomenu(e.target.value)}} // Actualizar el estado
                          >
                          </Form.Control>
                      </Form.Group>                  

                      
                  </div>

                  <br />
                  <div name="menucrear" className="row-b contenedor ">                    
                      <div className="titulos_MenuCrearMenu">NUEVO MENÚ</div>
                      <div className="d-flex justify-content-end mb-2 ">
                        <Button className="color_tablabotones" size="sm" onClick={borrarTodosRegistros}>
                          <div >
                            <img
                              src="./img/iconos/borrartodo.svg" // Ruta de la imagen para "Borrar Todos"
                              alt="Borrar Todos"
                            />
                          </div>
                        </Button>
                      </div>
                      <Table striped bordered className="tabla-redondeada">
                        <thead>
                          <tr >
                          <th className="linea">#</th>
                          <th className="linea">Imagen</th>
                          <th className="linea">Nombre</th>
                          <th className="linea">Precio Grande</th>
                          <th className="linea">Precio Pequeño</th>
                          <th className="linea">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productosSeleccionados.map((producto, index) => {
                            return (
                              <tr key={index}>
                                <td className="tabla_registros">{index + 1}</td>
                                <td>
                                  <img
                                    width="32"
                                    height="32"
                                    alt={producto.PRODNOM || "Producto"}
                                    src={producto.PRODIMG ? `./img/productos/${producto.PRODIMG}` : "./img/productos/no_img.png"}
                                  />
                                </td>
                                <td className="tabla_registros">{producto.PRODNOM || "Producto sin nombre"}</td>
                                <td className="tabla_registros">
                                  <input
                                    name='PRECIOG'
                                    type="number"
                                    value={producto.PRECIOG}
                                    onChange={(e) => actualizar(index, e.target.name, e.target.value)}
                                    style={{ width: "80px" }}
                                    step="0.01"
                                    min="0"
                                  />
                                </td>

                                <td className="tabla_registros">
                                  <input
                                    name='PRECIOP'
                                    type="number"
                                    value={producto.PRECIOP}
                                    onChange={(e) => actualizar(index, e.target.name, e.target.value)}
                                    style={{ width: "80px" }}
                                    step="0.01"
                                    min="0"
                                  />
                                </td>

                                <td >
                                  <Button className="color_tablabotones" size="sm" onClick={() => borrarRegistro(index)}>
                                    <div className="colorsvg">
                                      <img src="./img/iconos/trash.svg" alt="Borrar" width="20" height="20" />
                                    </div>
                                  </Button>
                                </td>
                              </tr>
                              
                            );
                          })}
                      </tbody>
                      <tfoot>
                        <tr >
                          <td className="linea" colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
                            Total de productos seleccionados: {productosSeleccionados.length}
                          </td>
                        </tr>
                    </tfoot>
                      </Table>
                      <br />
                      <Button type="submit" className="color_tablabotones" size="sm" >Enviar Información</Button>                
                  </div> 
                </Form>
              </Col>
            </>
          </Row>          
          </Tab.Container>
        </div>
      <Toaster />
    </div>
  );
};

export default MenuCrearMenu;
