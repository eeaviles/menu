import { React, useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import {useMutpersonasMutation,} from "../../../../redux/servicio/GenericApi";

const PersonasAcciones = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [actualizar, setActualizar] = useState("");
  const [fijartitulo, setFijarTitulo] = useState("");
  const [objtemp1, setObjtemp1] = useState("");
  const [personascam, setPersonascam] = useState(null);

  //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR]-----
  const [enviardata, { data, isSuccess }] = useMutpersonasMutation();

  useEffect(() => {
    if (DATOS !== "") {
      //entrada de datosde TablaAcciones2
      setRegistrodatos(DATOS);
      setActualizar(true);
      setFijarTitulo("ACTUALIZAR");
    } else {
      setObjtemp1({ IDEMPRE: IDEMPRE }); //ID EMPRESA
      setRegistrodatos([]);
      setActualizar(false);
      setFijarTitulo("AGREGAR");
    }


  }, [isSuccess, data, DATOS, IDEMPRE]);  

  //-----[ MANEJAR EL ENVIO DE FORMULARIO ]-----
    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let sel = actualizar ? "AC" : "AG";

      setPersonascam(() => {
        const nuevoEstado = {
          IDEMPRE: IDEMPRE,
          controller: "PersonasController",
          accion: sel,
          ...objtemp1,
          ...registrodatos,
        };
        return nuevoEstado;
      });
    };

  //-----[ Usar useEffect para reaccionar al cambio en sucursalescam ]-----
    useEffect(() => {
      if (personascam) {
        //console.log(sucursalescam); // Ahora verás el valor actualizado
        enviardata(personascam); // Enviar los datos después de que se actualice
      }
    }, [personascam, enviardata]);


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
        <div className="container mx-auto  ">
          <div className="Titulo">
            {fijartitulo} {ETIQUETA}
          </div>
          <Form className="ATBJform" onSubmit={handleSubmit} method="POST">
            
            <Row className="ATBJformfila">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <Form.Group controlId="N1">
                  <Form.Label className="ATBJformLabel">Primer Nombre:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder=" (Primer Nombre)"
                    name="N1"
                    className="ATBJFormInput"
                    value={registrodatos?.N1 ? registrodatos?.N1: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        N1: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="NOMBRE">
                  <Form.Label className="ATBJformLabel">
                  Segundo Nombre:
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nombre de la Sucursal "
                    name="NOMBRE"
                    className="ATBJFormInput"
                    value={registrodatos?.N2 ? registrodatos?.N2: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        N2: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="AP1">
                  <Form.Label className="ATBJformLabel"> Primer Apellido: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Primer Apellido"
                    name="AP1"
                    className="ATBJFormInput"
                    value={registrodatos?.AP1 ? registrodatos?.AP1: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        AP1: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="AP2">
                  <Form.Label className="ATBJformLabel">Segundo Apellido:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Segundo Apellido"
                    name="AP2"
                    className="ATBJFormInput"
                    value={registrodatos?.AP2 ? registrodatos?.AP2: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        AP2: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="ATBJformfila">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <Form.Group controlId="FN">
                  <Form.Label className="ATBJformLabel">FECHA DE NACIMIENTO:</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="FN"
                    maxLength="4"
                    className="ATBJFormInput"
                    value={registrodatos?.FN ? registrodatos?.FN: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        FN: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="SEXO">
                  <Form.Label className="ATBJformLabel">SEXO:</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="SEXO"
                    className="ATBJFormInput"
                    value={registrodatos?.SEXO ? registrodatos?.SEXO: ""} // Mostrar el valor actual de SEXO
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos,
                        SEXO: e.target.value, // Actualizar con "M" o "F"
                      });
                    }}
                  >
                    {!actualizar && <option value="">Seleccionar Sexo</option>}
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="ESTADOCIVIL">
                  <Form.Label className="ATBJformLabel">ESTADO CIVIL:</Form.Label>
                  <Form.Control
                        required
                        as="select"
                        name="NACIONALIDAD"
                        className="ATBJFormInput"
                        value={registrodatos?.ESTADOCIVIL ? registrodatos?.ESTADOCIVIL : ""}
                        onChange={(e) => {
                          setRegistrodatos({
                            ...registrodatos,
                            ESTADOCIVIL: e.target.value, // Actualizar el estado con el valor seleccionado
                          });
                        }}
                      >
                    {!actualizar && <option value="">Seleccionar Estado Civil</option>}                    
                      <option value="Soltero(a)">Soltero(a)</option>
                      <option value="Casado(a)">Casado(a)</option> 
                      <option value="Divorciad(a)">Divorciad(a)</option>
                      <option value="Viudo(a)">Viudo(a)</option>                  
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="NACIONALIDAD">
                  <Form.Label className="ATBJformLabel">Nacionalidad:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Segundo Apellido"
                    name="NACIONALIDAD"
                    className="ATBJFormInput"
                    value={registrodatos?.NACIONALIDAD ? registrodatos?.NACIONALIDAD: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        NACIONALIDAD: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="ATBJformfila">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <Form.Group controlId="PAISRESIDENCIA">
                  <Form.Label className="ATBJformLabel">PAÍS DE RESIDENCIA:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="País de Residencia"
                    name="PAISRESIDENCIA"
                    className="ATBJFormInput"
                    value={registrodatos?.PAISRESIDENCIA ? registrodatos?.PAISRESIDENCIA: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PAISRESIDENCIA: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="PROFESIONOFICIO">
                  <Form.Label className="ATBJformLabel">PROFESIÓN U OFICIO</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Profesión u Oficio "
                    name="PROFESIONOFICIO"
                    className="ATBJFormInput"
                    value={registrodatos?.PROFESIONOFICIO ? registrodatos?.PROFESIONOFICIO: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PROFESIONOFICIO: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CORREO">
                  <Form.Label className="ATBJformLabel"> CORREO: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Correo"
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
                <Form.Group controlId="NITDUI">
                  <Form.Label className="ATBJformLabel">NIT / DUI:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Segundo Apellido"
                    name="NITDUI"
                    className="ATBJFormInput"
                    value={registrodatos?.NITDUI ? registrodatos?.NITDUI: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        NITDUI: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="ATBJformfila">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <Form.Group controlId="PASAPORTE">
                  <Form.Label className="ATBJformLabel">PASAPORTE:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Pasaporte"
                    name="PASAPORTE"
                    className="ATBJFormInput"
                    value={registrodatos?.PASAPORTE ? registrodatos?.PASAPORTE: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PASAPORTE: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="VIVIENDA">
                    <Form.Label className="ATBJformLabel">VIVIENDA:</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      name="VIVIENDA"
                      className="ATBJFormInput"
                      value={registrodatos?.VIVIENDA ? registrodatos?.VIVIENDA: ""} // Mostrar el valor actual de SEXO
                      onChange={(e) => {
                        setRegistrodatos({
                          ...registrodatos,
                          VIVIENDA: e.target.value, // Actualizar con "M" o "F"
                        });
                      }}
                    >
                      {!actualizar && <option value="">Seleccionar Vivienda</option>}  
                      <option value="Propia">Propia</option>
                      <option value="Alquilada">Alquilada</option>
                      <option value="Familiar">Familiar</option>
                      <option value="Otra">Otra</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="TIEMPORESIDIR">
                  <Form.Label className="ATBJformLabel"> TEIMPO DE RESIDIR: </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    placeholder="Tiempo de Residir"
                    name="TIEMPORESIDIR"
                    className="ATBJFormInput"
                    value={registrodatos?.TIEMPORESIDIR ? registrodatos?.TIEMPORESIDIR: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        TIEMPORESIDIR: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="TEL">
                  <Form.Label className="ATBJformLabel">TELÉFONO:</Form.Label>
                  <Form.Control
                    required
                    type="TEL"
                    placeholder="Segundo Apellido"
                    name="TEL"
                    className="ATBJFormInput"
                    value={registrodatos?.TEL ? registrodatos?.TEL: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        TEL: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="ATBJformfila">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <Form.Group controlId="PERCONNOMBRE">
                  <Form.Label className="ATBJformLabel">NOMBRE PERSONA CONTACTO:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Persona Contacto"
                    name="PERCONNOMBRE"
                    className="ATBJFormInput"
                    value={registrodatos?.PERCONNOMBRE ? registrodatos?.PERCONNOMBRE: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PERCONNOMBRE: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="PERCONPARENTESCO">
                  <Form.Label className="ATBJformLabel">PARENTESCO:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Parentesco"
                    name="PERCONPARENTESCO"
                    className="ATBJFormInput"
                    value={registrodatos?.PERCONPARENTESCO ? registrodatos?.PERCONPARENTESCO: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PERCONPARENTESCO: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
                </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="PERCONTEL">
                  <Form.Label className="ATBJformLabel"> TELÉFONO PERSONA CONTACTO: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Teléfono Persona Contacto"
                    name="PERCONTEL"
                    className="ATBJFormInput"
                    value={registrodatos?.PERCONTEL ? registrodatos?.PERCONTEL: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PERCONTEL: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="DIRECCION">
                  <Form.Label className="ATBJformLabel"> DIRECCIÓN: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Dirección"
                    name="DIRECCION"
                    className="ATBJFormInput"
                    value={registrodatos?.DIRECCION ? registrodatos?.DIRECCION: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        DIRECCION: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="DESCRIPCION">
                  <Form.Label className="ATBJformLabel"> COMENTARIO ADICIONAL: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Descripción"
                    name="DESCRIPCION"
                    className="ATBJFormInput"
                    value={registrodatos?.DESCRIPCION ? registrodatos?.DESCRIPCION: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        DESCRIPCION: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
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
      </>
    );
};


export default PersonasAcciones;