import { React, useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";
//-----[REDUX TOOLKIT]-----
import { useEnvrempMutation, useObtEmp_Cat019Query } from "../../../redux/servicio/GenericApi.js";
//import { useSelector } from "react-redux";

//----[CATALOGO]----
import Catalogos from "../../../admin/catalogos/Catalogos.js";

//---[ COMPONENETE SELECT INPUT ]---------------------------------
const SelectComp = ({
  inputvalue,
  cambiosForm,
  NAME,
  ObtOpciones,
  ObtOpcioneSuccess,
  LABEL,
  FILTRODEPARTAMENTO,
}) => {
  //VERIFICAR SI ESTA EN USO
  //console.log(FILTRODEPARTAMENTO);
  //let temp4 = "";
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
            CODE: reg["Codigo"],
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
            CODE: reg["Codigo"],
          };
          return returnObject;
        });
        filterarray = arrayOpciones.current;
        break;

      case "IDCAT13":
        arrayOpciones.current = ObtOpciones.map(function (reg) {
          filterarray = arrayOpciones.current;
          returnObject = {
            IDCAT12: reg["Departamento"],
            ID: reg["id"],
            NOMBRE: reg["Valores"],
          };
          return returnObject;
        });

        if (FILTRODEPARTAMENTO) {
          filterarray = arrayOpciones.current.filter(
            (e) => e.IDCAT12 === FILTRODEPARTAMENTO
          );
        } else {
          filterarray = arrayOpciones.current;
        }
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
        readOnly
        aria-autocomplete="none"
        autoComplete="off"
        name={NAME}
        className="ATBJFormInput"
        value={(() => {
          let temp44 = inputvalue(NAME);
          return temp44;
        })()}
        onChange={(e) => {
          cambiosForm(e);
        }}
      >
        <option value="0" defaultValue>Seleccionar</option>
        {filterarray.map((option, i) => (
          <option key={i} c={option.CODE} value={option.ID}>
            {option.NOMBRE}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

//--------------------------
const EditarEmpresa = ({ dataperfilempresa }) => {
  //---[ VARIABLES Y CONSTANTES ]

  let arrayOpciones = [];
  const [optiondatalist, setOptiondatalist] = useState([]);
  const [filtroDepartamento, SetFiltroDepartamento] = useState(null);
  const [registrodatos, setRegistrodatos] = useState({});
  const [cam, setCam] = useState(null);
  let temp4 = "";

  //---[ OBTENER TIPO DE ACTIVIDAD ECONOMICA ]---
  const [OBtcam, setOBtcam] = useState(null);

  useEffect(() => {
    setOBtcam({
      ID: 1,
      controller: "EmpCat019Controller",
      accion: "LXID",
    });
  }, []); // Se ejecuta solo una vez cuando cambia IDPEmpresaSelec

  //---[ REDUX TOOLKIT QUERY]---
  // Solo ejecuta si OBtcam no es null

  const { data: dataEmpCat019 } = useObtEmp_Cat019Query(OBtcam,{ skip: !OBtcam });

  const [enviardata, { data: MensajeEmpresaBLM, isSuccess }] = useEnvrempMutation();

 useEffect(() => {
    //AGREGANDO EL OBJETO DE ACTIVIDAD ECONOMICA A REGISTRO DE DATOS PARA QUE SE PUEDA MOSTRAR EN EL FORMULARIO  
   if (Array.isArray(dataEmpCat019)) {
     const opciones = dataEmpCat019.reduce((acc, reg) => {
       acc[reg.NOMBRE] = `${reg.COD}: ${reg.VALS}`;
       return acc;
     }, {});    
    
    setRegistrodatos((registrodatos) => {
      const nuevoEstado = {
        ...registrodatos,
        ...opciones,
      };
      return nuevoEstado;
    });
    
   }
 }, [dataEmpCat019]);

  useEffect(() => {
    if (dataperfilempresa) {      
      setRegistrodatos((prevState) => ({
        ...prevState,
        ...dataperfilempresa, // Mantén el valor de "primaria"
      }));
      setCam({ controller: "EmpresasController", accion: "actualizar" });
    } else {
      setCam({ controller: "EmpresasController", accion: "agregar" });
    }
  }, [dataperfilempresa]);

  useEffect(() => {
    //ACTUAR EN CAMBIOS DE ACTUALIZAR EL SERVIDOR
    if (isSuccess) {
      if (MensajeEmpresaBLM) {
        toast(MensajeEmpresaBLM.E, {
          duration: 4000,
          position: "top-center",
          className: "toaststyle",
          id: "ActualizarEmpresa",
        });
      }
    }
  }, [MensajeEmpresaBLM, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log(registrodatos);
    let enviardataApi = {
      controller: cam.controller,
      accion: cam.accion,
      ...registrodatos,
    };
    //e.target.reset();
    enviardata(enviardataApi);
    toast.remove();
  };

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
      SetFiltroDepartamento(
        e.target.options[e.target.selectedIndex].getAttribute("c")
      );
      //console.log(e.target.options[e.target.selectedIndex].getAttribute("c"));
      document.getElementById("IDCAT13").selectedIndex = 0;
    }
  }

  function filter1(e) {
    const valor = e.target.value;
    let returnObject = [];
    arrayOpciones = Catalogos.cat019.map(function (reg) {
        if (reg["Valores"].includes(valor)) {
          returnObject = { COD: reg["Codigo"], VAL: reg["Valores"] };
          return returnObject;
        } else {
          return undefined;
        }
      })
      .filter((notUndefined) => notUndefined !== undefined); //Si no lo encuentra no trate de incluirlo en el registro
    //console.log(arrayOpciones);
    setRegistrodatos({
      ...registrodatos,
      [e.target.name]: e.target.value,
    });
    setOptiondatalist(arrayOpciones);
  }

  return (
    <>
      <div className="container mx-auto contenedor">
        <div className="Titulo">Editar Perfil de la Empresa </div>
        <Form className="ATBJform" onSubmit={handleSubmit} method="POST">
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="NEMPRE">
                <Form.Label className="ATBJformLabel"> Nombre: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre de la Empresa"
                  name="NEMPRE"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("NEMPRE");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="RAZSOC">
                <Form.Label className="ATBJformLabel">Razón Social:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Razón Social"
                  name="RAZSOC"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("RAZSOC");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="GIRO">
                <Form.Label className="ATBJformLabel">
                  Giro del Comercio:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Giro del Comercio"
                  name="GIRO"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("GIRO");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="NIT">
                <Form.Label className="ATBJformLabel">NIT/DUI:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="NIT/DUI"
                  name="NIT"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("NIT");
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
              <Form.Group controlId="NRC">
                <Form.Label className="ATBJformLabel">NRC:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="NRC"
                  name="NRC"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("NRC");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="EMAIL">
                <Form.Label className="ATBJformLabel">EMAIL:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="EMAIL"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("EMAIL");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="WEBP">
                <Form.Label className="ATBJformLabel">Página Web:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Página Web"
                  name="WEBP"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("WEBP");
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
              <Form.Group controlId="TIPOEMPRESA">
                <Form.Label className="ATBJformLabel">Tipo:</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="TIPOEMPRESA"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("TIPOEMPRESA");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                >
                  <option value="" defaultValue>
                    Seleccionar
                  </option>
                  <option value="Nacional">Nacional</option>
                  <option value="Internacional">Internacional</option>
                  <option value="Gubernamental">Gubernamental</option>
                  <option value="Autonoma">Autonoma</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={8} lg={6} xl={6}>
              <Form.Group controlId="COMEADIC">
                <Form.Label className="ATBJformLabel">
                  Comentario adicional:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="COMEADIC"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("COMEADIC");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />
          <hr />
          <div>Datos de la Sucursal Principal</div>
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
                NAME={"IDCAT20"}
                ObtOpciones={Catalogos.cat020}
                ObtOpcioneSuccess={true}
                LABEL={"País:"}
                inputvalue={inputvalue}
                cambiosForm={cambiosForm}
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <SelectComp
                NAME={"IDCAT12"}
                ObtOpciones={Catalogos.cat012}
                ObtOpcioneSuccess={true}
                LABEL={"Departamento:"}
                inputvalue={inputvalue}
                cambiosForm={cambiosForm}
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <SelectComp
                NAME={"IDCAT13"}
                ObtOpciones={Catalogos.cat013}
                ObtOpcioneSuccess={true}
                LABEL={"Municipios:"}
                inputvalue={inputvalue}
                cambiosForm={cambiosForm}
                FILTRODEPARTAMENTO={filtroDepartamento}
              />
            </Col>
          </Row>
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <Form.Group controlId="UBI">
                <Form.Label className="ATBJformLabel">Ubicación:</Form.Label>
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
          </Row>

          <br />
          <hr />
          <div>Actividad Ecónomica</div>
          <Row className="ATBJformfila">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group controlId="primaria">
                <label htmlFor="primaria" className="form-label ATBJformLabel"> Primaria: </label>
                <input
                  required
                  type="text"
                  placeholder="Buscar"
                  name="primaria"
                  className="ATBJFormInput form-control"
                  value={(() => {
                    temp4 = inputvalue("primaria");
                    return temp4;
                  })()}
                  onChange={filter1}
                  list="acteco"
                  autoComplete="off"
                />
                <datalist id="acteco">
                  {optiondatalist.map((option, i) => (
                    <option key={i} value={option.COD + ": " + option.VAL} />
                  ))}
                  {Catalogos.cat019.map(function (reg, i) {                 
                      let returnObject = { COD: reg["Codigo"], VAL: reg["Valores"] };
                      return (
                        <option key={i} value={returnObject.COD + ": " + returnObject.VAL} />
                      );                     
                  })}
                </datalist>
              </Form.Group>
            </Col>
          </Row>
          <Row className="ATBJformfila">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group controlId="secundaria">
                <label
                  htmlFor="secundaria"
                  className="form-label ATBJformLabel"
                >
                  {" "}
                  Secundaria:{" "}
                </label>
                <input
                  required
                  type="text"
                  placeholder="Buscar"
                  name="secundaria"
                  className="ATBJFormInput form-control"
                  value={(() => {
                    temp4 = inputvalue("secundaria");
                    return temp4;
                  })()}
                  onChange={filter1}
                  list="acteco2"
                  autoComplete="off"
                />
                <datalist id="acteco2">
                  {optiondatalist.map((option, i) => (
                    <option key={i} value={option.COD + ": " + option.VAL} />
                  ))}
                  {Catalogos.cat019.map(function (reg, i) {                 
                      let returnObject = { COD: reg["Codigo"], VAL: reg["Valores"] };
                      return (
                        <option key={i} value={returnObject.COD + ": " + returnObject.VAL} />
                      );                     
                  })}
                </datalist>
              </Form.Group>
            </Col>
          </Row>
          <Row className="ATBJformfila">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group controlId="terciaria">
                <label htmlFor="terciaria" className="form-label ATBJformLabel">
                  Terciaria:
                </label>
                <input
                  required
                  type="text"
                  placeholder="Buscar"
                  name="terciaria"
                  className="ATBJFormInput form-control"
                  value={(() => {
                    temp4 = inputvalue("terciaria");
                    return temp4;
                  })()}
                  onChange={filter1}
                  list="acteco3"
                  autoComplete="off"
                />
                <datalist id="acteco3">
                  {optiondatalist.map((option, i) => (
                    <option key={i} value={option.COD + ": " + option.VAL} />
                  ))}
                  {Catalogos.cat019.map(function (reg, i) {                 
                      let returnObject = { COD: reg["Codigo"], VAL: reg["Valores"] };
                      return (
                        <option key={i} value={returnObject.COD + ": " + returnObject.VAL} />
                      );                     
                  })}
                </datalist>
              </Form.Group>
            </Col>
          </Row>

          <br />
          <hr />
          <div>Contácto Principal de la Empresa</div>
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CPRINC" sm={6} md={3}>
                <Form.Label className="ATBJformLabel">Nombre:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre"
                  name="CPRINC"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("CPRINC");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CDUI">
                <Form.Label className="ATBJformLabel">DUI:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="DUI"
                  name="CDUI"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("CDUI");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CEMAIL">
                <Form.Label className="ATBJformLabel">
                  Correo Electrónico:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Correo Electrónico"
                  name="CEMAIL"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("CEMAIL");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CTEL">
                <Form.Label className="ATBJformLabel">Teléfono: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Teléfono"
                  name="CTEL"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("CTEL");
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
              <Form.Group controlId="CAREA" sm={6} md={3}>
                <Form.Label className="ATBJformLabel">
                  Area a la que pertenece:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Area"
                  name="CAREA"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("CAREA");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CCARGO">
                <Form.Label className="ATBJformLabel">Cargo Actual:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Cargo"
                  name="CCARGO"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("CCARGO");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={12} md={8} lg={6} xl={6}>
              <Form.Group controlId="CDESCRIP" sm={6} md={3}>
                <Form.Label className="ATBJformLabel">Descripción:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Descripción"
                  name="CDESCRIP"
                  className="ATBJFormInput"
                  value={(() => {
                    temp4 = inputvalue("CDESCRIP");
                    return temp4;
                  })()}
                  onChange={(e) => {
                    cambiosForm(e);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <hr />
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
              <Button variant="flat" size="xxl" type="submit">
                Actualizar Información
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditarEmpresa;
