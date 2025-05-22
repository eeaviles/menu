import { React, useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button, OverlayTrigger, Tooltip  } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import CryptoJS from "crypto-js";

//-----[REDUX TOOLKIT]-----
import {useMutusuariosMutation, useObtperonasQuery, useObtrolesQuery} from "../../../../redux/servicio/GenericApi";

const UsuariosAcciones = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [errorPassword, setErrorPassword] = useState(false);
  const [actualizar, setActualizar] = useState("");
  const [fijartitulo, setFijarTitulo] = useState("");
  const formRef = useRef(null); // Referencia al formulario
  const [toastShown, setToastShown] = useState(false); // Estado para controlar el toast


  //-----[ Query LISTA DE PERSONAS ]-----
    const [obtListaPersonas, setObtListaPersonas] = useState(null);
    useEffect(() => {
      setObtListaPersonas({
            controller: "PersonasController",
            accion: "LIPFXU", //---[ Listar para formulario input select ]---
            ID: IDEMPRE,
        });
    }, [IDEMPRE]);
    const { data: ListaPersonas} = useObtperonasQuery(obtListaPersonas,{ skip: !obtListaPersonas });


   //-----[ OBTENER ROLES ]-----
      //---[ QUERY: OBTENER LISTA DE ROLES ]----
      const [OBtcam, setOBtcam] = useState(null);
      useEffect(() => {
        setOBtcam({
          controller: "RolesController",
          accion: "LIPF", //---[ Listar para formulario input select ]---
          ID: IDEMPRE,
        });
      }, [IDEMPRE]);
      const { data: ListaRoles } = useObtrolesQuery(OBtcam,{ skip: !OBtcam }); 


  //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR]-----
  const [enviardata, { data, isSuccess }] = useMutusuariosMutation();
  useEffect(() => {
    if (DATOS !== "") {
      //entrada de datosde TablaAcciones2
      setRegistrodatos(DATOS);
      setActualizar(true);
      setFijarTitulo("ACTUALIZAR");
    } else {
      setRegistrodatos([]);
      setActualizar(false);
      setFijarTitulo("AGREGAR");
    }
  }, [isSuccess, DATOS, IDEMPRE]);  

  //-----[ MANEJAR EL ENVIO DE FORMULARIO ]-----
    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();

    // Validar que las contraseñas coincidan
    if (registrodatos.PASWD !== registrodatos.RPASWD) {
      setErrorPassword(true); // Mostrar el mensaje de error
      return; // Detener el envío del formulario
    }

    // Encriptar las contraseñas con SHA256
      registrodatos["PASWD"] = CryptoJS.SHA256(registrodatos.PASWD).toString(CryptoJS.enc.Hex);
 
    // Eliminar RPASWD del objeto registrodatos
      const { RPASWD, ...datosSinRPASWD } = registrodatos;
      setErrorPassword(false); // Limpiar el mensaje de error si coinciden
      let accion = actualizar ? "AC" : "AG";
      const datosEnviar = {
        IDEMPRE,
        controller: "UsuariosController",
        accion,
        ...datosSinRPASWD,
      };
      enviardata(datosEnviar); // Enviar los datos
      // Resetear el formulario
      if (formRef.current) {
        formRef.current.reset();
      }
      // Limpiar el estado
      setRegistrodatos([]);
    };

  //-----[ SALIDA DEL FORMULARIO]-----
    useEffect(() => {
      if (isSuccess && !toastShown) {
        if (data) {
          console.log(data.E);
          toast(data.E, {
            duration: 4000,
            position: "top-center",
            className: "toaststyle",
          });
        }
        setToastShown(true); // Marcar el toast como mostrado
        closeModal(); // Si es necesario cerrar el modal
      }
    }, [isSuccess, closeModal, data, toastShown]);

  //---[COMPONENTE PRINCIPAL]------------------------------------------------
    return (
      <>
        {(actualizar || Array.isArray(ListaPersonas)) ? (
        <div name="todoUsuario" className="container mx-auto">
          <div className="Titulo">{fijartitulo} {ETIQUETA}</div>
          <Form ref={formRef} className="ATBJform" onSubmit={handleSubmit} method="POST">
            {!actualizar && Array.isArray(ListaPersonas) && ( 
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
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="NUSER">
                  <Form.Label className="ATBJformLabel">Nombre Usuario:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nombre de la Sucursal "
                    name="NUSER"
                    className="ATBJFormInput"
                    value={registrodatos?.NUSER ? registrodatos?.NUSER: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        NUSER: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="PASWD">
                  <Form.Label className="ATBJformLabel"> Introducir Nuevo Password: </Form.Label>
                  <OverlayTrigger
                      show={errorPassword} // Mostrar el tooltip si hay error
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-password-error" className="custom-tooltip">
                          Las contraseñas no coinciden.
                        </Tooltip>
                      }
                    >                  
                    <Form.Control 
                      required={!actualizar} // Solo es requerido si actualizar es false              
                      type="password"
                      placeholder="Introducir Password"
                      name="PASWD"
                      className="ATBJFormInput"
                      value={registrodatos?.PASWD ? registrodatos?.PASWD: ""}
                      onChange={(e) => {
                        setRegistrodatos({
                          ...registrodatos, // Mantener las demás propiedades
                          PASWD: e.target.value, // Actualizar solo ANBRE
                        });
                        setErrorPassword(false);
                      }}
                    />
                  </OverlayTrigger>              
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="RPASWD">
                  <Form.Label className="ATBJformLabel"> Reescribir Nuevo Password: </Form.Label>
                  <OverlayTrigger
                      show={errorPassword} // Mostrar el tooltip si hay error
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-password-error" className="custom-tooltip">
                          Las contraseñas no coinciden.
                        </Tooltip>
                      }
                    >  
                  <Form.Control  
                    required={!actualizar} // Solo es requerido si actualizar es false           
                    type="password"                  
                    placeholder="Rescribir Password"
                    name="RPASWD"
                    className="ATBJFormInput"
                    value={registrodatos?.RPASWD ? registrodatos?.RPASWD: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        RPASWD: e.target.value, // Actualizar solo ANBRE
                      });
                      setErrorPassword(false);
                    }}
                  />
                  </OverlayTrigger>  
                </Form.Group>
              </Col>
            </Row>
            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="CORREO">
                    <Form.Label className="ATBJformLabel"> Correo: </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Primer Apellido"
                      name="CORREO"
                      className="ATBJFormInput"
                      value={registrodatos?.CORREO ? registrodatos?.CORREO: ""}
                      onChange={(e) => {
                        setRegistrodatos({
                          ...registrodatos, // Mantener las demás propiedades
                          CORREO: e.target.value, // Actualizar solo ANBRE
                        });
                      }}
                    />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="DESCRIP">
                    <Form.Label className="ATBJformLabel"> Descripción: </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Descripción"
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
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Form.Group controlId="IROL">
                    <Form.Label className="ATBJformLabel">Rol:</Form.Label>
                    <Form.Control
                        required
                        as="select"
                        name="IROL"
                        className="ATBJFormInput"
                        value={registrodatos?.IROL ? registrodatos?.IROL: ""}
                        onChange={(e) => {
                            setRegistrodatos((prev) => ({
                              ...prev,
                              IROL: e.target.value, 
                            }));

                        }}
                    >
                        {!actualizar && (<option value="" defaultValue>Seleccionar</option>)}
                        {ListaRoles?.map((rol, index) => (
                        <option key={`${rol.IROL}-${index}`} value={rol.IROL}>
                            {rol.NROL}
                        </option>  
                         ))}
                    </Form.Control>
                    </Form.Group>
              </Col>               
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="USERACT">
                  <Form.Label className="ATBJformLabel">ACTIVO:</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="USERACT"
                    className="ATBJFormInput"
                    value={registrodatos?.USERACT ? registrodatos?.USERACT: ""} // Mostrar el valor actual de SEXO
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos,
                        USERACT: e.target.value, // Actualizar con "M" o "F"
                      });
                    }}
                  >
                    {!actualizar && <option value="">Seleccionar</option>}
                    <option value="S">ACTIVO</option>
                    <option value="N">CANCELADO</option>
                  </Form.Control>
                </Form.Group>
              </Col>              
            </Row>

            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                <Button variant="flat" size="xxl" type="submit">
                  {fijartitulo}
                </Button>
              </Col>
            </Row>

          </Form>
        </div>
        ) : (
          <div className="text-center mt-4" style={{"color": "rgb(34, 34, 34)"}}>
            <p>No existen personas para asociar como Usuario.</p>
            <p> - Favor dirigite al menu Persona e ingresa una nueva. -</p>
          </div>
        )}
        <Toaster />
      </>
    );
};

export default UsuariosAcciones;