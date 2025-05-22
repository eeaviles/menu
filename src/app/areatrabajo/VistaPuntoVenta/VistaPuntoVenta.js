import { React, useState, useEffect  } from "react";
import { Row, Nav, Tab, Col, Table, Button, Form, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import "../../css/PuntoVenta.css";  
import ProductosXCategoria from "./ProductosXCategoria";
import { useObtcategoriasQuery, useOrdenesMutation  } from "../../redux/servicio/GenericApi";
import Imprimir from "./Imprimir4";

const VistaPuntoVenta = () => {

  const [selectedItem, setSelectedItem] = useState(2); 
  const [activeKey, setActiveKey] = useState(2);   
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [metodoPago, setMetodoPago] = useState("E"); // Estado para el método de pago
  const [estadoOrden, setEstadoOrden] = useState("P"); // Estado para el estado de la orden
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [resumenProductos, setResumenProductos] = useState([]); // Estado para almacenar los datos del resumen
  const [fechaHoraTicket, setFechaHoraTicket] = useState("");
  const [codigoOrden, setCodigoOrden] = useState(""); // Estado para el código del ticket

  //---[ Obtener SESIONUSER desde sessionStorage ]
  
  const SESIONUSER = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;
  const IDUSER = SESIONUSER?.IDUSER; //---[ Capturar IDUSER ]

  //---[ CAM PARA ORDENES GUARDAR ]
    const ordenescam = { controller: "OrdenesController", accion: "AG" };    
    const [enviardata, { data: G_ordenes, isSuccess:isG_ordenes }] = useOrdenesMutation();

  //---[ Configuración inicial para obtener categorías ]
    const [obtcategoriascam, setObtcategoriascam] = useState(null);
    useEffect(() => {  
        setObtcategoriascam({//---[ TODAS LAS ATEGORIAS ]
          controller: "CategoriasController",
          accion: "LI",
        });
    }, []);

    useEffect(() => {
      if (isG_ordenes) {
        if (G_ordenes) {
          toast(G_ordenes.E, {
            duration: 4000,
            position: "top-center",
            className: "toaststyle",
          });
          setProductosSeleccionados([]);
        }
      }
    }, [isG_ordenes, G_ordenes]);
  
  // Consulta a la API para obtener las categorías
    const { data: ListaCategorias, isSuccess: isListaCategorias} = useObtcategoriasQuery(obtcategoriascam,{ skip: !obtcategoriascam });

    const handleItemClick = (key) => {
      setSelectedItem(key); // Actualiza el elemento seleccionado
      setActiveKey(key); // Cambia el Tab activo
    };

  // Función para agregar productos seleccionados
    const agregarProducto = (producto) => {
      console.log(producto.precioSeleccionado);
      setProductosSeleccionados((prev) => {
        const nuevoEstado = [
          ...prev,
          {
            ...producto,
            descuento: 0,
            cantidad: 1,
            precioSeleccionado: parseFloat(producto.precioSeleccionado) || 0, // Asegurar que sea un número
          },
        ];
        return nuevoEstado;
      });
    };

    const actualizarDescuento = (index, valor) => {
      setProductosSeleccionados((prev) => {
        const nuevoEstado = [...prev];
        nuevoEstado[index].descuento = parseFloat(valor) || 0; // Actualizar descuento
        return nuevoEstado;
      });
    };

  // Función para actualizar la cantidad
    const actualizarCantidad = (index, valor) => {
      setProductosSeleccionados((prev) => {
        const nuevoEstado = [...prev];
        const cantidad = parseInt(valor) || 1; // Asegurar que la cantidad sea al menos 1
        nuevoEstado[index].cantidad = cantidad < 1 ? 1 : cantidad; // Corregir valores menores a 1
        return nuevoEstado;
      });
    };

  // Función para borrar un registro específico
    const borrarRegistro = (index) => {
      setProductosSeleccionados((prev) => prev.filter((_, i) => i !== index));
    };

  // Función para borrar todos los registros
    const borrarTodosRegistros = () => {
      setProductosSeleccionados([]);
    };

  // Mostrar mensaje de carga si las categorías aún no están disponibles
    if (!isListaCategorias) {
      return (
        <div className="container mx-auto contenedor">
          <div className="Titulo">Cargando categorías...</div>
        </div>
      );
    }

    const calcularTotales = () => {
      return productosSeleccionados.reduce(
        (totales, producto) => {
          // Asegurar que los valores sean números válidos
          const precioUnitario = parseFloat(producto.precioSeleccionado) || 0;
          const cantidad = parseInt(producto.cantidad) || 0;
          const descuento = parseFloat(producto.descuento) || 0;
    
          const precioFinal = precioUnitario * cantidad; // Calcular precio final
          const totalAPagar = precioFinal - descuento; // Calcular total a pagar
    
          return {
            totalCantidad: totales.totalCantidad + cantidad,
            totalPrecioUnidad: totales.totalPrecioUnidad + precioUnitario,
            totalPrecioFinal: totales.totalPrecioFinal + precioFinal,
            totalDescuento: totales.totalDescuento + descuento,
            totalAPagar: totales.totalAPagar + totalAPagar,
          };
        },
        {
          totalCantidad: 0,
          totalPrecioUnidad: 0,
          totalPrecioFinal: 0,
          totalDescuento: 0,
          totalAPagar: 0,
        }
      );
    };
    const totales = calcularTotales();

    //---[ GENERANDO CÓDIGO ALEATORIO ]
    const generarCodigoAleatorio = (longitud = 8) => {
      const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let codigo = "";
      for (let i = 0; i < longitud; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      return codigo;
    };

    //-----[ Enviar datos a guardar ]  
    const onSubmit = (prodSel, total) => {
      // Validar si prodSel está vacío
      if (!prodSel || prodSel.length === 0) {
        toast.error("No hay productos seleccionados para guardar la orden.", {
          duration: 4000,
          position: "top-center",
          className: "toaststyle",
        });
        return; // Salir de la función si prodSel está vacío
      }

      // Crear el objeto para enviar a la API
      let enviardataApi = {
        ...ordenescam,
        PRODSEL: prodSel,
        ...total,
        METPGO:metodoPago,
        ESTD:estadoOrden,
        IDUSER: IDUSER,
        CODOR: codigoOrden, // Agregar el código único
      };
      enviardata(enviardataApi);
      toast.remove();
    }
    //-----[ FUNCIÓN PARA ABRIR EL MODAL ]-------------
    const handleShowModal = () => {
      if (productosSeleccionados.length === 0) {
        // Mostrar un toast si no hay productos seleccionados
        toast.error("No hay productos seleccionados para procesar la orden.", {
          duration: 4000,
          position: "top-center",
          className: "toaststyle",
        });
        return; // Salir de la función si no hay productos seleccionados
      }
    
      // Si hay productos seleccionados, continuar con la lógica del modal
      setResumenProductos(productosSeleccionados); // Pasar los datos seleccionados al estado
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toLocaleDateString(); // Formato de fecha (dd/mm/yyyy)
      const horaFormateada = fechaActual.toLocaleTimeString(); // Formato de hora (hh:mm:ss)
      setFechaHoraTicket(`${fechaFormateada} ${horaFormateada}`); // Combinar fecha y hora
      const nuevoCodigoOrden = generarCodigoAleatorio(8); // Generar un código único
      setCodigoOrden(nuevoCodigoOrden); // Guardar el código en el estado
      setShowModal(true); // Mostrar el modal
    };

    const handlePrintAndSave = () => {
      // Guardar los datos seleccionados
      console.log(resumenProductos);
      onSubmit(productosSeleccionados, totales);
      // Preparar los datos para pasar a Imprimir.html
      const datos = {
        codigo: codigoOrden,
        cliente: "Cafégarzan",
        fecha: fechaHoraTicket,
        productos: resumenProductos.map((producto) => ({
          nombre: producto.PRODNOM,
          cantidad: producto.cantidad,
          precio: producto.precioSeleccionado,
          descuento: producto.descuento,
          subtotal: producto.cantidad * producto.precioSeleccionado - producto.descuento,
        })),
        total: totales.totalAPagar.toFixed(2),
      };
    
      // Ejecutar la lógica de impresión
      const imprimir = Imprimir(datos);
      imprimir.print(); // Llama a la función print
    
      // Cerrar el modal
      setShowModal(false);
    };
    
    const handleSave = () => {
      onSubmit(productosSeleccionados, totales); // Llamar a la función para guardar los datos
      setShowModal(false); // Cerrar el modal
    };

  return (
    <div>
        <div className="MenuPerfilPersonasTab">
          <Tab.Container  id="left-tabs-example"  activeKey={activeKey}  onSelect={(k) => setActiveKey(k)} >
            <Row>
              <>
                <Col name="colizq" className="MenuPerfilPersonasColizq mppImage2 col-equal-height" xs={4} sm={4} md={4} lg={2} xl={2}>
                <div className="d-flex justify-content-center">
                  <div className="textoCategorias" style={{ fontWeight: 'bold', lineHeight: 4 }}>CREAR ORDENES</div>
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
                  
                  <Tab.Content name="Tab1" className="justify-content-start w-100 align-items-start">
                    {ListaCategorias.map((categoria) => (             
                      <Tab.Pane key={categoria.IDCAT} eventKey={categoria.IDCAT}>                          
                        <ProductosXCategoria 
                        IDCategoria={categoria.IDCAT} 
                        NombreCategoria={categoria.NOMBRECAT}              
                        onProductoSeleccionado={agregarProducto} // Pasar callback
                        TIPOCAT={categoria.TIPOCAT} // Pasar el tipo de categoría                         
                        />
                      </Tab.Pane>
                    ))}
                  </Tab.Content>

                  <br />

                  <div name="ordenaprocesar" className=" row-b container mx-auto contenedor ">
                    <div className="Titulo">ORDEN A PROCESAR</div>
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
                        <th className="linea">Precio por Unidad</th>
                        <th className="linea">Cantidad</th>
                        <th className="linea">Precio Final</th>
                        <th className="linea">Descuento</th>
                        <th className="linea">Total a Pagar</th>
                        <th className="linea">Acciones</th>
                        </tr>
                      </thead> 
                      <tbody>
                      {productosSeleccionados.map((producto, index) => {
                        const precioFinal = producto.precioSeleccionado * producto.cantidad; // Calcular precio final
                        const totalAPagar = precioFinal - producto.descuento; // Calcular total a pagar
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
                            <td className="tabla_registros">{'$' + (parseFloat(producto.precioSeleccionado) || 0).toFixed(2)}</td>
                            <td className="tabla_registros">
                              <input
                                type="number"
                                value={producto.cantidad}
                                onChange={(e) => actualizarCantidad(index, e.target.value)}
                                style={{ width: "80px" }}
                                min="1"
                              />
                            </td>
                            <td className="tabla_registros">{'$' + precioFinal.toFixed(2)}</td>
                            <td className="tabla_registros">
                              <input
                                type="number"
                                value={producto.descuento}
                                onChange={(e) => actualizarDescuento(index, e.target.value)}
                                style={{ width: "80px" }}
                                step="0.1"
                                min="0"
                              />
                            </td>
                            <td className="tabla_registros">{'$' + totalAPagar.toFixed(2)}</td>
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
                      <tr>
                        <td colSpan="3" className="linea"><strong>Totales:</strong></td>
                        <td className="linea"><strong>{'$' + (totales.totalPrecioUnidad || 0).toFixed(2)}</strong></td>
                        <td className="linea"><strong>{totales.totalCantidad || 0}</strong></td>
                        <td className="linea"><strong>{'$' + (totales.totalPrecioFinal || 0).toFixed(2)}</strong></td>
                        <td className="linea"><strong>{'$' + (totales.totalDescuento || 0).toFixed(2)}</strong></td>
                        <td className="linea"><strong>{'$' + (totales.totalAPagar || 0).toFixed(2)}</strong></td>
                        <td className="linea"></td>
                      </tr>
                    </tbody>
                    </Table>

                    <div className="d-flex justify-content-start align-items-center">                  
                      <Form.Group controlId="metodoPago" className="me-3">
                        <Form.Label className="ATBJformLabel">Método de pago:</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          name="METPAGO"
                          className="ATBJFormInput"
                          value={metodoPago} 
                          onChange={(e) => {
                            console.log("Método de pago seleccionado:", e.target.value);
                            setMetodoPago(e.target.value);
                          }} // Actualizar el estado
                        >
                          <option value="E" >Efectivo</option>
                          <option value="C">Tarjeta de Crédito</option>
                          <option value="T">Transferencia</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="estadoOrden" className="me-3">
                        <Form.Label className="ATBJformLabel">Estado de la orden:</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          name="ESTORDEN"
                          className="ATBJFormInput"
                          value={estadoOrden}
                          onChange={(e) => setEstadoOrden(e.target.value)} // Actualizar el estado
                        >
                          <option value="P">Pagada</option>
                          <option value="D">Pendiente</option>
                        </Form.Control>
                      </Form.Group>

                      <Button className="color_tablabotones" size="sm" onClick={handleShowModal} >
                        Guardar Orden
                      </Button>

                      {/* Modal para mostrar el resumen */}

                      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="modal-ticket">
                        <Modal.Header closeButton>
                          <Modal.Title style={{ textAlign: "center", width: "100%" }}>Cafégarzan</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          {resumenProductos.length > 0 ? (
                            <div className="ticket ">
                              <h5 className="text-center">Ticket de Compra</h5>
                              <p className="text-center" style={{ fontSize: "12px", margin: "0" }}>
                                {fechaHoraTicket}
                              </p>
                              <p className="text-center" style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}>
                              Código: {codigoOrden}
                            </p>
                              <hr />
                              <Table bordered className="tabla-redondeada">
                                <thead>
                                  <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {resumenProductos.map((producto, index) => {
                                    const precio = parseFloat(producto.precioSeleccionado || 0).toFixed(2);
                                    const subtotal = (producto.cantidad * precio - producto.descuento).toFixed(2);
                                    return (
                                      <tr key={index}>
                                        <td>{producto.PRODNOM}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>${precio}</td>
                                        <td>${subtotal}</td>
                                      </tr>
                                    );
                                  })}
                                    <tr>
                                      <td colSpan="3" className="text-end">
                                        <strong>Total a Pagar:</strong>
                                      </td>
                                      <td>
                                        <strong>${totales.totalAPagar.toFixed(2)}</strong>
                                      </td>
                                    </tr>
                                  </tbody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p>No existen productos seleccionados.</p>
                            </div>
                          )}
                        </Modal.Body>

                        <Modal.Footer>
                          <Button variant="success" onClick={handleSave}>
                            Guardar
                          </Button>
                          <Button variant="warning" onClick={handlePrintAndSave}>
                            Imprimir y Guardar
                          </Button>
                        </Modal.Footer>

                      </Modal>      

                    </div>
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

export default VistaPuntoVenta;
