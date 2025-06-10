import { React, useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import {useEnvsucursalesMutation,} from "../../../../redux/servicio/GenericApi";

//----[CATALOGO]----
import  Catalogos  from "../../../../admin/catalogos/Catalogos.js";

const AccionesSucursales = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [actualizar, setActualizar] = useState("");
  const [fijartitulo, setFijarTitulo] = useState("");
  const [objtemp1, setObjtemp1] = useState("");
  let temp4 = "";
  const [filtroDepartamento, SetFiltroDepartamento] = useState(null);
  const [sucursalescam, setSucursalescam] = useState(null);

  //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR]-----
  const [enviardata, { data, isSuccess }] = useEnvsucursalesMutation();

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

      setSucursalescam((sucursalescam) => {
        const nuevoEstado = {
          IDEMPRE: IDEMPRE,
          controller: "SucursalesController",
          accion: sel,
          ...objtemp1,
          ...registrodatos,
        };
        return nuevoEstado;
      });
    };

  //-----[ Usar useEffect para reaccionar al cambio en sucursalescam ]-----
    useEffect(() => {
      if (sucursalescam) {
        //console.log(sucursalescam); // Ahora verás el valor actualizado
        enviardata(sucursalescam); // Enviar los datos después de que se actualice
      }
    }, [sucursalescam, enviardata]);


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

  //---[ FORMULARIO ]
    const inputvalue = (v) => {
      let temp5 = "";
      temp5 = registrodatos?.[v] ? registrodatos?.[v] : "";
      return temp5;
    };

    function cambiosForm(e) {
      setRegistrodatos({
        ...registrodatos,
        [e.target.name]: e.target.value,
      });

      if (e.target.name === "IDCAT12") {
        const idBuscado = +e.target.value;
        const objetoEncontrado = Catalogos.cat012.find(
          (item) => item.id === idBuscado
        );
        const codigo = objetoEncontrado ? objetoEncontrado.Codigo : null;
        SetFiltroDepartamento(codigo);
      }
    }

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
                <Form.Group controlId="CODSUC">
                  <Form.Label className="ATBJformLabel">
                    Código de Sucursal:
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder=" (4 carácteres máximo)"
                    name="CODSUC"
                    maxLength="4"
                    className="ATBJFormInput"
                    value={(() => {
                      temp4 = inputvalue("CODSUC");
                      return temp4;
                    })()}
                    onChange={(e) => {
                      cambiosForm(e);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="NOMBRE">
                  <Form.Label className="ATBJformLabel">
                    Nombre de la Sucursal:
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nombre de la Sucursal "
                    name="NOMBRE"
                    className="ATBJFormInput"
                    value={(() => {
                      temp4 = inputvalue("NOMBRE");
                      return temp4;
                    })()}
                    onChange={(e) => {
                      cambiosForm(e);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <SelectComp
                  inputvalue={inputvalue}
                  cambiosForm={cambiosForm}
                  NAME={"IDCAT9"}
                  ObtOpciones={Catalogos.cat009}
                  ObtOpcioneSuccess={true}
                  LABEL={"Tipo de Establecimiento:"}
                />
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="TEL">
                  <Form.Label className="ATBJformLabel">Télefono:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Télefono"
                    name="TEL"
                    className="ATBJFormInput"
                    value={(() => {
                      temp4 = inputvalue("TEL");
                      return temp4;
                    })()}
                    onChange={(e) => {
                      cambiosForm(e);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <SelectComp
                  inputvalue={inputvalue}
                  cambiosForm={cambiosForm}
                  NAME={"IDCAT20"}
                  ObtOpciones={Catalogos.cat020}
                  ObtOpcioneSuccess={true}
                  LABEL={"País:"}
                />
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <SelectComp
                  inputvalue={inputvalue}
                  cambiosForm={cambiosForm}
                  NAME={"IDCAT12"}
                  ObtOpciones={Catalogos.cat012}
                  ObtOpcioneSuccess={true}
                  LABEL={"Departamento:"}
                />
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <SelectComp
                  inputvalue={inputvalue}
                  cambiosForm={cambiosForm}
                  NAME={"IDCAT13"}
                  ObtOpciones={Catalogos.cat013}
                  ObtOpcioneSuccess={true}
                  LABEL={"Municipio:"}
                  FILTRODEPARTAMENTO={filtroDepartamento}
                />
              </Col>
            </Row>

            <Row className="ATBJformfila">

              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="UBI">
                  <Form.Label className="ATBJformLabel">Complemento de la Dirección:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Complemento de la Dirección:"
                    name="UBI"
                    className="ATBJFormInput"
                    value={(() => {
                      temp4 = inputvalue("UBI");
                      return temp4;
                    })()}
                    onChange={(e) => {
                      cambiosForm(e);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="DESCRIP">
                  <Form.Label className="ATBJformLabel">Comentario Adicional:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Comentario Adicional"
                    name="DESCRIP"
                    className="ATBJFormInput"
                    value={(() => {
                      temp4 = inputvalue("DESCRIP");
                      return temp4;
                    })()}
                    onChange={(e) => {
                      cambiosForm(e);
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

//---[COMPONENETE SELECT INPUT]---------------------------------
  const SelectComp = ({
    inputvalue,
    cambiosForm,
    NAME,
    ObtOpciones,
    ObtOpcioneSuccess,
    LABEL,
    FILTRODEPARTAMENTO,
  }) => {
    let temp4 = "";
    let arrayOpciones = useRef([]);
    let returnObject = [];
    let filterarray = [];

    if (ObtOpcioneSuccess) {
      switch (NAME) {
        case "IDCAT20":
          arrayOpciones.current = ObtOpciones.map(function (reg) {
            returnObject = {
              ID: reg["id"],
              NOMBRE: reg["Valores"],
            };
            return returnObject;
          });
          filterarray = arrayOpciones.current;
          break;
        case "IDCAT9":
          arrayOpciones.current = ObtOpciones.map(function (reg) {
            returnObject = {
              ID: reg["id"],
              NOMBRE: reg["Valores"],
            };
            return returnObject;
          });
          filterarray = arrayOpciones.current;
          break;
        case "IDCAT12":
          arrayOpciones.current = ObtOpciones.map(function (reg) {
            returnObject = {
              ID: reg["id"],
              NOMBRE: reg["Valores"],
            };
            return returnObject;
          });
          filterarray = arrayOpciones.current;
          break;
        case "IDCAT13":
          arrayOpciones.current = ObtOpciones.map(function (reg) {
              returnObject = {
              CODEDEPAR: reg["Departamento"],
              ID: reg["id"],
              NOMBRE: reg["Valores"],
            };
            return returnObject;
          });

          if (FILTRODEPARTAMENTO) {
            console.log(FILTRODEPARTAMENTO);
            filterarray = arrayOpciones.current.filter(
              (e) => e.CODEDEPAR === FILTRODEPARTAMENTO
            );
          } else {
            filterarray = arrayOpciones.current;
          }
          //console.log(filterarray);
          break;
        default:
      }
    }

    return (
      <Form.Group controlId={NAME}>
        <Form.Label className="ATBJformLabel">{LABEL}</Form.Label>
        <Form.Control
          required
          as="select"
          name={NAME}
          className="ATBJFormInput"
          value={(() => {
            temp4 = inputvalue(NAME);
            return temp4;
          })()}
          onChange={(e) => {
            cambiosForm(e);
          }}
        >
          <option value="" defaultValue> Seleccionar </option>
          {filterarray.map((option, i) => (
            <option key={i} value={option.ID}> {option.NOMBRE} </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  };

export default AccionesSucursales;
