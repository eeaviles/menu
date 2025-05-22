import { React, useEffect, useState, useCallback } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import {useMutpersonasMutation, useObtperonasQuery, useObtsucursalesQuery, useLazyObtareasQuery, useLazyObtptbjoQuery} from "../../../../redux/servicio/GenericApi";

const EmpleadosAciones = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [actualizar, setActualizar] = useState("");
  const [fijartitulo, setFijarTitulo] = useState("");
  const [empledoscam, setEmpledoscam] = useState(null);

  //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR]-----
  const [enviardata, { data, isSuccess }] = useMutpersonasMutation();

  useEffect(() => {
    if (DATOS !== "") {
      //entrada de datosde TablaAcciones2
      setRegistrodatos(DATOS);
      setActualizar(true);
      setFijarTitulo("ACTUALIZAR");
    } else {
      setRegistrodatos({
        FFIN: null, // Inicializar con null
      });
      setActualizar(false);
      setFijarTitulo("AGREGAR");
    }

  }, [isSuccess, data, DATOS, IDEMPRE]);  

  //-----[ Query LISTA DE PERSONAS ]-----
  const [obtListaPersonas, setObtListaPersonas] = useState(null);
  useEffect(() => {
    setObtListaPersonas({
          controller: "PersonasController",
          accion: "LIPFXP", //---[ Listar para formulario input select ]---
          ID: IDEMPRE,
      });
  }, [IDEMPRE]);
  const { data: ListaPersonas} = useObtperonasQuery(obtListaPersonas,{ skip: !obtListaPersonas });

  //-----[ OBTENER LISTA DE SUCURSALES ]-----

    //---[ QUERY: OBTENER LISTA DE SUCURSALES ]----
        const [OBtcam, setOBtcam] = useState(null);
        useEffect(() => {
            setOBtcam({
                controller: "SucursalesController",
                accion: "LIPF", //---[ Listar para formulario input select ]---
                ID: IDEMPRE,
            });
        }, [IDEMPRE]);
        const { data: ListaSucursales} = useObtsucursalesQuery(OBtcam,{ skip: !OBtcam });

    //---[ QUERY: OBTENER LISTA DE AREAS ]----     
        const [trigger, { data: ListaAreas,}] = useLazyObtareasQuery();
        const ObtListaAreas = useCallback((IDSUC) => {   
            trigger({
                controller: "AreasController",
                accion: "LIPF",
                ID: IDEMPRE,
                IDPF: IDSUC,
            });
        }, [trigger, IDEMPRE]);       
          
        useEffect(() => {
            if (registrodatos?.IDSUC) {
              ObtListaAreas(registrodatos.IDSUC); // Llamar a la función cuando IDSUC cambie
            }
        }, [registrodatos.IDSUC, ObtListaAreas]); // Escuchar cambios en IDSUC
                
        useEffect(() => {
        if (ListaAreas?.length === 1 && !registrodatos.IDAREA) {
            setRegistrodatos((prev) => ({
            ...prev,
            IDAREA: ListaAreas[0].IDAREA, // Establecer automáticamente el único valor disponible
            }));
        }
        }, [ListaAreas, registrodatos.IDAREA]);    

    //---[ OBTENER LA LISTA DE PUESTOS DE TRABAJO]
    const [trigger_puestostrabajos, { data: ListaPuestostrabajos,}] = useLazyObtptbjoQuery();
    const ObtListaPuestostrabajos = useCallback((IDAREA) => {   
      trigger_puestostrabajos({
          controller: "PuestosTrabajosController",
          accion: "LIPF",
          ID: IDEMPRE,
          IDPF: IDAREA,
      });
    }, [trigger_puestostrabajos, IDEMPRE]);  


    useEffect(() => {
      if (registrodatos?.IDAREA) {
        ObtListaPuestostrabajos(registrodatos.IDAREA); // Llamar a la función cuando IDSUC cambie
      }
    }, [registrodatos.IDAREA, ObtListaPuestostrabajos]); // Escuchar cambios en IDSUC
          
    useEffect(() => {
    if (ListaPuestostrabajos?.length === 1 && !registrodatos.IDPTBJO) {
        setRegistrodatos((prev) => ({
        ...prev,
        IDPTBJO: ListaPuestostrabajos[0].IDPTBJO, // Establecer automáticamente el único valor disponible
        }));
    }
    }, [ListaPuestostrabajos, registrodatos.IDPTBJO]);    

  //-----[ MANEJAR EL ENVIO DE FORMULARIO ]-----
    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let sel = actualizar ? "AC" : "AG";

      setEmpledoscam(() => {
        const nuevoEstado = {
          IDEMPRE: IDEMPRE,
          controller: "EmpleadosController",
          accion: sel,
          ...registrodatos,
        };
        return nuevoEstado;
      });
    };

  //-----[ Usar useEffect para reaccionar al cambio en sucursalescam ]-----
    useEffect(() => {
      if (empledoscam) {
        //console.log(sucursalescam); // Ahora verás el valor actualizado
        enviardata(empledoscam); // Enviar los datos después de que se actualice
      }
    }, [empledoscam, enviardata]);


  //-----[ SALIDA DEL FORMULARIO]-----
    useEffect(() => {
      if (isSuccess) {
        if (data) {
          toast("DATOS ALMACENADOS CORRECTAMENTE", {
            duration: 4000,
            position: "top-center",
            className: "toaststyle",
          });
        }
        toast.remove();
        closeModal(); // Si es necesario cerrar el modal
      }
    }, [isSuccess, closeModal, data]);

  //---[COMPONENTE PRINCIPAL]------------------------------------------------
    return (
      <>
      {(actualizar || Array.isArray(ListaPersonas)) ? (
        <div name="todoEmpleado" className="container mx-auto  ">
          <div className="Titulo">{fijartitulo} {ETIQUETA + ':'} { registrodatos?.PERNOM ? registrodatos?.PERNOM: ""}</div>
          <Form className="ATBJform" onSubmit={handleSubmit} method="POST">
            {!actualizar && ( 
              <Row className="ATBJformfila">
                <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Form.Group controlId="IDPER">
                    <Form.Label className="ATBJformLabel">Personas:</Form.Label>
                    <Form.Control
                        required
                        as="select"
                        name="IDPER"
                        className="ATBJFormInput"
                        value={registrodatos?.IDPER ? registrodatos?.IDPER: ""}
                        onChange={(e) => {
                            setRegistrodatos((prev) => ({
                              ...prev,
                              IDPER: e.target.value, // Actualizar IDSUC
                            }));

                        }}
                    >
                        {!actualizar && (<option value="" defaultValue>Seleccionar</option>)}
                        {ListaPersonas?.map((personas, index) => (
                        <option key={`${personas.IDPER}-${index}`} value={personas.IDPER}>
                            {personas.NPER}
                        </option>  
                          ))}
      
                    </Form.Control>
                    </Form.Group>
                </Col>     
              </Row>
            )}             
           
            <Row className="ATBJformfila">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <Form.Group controlId="FINI">
                  <Form.Label className="ATBJformLabel">Fecha de Ingreso:</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="FINI"
                    className="ATBJFormInput"
                    value={registrodatos?.FINI ? registrodatos?.FINI: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        FINI: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Form.Group controlId="IDSUC">
                  <Form.Label className="ATBJformLabel">Sucursal:</Form.Label>
                  <Form.Control
                      required
                      as="select"
                      name="IDSUC"
                      className="ATBJFormInput"
                      value={registrodatos?.IDSUC ? registrodatos?.IDSUC: ""}
                      onChange={(e) => {
                          setRegistrodatos((prev) => ({
                            ...prev,
                            IDSUC: e.target.value, // Actualizar IDSUC
                          }));

                      }}
                  >
                      {!actualizar && (<option value="" defaultValue>Seleccionar</option>)}
                      {ListaSucursales?.map((sucursal, index) => (
                      <option key={`${sucursal.IDSUC}-${index}`} value={sucursal.IDSUC}>
                          {sucursal.NSUC}
                      </option>  
                        ))}
                  </Form.Control>
                  </Form.Group>
              </Col>     

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Form.Group controlId="IDAREA">
                      <Form.Label className="ATBJformLabel">Área:</Form.Label>
                      <Form.Control
                          required
                          as="select"
                          name="IDAREA"
                          className="ATBJFormInput"
                          value={registrodatos?.IDAREA ? registrodatos?.IDAREA: ""}
                          onChange={(e) => {                                
                              setRegistrodatos((prev) => ({
                                  ...prev, // Mantener las demás propiedades
                                  IDAREA: e.target.value, // Actualizar correctamente IDAREA
                              }));
                          }}
                      >  
                      {actualizar && (<option value="" defaultValue>Seleccionar</option>)}    
                      {ListaAreas?.map((area, index) => (
                          <option key={`${area.IDAREA}-${index}`} value={area.IDAREA}>{area.NAREA}</option>
                      ))}                                         
                      </Form.Control>
                  </Form.Group>
              </Col>     

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="IDPTBJO">
                  <Form.Label className="ATBJformLabel">Puesto de Trabajo:</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      name="IDPTBJO"
                      className="ATBJFormInput"
                      value={registrodatos?.IDPTBJO ? registrodatos?.IDPTBJO: ""}
                      onChange={(e) => {                                
                          setRegistrodatos((prev) => ({
                              ...prev, // Mantener las demás propiedades
                              IDPTBJO: e.target.value, // Actualizar correctamente IDAREA
                          }));
                      }}
                      >  
                      {actualizar && (<option value="" defaultValue>Seleccionar</option>)}    
                      {ListaPuestostrabajos?.map((ptbjo, index) => (
                          <option key={`${ptbjo.IDPTBJO}-${index}`} value={ptbjo.IDPTBJO}>{ptbjo.NPTBJO}</option>
                      ))}                                         
                    </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <br /><hr />

            <Row className="ATBJformfila">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <Form.Group controlId="FFIN">
                  <Form.Label className="ATBJformLabel">Fecha de salida:</Form.Label>
                  <Form.Control  
                    type="date"
                    name="FFIN"
                    className="ATBJFormInput"
                    value={registrodatos?.FFIN ? registrodatos?.FFIN: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        FFIN: e.target.value || null, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Form.Group controlId="ACTIVO">
                  <Form.Label className="ATBJformLabel">Activar:</Form.Label>
                  <Form.Control
                      required
                      as="select"
                      name="ACTIVO"
                      className="ATBJFormInput"
                      value={registrodatos?.ACTIVO ? registrodatos?.ACTIVO: ""}
                      onChange={(e) => {
                          setRegistrodatos((prev) => ({
                            ...prev,
                            ACTIVO: e.target.value, // Actualizar IDSUC
                          }));

                      }}
                  >
                    {!actualizar && <option value="">Seleccionar</option>}
                    <option value="S">Activo</option>
                    <option value="N">No Activo</option>
                  </Form.Control>
                  </Form.Group>
              </Col>     
            </Row>

            <br /><hr />

            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="DESCRIP">
                  <Form.Label className="ATBJformLabel">COMENTARIO ADICIONAL:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="COMENTARIO ADICIONAL"
                    name="DESCRIP"
                    className="ATBJFormInput"
                    value={registrodatos?.DESCRIP ? registrodatos?.DESCRIP: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        DESCRIP: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row> 
            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                <Button variant="flat" size="xxl" type="submit">{fijartitulo}</Button>
              </Col>
            </Row>                       
          </Form>
        </div>
          ) : (
          <div className="text-center mt-4" style={{"color": "rgb(34, 34, 34)"}}>
            <p>No existen personas para asociar como Empleado.</p>
            <p> - Favor dirigite al menu "Personas" e ingresa una nueva. -</p>
          </div>
        )}
        <Toaster />  
      </>
    );
};

export default EmpleadosAciones;