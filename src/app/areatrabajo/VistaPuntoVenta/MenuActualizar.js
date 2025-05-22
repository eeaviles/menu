import { React, useState, useEffect  } from "react";
import { Row, Nav, Tab, Col, Table, Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import "../../css/PuntoVenta.css";  
import MenuProdXCat from "./MenuProdXCat";
import { useObtcategoriasQuery, useMenudetalleMutation, useObtmenudetalleQuery, useMenusMutation  } from "../../redux/servicio/GenericApi";

const MenuActualizar = ({IDMENU, NOMBREMENU, FECHAPROGRAMADA, COMENTARIO }) => {
  //---[ USESTATE]---
    const [selectedItem, setSelectedItem] = useState(2); 
    const [activeKey, setActiveKey] = useState(2);   
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [nombreMenu, setNombreMenu] = useState(NOMBREMENU); // Estado para el estado de la orden
    const [fechaProgramada, setFechaProgramada] = useState(FECHAPROGRAMADA); // Estado para el estado de la orden
    const [comentariomenu, setComentariomenu] = useState(COMENTARIO); // Estado para el comentario del menú
    const [obtcategoriascam, setObtcategoriascam] = useState(null); // Estado para las categorías
    const [menuscam, setMenuscam] = useState(null); // Estado para agregar menus con detalles
    const [menuinfocam, setMenuinfocam] = useState(null); // Estado para la información del menú
    const [obtMenudetalles, setObtMenudetalles] = useState(null); // Estado para obtener detalles de los menus

  //---[SOLICITUD MUTACION: GUARDAR MENU ]---
    const [enviardata, { data: R_menus, isSuccess:isR_menus }] = useMenudetalleMutation();
    const [envcambiosdelainfomenu, { data: Resp, isSuccess:isResp}] = useMenusMutation();

  //---[ ESTADO PARA OBTENER TODAS LAS CATEGORÍAS ]---    
    useEffect(() => {  
      setObtcategoriascam({//---[ TODAS LAS ATEGORIAS ]
        controller: "CategoriasController",
        accion: "LI",
      });
    }, []);
    
  //---[ ESTADO PARA GUARDAR MENUS ]
    useEffect(() => {  
      setMenuscam({
          controller: "MenuDetallesController",
          accion: "OPER",
        });
    }, []);

  //---[ ESTADO PARA GUARDAR CAMBIOS EN LA INFORMACIÓN DEL MENÚ ]---
    useEffect(() => {
      setMenuinfocam({
        controller: "MenuController",
        accion: "AC"
      })
    }, []);

  //---[ ESTADO PARA OBTENER MENÚS Y SUS DETALLES ]---
    useEffect(() => {  
        setObtMenudetalles({
          controller: "MenuDetallesController",
          accion: "LIXIDMENU",
          ID:IDMENU,
        });
    }, [IDMENU]);

  //---[ MENSAJE DE MUTACIÓN y REINICIO DE PRODUCTOS SELECCIONADOS ]---
    useEffect(() => {
      if (isR_menus) {
        if (R_menus) {
          toast(R_menus.E, {
            duration: 4000,
            position: "top-center",
            className: "toaststyle",
          });

          // Filtrar los productos que no están marcados como "BORRAR"
          setProductosSeleccionados((prev) =>
            prev.filter((producto) => producto.operacion !== "BORRAR")
          );
        }
      }
    }, [isR_menus, R_menus]);  

      //---[ MENSAJE DE MUTACIÓN PARA INFORMACIOÓN DEL MENÚ ]---
      useEffect(() => {
        if (isResp) {
          if (Resp) {
            toast(Resp.E, {
              duration: 4000,
              position: "top-center",
              className: "toaststyle",
            });
          }
        }
      }, [isResp, Resp]);  


   //---[ QUERY: OBTENER CATEGORÍAS ]----
      const { data: ListaCategorias, isSuccess: isListaCategorias} = useObtcategoriasQuery(obtcategoriascam,{ skip: !obtcategoriascam });
      const handleItemClick = (key) => {
        setSelectedItem(key); // Actualiza el elemento seleccionado
        setActiveKey(key); // Cambia el Tab activo
      };

    //---[ SOLICITUD PAR OBTENER DETALLES DE MENÚ ]---
        const { data: ListaMenusDetalles, isSuccess: isListaMenusDetalles} = useObtmenudetalleQuery(obtMenudetalles,{ skip: !obtMenudetalles });
        useEffect(() => {
            if (isListaMenusDetalles) {
                if (ListaMenusDetalles) {
                    setProductosSeleccionados(ListaMenusDetalles); // Actualiza el estado con los detalles del menú
                }
            }
        }, [isListaMenusDetalles, ListaMenusDetalles]);

    //---[ AGREGAR PRODUCTO SELECCIONADO AL OBEJETO DE SALIDA ]---

      const agregarProducto = (producto) => {
        setProductosSeleccionados((prev) => {
          const nuevoEstado = [
            ...prev,
            { 
              ...producto, 
              operacion: "AGREGAR", 
              descuento: 0, 
              cantidad: 1,
            },
          ];
          return nuevoEstado;
        });
      };


    //---[OPERACIONES SOBRE LA TABLA]--------------------------------------------------------
        //---[ ACTUALIZAR EL VALOR DE LA CANTIDAD CON EL VALOR QUE PROVIENE DE SU INPUNT ]---

        // Actualizar un producto
        const actualizar = (index, name, valor) => {
          setProductosSeleccionados((prev) => {
            // Crear una copia del array de productos seleccionados
            const nuevoEstado = [...prev];
        
            // Crear una copia del objeto del producto que se va a modificar
            const productoActualizado = { ...nuevoEstado[index] };
        
            // Actualizar la propiedad del producto
            productoActualizado[name] = valor === "" || valor.endsWith(".") ? valor : parseFloat(valor) || 0;
        
            // Si el producto no es nuevo, marcarlo como "ACTUALIZAR"
            if (productoActualizado.operacion !== "AGREGAR") {
              productoActualizado.operacion = "ACTUALIZAR";
            }
        
            // Reemplazar el producto actualizado en el array
            nuevoEstado[index] = productoActualizado;
        
            return nuevoEstado; // Retornar el nuevo estado
          });
        };

        //---[ ELIMINAR PRODUCTO SELECCIONADO DEL OBJETO DE SALIDA ]---
        const toggleBorrar = (index) => {
          setProductosSeleccionados((prev) => {
            const nuevoEstado = [...prev];
            const productoActualizado = { ...nuevoEstado[index] };
        
            // Alternar el estado de "BORRAR"
            if (productoActualizado.operacion === "BORRAR") {
              productoActualizado.operacion = null; // Desmarcar el producto
            } else {
              productoActualizado.operacion = "BORRAR"; 
              toast.error("El producto será eliminado al guardar los cambios.", {
                duration: 4000,
                position: "top-center",
                className: "toaststyle",
              });
            }
        
            nuevoEstado[index] = productoActualizado;
            return nuevoEstado;
          });
        };

    //----------------------------------------------------------------------------------------
  
    //---[ MOSTRAR MENSAJES DE CARGA SI LAS CATEGORÍAS NO ESTAN DISPONIBLES ]---
      if (!isListaCategorias) {
        return (
          <div className="container mx-auto contenedor">
            <div className="Titulo">Cargando categorías...</div>
          </div>
        );
      }

    //-----[ ENVIO DE MENUDETALLE CAMBIOS A LA API ]-----  
    const onSubmit = () => {
        if (!productosSeleccionados || productosSeleccionados.length === 0) {
            toast.error("No hay productos seleccionados para guardar la orden.", {
            duration: 4000,
            position: "top-center",
            className: "toaststyle",
            });
            return;
        }

        // Preparar los datos para la API
        const enviardataApi = {
            ...menuscam,
            PRODSEL: productosSeleccionados, // Enviar todos los productos con sus operaciones  
            IDMENU: IDMENU,
        };

        // Llamar a la API
        enviardata(enviardataApi);
    }

    //---[ ENVÍO A LA API DE CAMBIOS EN LA INFORMACIÓN DEL MENU ]----------

    const cambiosdelainfomenu = () => {
        // Verificar si hay cambios en el nombre del menú o la fecha programada
        
        if (nombreMenu !== NOMBREMENU || fechaProgramada !== FECHAPROGRAMADA || comentariomenu !== '') {
          console.log('HOLA DESDE CAMBIOS DEL MENU', nombreMenu, fechaProgramada, IDMENU);
            const enviardataApi = {
                ...menuinfocam,
                NMENU: nombreMenu,
                FPROG: fechaProgramada,
                IDMENU: IDMENU,
                COMMENU: comentariomenu,
            };
            envcambiosdelainfomenu(enviardataApi);
        }
    };

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
          <div className="actualizarmenu mx-auto" style={{width:'30%'}}><div>ACTUALIZAR MENÚ</div></div>
          <br />
          <Tab.Container  id="left-tabs-example"  activeKey={activeKey}  onSelect={(k) => setActiveKey(k)} >
          <Row>
            <>
              <Col name="colizq" className="MenuPerfilPersonasColizq mppImage2 col-equal-height" xs={4} sm={4} md={4} lg={2} xl={2}>
              <div className="d-flex justify-content-center">
                  <div className="textoCategorias" style={{ fontWeight: 'bold', lineHeight: 4 }}>ACTUALIZAR MENÚ</div>
                </div>              
                <Nav variant="pills" className="flex-column d-flex justify-content-center">
                  {ListaCategorias.map((categoria) => (
                    <Nav.Item key={categoria.IDCAT} className="text-center flex-fill"  style={{"--bs-nav-link-padding-y": "1rem"}} >
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
                          onChange={(e) => {setComentariomenu(e.target.value);
                          }} // Actualizar el estado
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button className="color_tablabotones" size="sm" 
                    onClick={() => cambiosdelainfomenu()}>Actualizar Nombre o Fecha</Button>
                </div>

                <br />
                <div name="Tab2" className=" ">
                    <div name="menucrear" className="row-b contenedor ">                    
                    <div className="titulos_MenuCrearMenu">MOSTRAR MENÚ</div>

                    <Table name="Tabla1" striped bordered className="tabla-redondeada">
                        <thead>
                        <tr >
                        <th className="linea">#</th>
                        <th className="linea">Imagen</th>
                        <th className="linea">Nombre</th>
                        <th className="linea">Precio Grande</th>
                        <th className="linea">Precio Pequeño</th>
                        <th className="linea">Borrar</th>
                        </tr>
                        </thead>
                        <tbody>
                          {productosSeleccionados.map((producto, index) => (
                            <tr key={index}>
                              <td className={producto.operacion === "BORRAR" ? "fila-borrar" : ""}>{index + 1}</td>
                              <td className={producto.operacion === "BORRAR" ? "fila-borrar" : ""} >
                                <img
                                  width="32"
                                  height="32"
                                  alt={producto.PRODNOM || "Producto"}
                                  src={producto.PRODIMG ? `./img/productos/${producto.PRODIMG}` : "./img/productos/no_img.png"}
                                />
                              </td>
                              <td className={producto.operacion === "BORRAR" ? "fila-borrar" : ""}>{producto.PRODNOM || "Producto sin nombre"}</td>
                              <td className={producto.operacion === "BORRAR" ? "fila-borrar" : ""}>
                                <input
                                  name="PRECIOG"
                                  type="number"
                                  value={producto.PRECIOG}
                                  onChange={(e) => actualizar(index, e.target.name, e.target.value)}
                                  style={{ width: "80px" }}
                                  step="0.1"
                                  min="0"
                                  disabled={producto.operacion === "BORRAR"} // Deshabilitar si está marcado para borrar
                                />
                              </td>
                              <td className={producto.operacion === "BORRAR" ? "fila-borrar" : ""}>
                                <input
                                  name="PRECIOP"
                                  type="number"
                                  value={producto.PRECIOP}
                                  onChange={(e) => actualizar(index, e.target.name, e.target.value)}
                                  style={{ width: "80px" }}
                                  step="0.1"
                                  min="0"
                                  disabled={producto.operacion === "BORRAR"} // Deshabilitar si está marcado para borrar
                                />
                              </td>
                              <td className={producto.operacion === "BORRAR" ? "fila-borrar" : ""}>
                                <input
                                  type="checkbox"
                                  checked={producto.operacion === "BORRAR"}
                                  onChange={() => toggleBorrar(index)}
                                  style={{ cursor: "pointer" }}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    <tfoot>
                        <tr >
                        <td className="linea" colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
                            Total de productos seleccionados: {productosSeleccionados.length}
                        </td>
                        </tr>
                    </tfoot>
                    </Table>
                    </div>
                    <br />
                    <Button className="color_tablabotones" size="sm" onClick={() => onSubmit(productosSeleccionados)}>Guardar los cambios al Menú</Button>
                </div>

              </Col>
            </>
          </Row>          
          </Tab.Container>
        </div>
      <Toaster />
    </div>
  );
};

export default MenuActualizar;
