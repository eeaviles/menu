import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import { useEnvrempMutation } from "../../redux/servicio/GenericApi.js";
import { useSelector } from "react-redux";
import { principalSelector } from "../../redux/slices/PrincipalSlice.js";

//----[CATALOGO]----
import Catalogos  from "../../admin/catalogos/Catalogos.js";


//---[ COMPONENETE SELECT INPUT ]---------------------------------
const SelectComp = ({register,cambiosForm,NAME,ObtOpciones,ObtOpcioneSuccess,LABEL,FILTRODEPARTAMENTO}) => { //VERIFICAR SI ESTA EN USO   
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
              NOMBRE: reg["valores"],
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
          {...register(NAME)}
          onChange={(e) => {
            cambiosForm(e);
          }}
        >
          <option value="0" defaultValue>
            Seleccionar
          </option>
          {filterarray.map((option, i) => (
            <option key={i} c={option.CODE} value={option.ID}>
              {option.NOMBRE}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
};
//---[FINAL COMPONENETE SELECT INPUT]-----------------------------

//---[ COMPONENTE PRINCIPAL ]-------------------------------------
const AgregarEmpresas = () => {
  //---[ CONSTANTES ]
  const { register, handleSubmit } = useForm();

  let cam = { controller: "EmpresasController", accion: "agregar" };

  let arrayOpciones = [];
  const [optiondatalist, setOptiondatalist] = useState([]);
  const [filtroDepartamento, SetFiltroDepartamento] = useState(null);

  //---[ REDUX ]---
  const [enviardata, { data, isSuccess }] = useEnvrempMutation();

  const onSubmit = (formdata, e) => {
    console.log('Por aqui');
    let enviardataApi = {
      ...cam,
      ...formdata,      
    };
    //e.target.reset();
    enviardata(enviardataApi);
    toast.remove();
  };

  function cambiosForm(e) {
    //console.log("desde cambio form");
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
    arrayOpciones = Catalogos.cat019
      .map(function (reg) {
        if (reg["Valores"].includes(valor)) {
          returnObject = { COD: reg["Codigo"], VAL: reg["Valores"] };
          return returnObject;
        } else {
          return undefined;
        }
      })
      .filter((notUndefined) => notUndefined !== undefined); //Si no lo encuentra no trate de incluirlo en el registro
    //console.log(arrayOpciones);
    setOptiondatalist(arrayOpciones);
  }

  return (
    <>
      <div className="container mx-auto contenedor contenedorcentral">

        <div className="Titulo">Agregar Proveedor, Cliente o Persona Jurídica</div>
        <Form className="ATBJform" onSubmit={handleSubmit(onSubmit)} method="POST" >
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="NEMPRE">
                <Form.Label className="ATBJformLabel">
                  Nombre Comercial:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre de la Empresa"
                  name="NEMPRE"
                  className="ATBJFormInput"
                  {...register("NEMPRE")}
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
                  {...register("RAZSOC")}
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
                  {...register("GIRO")}
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
                  {...register("NIT")}
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
                  {...register("NRC")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="EMAIL">
                <Form.Label className="ATBJformLabel">
                  Correo Electrónico:
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="EMAIL"
                  className="ATBJFormInput"
                  {...register("EMAIL")}
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
                  {...register("WEBP")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="PROVCLIEN">
                <Form.Label className="ATBJformLabel">
                  Proveedor/Cliente:
                </Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="PROVCLIEN"
                  className="ATBJFormInput"
                  {...register("PROVCLIEN")}
                >
                  <option value="" defaultValue>
                    Seleccionar
                  </option>
                  <option value="P">Proveedor</option>
                  <option value="C">Cliente</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="TIPOEMPRESA">
                <Form.Label className="ATBJformLabel">
                  Tipo de Empresa
                </Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="TIPOEMPRESA"
                  className="ATBJFormInput"
                  {...register("TIPOEMPRESA")}
                >
                  <option value="">Seleccionar</option>
                  <option value="Nacional">Nacional</option>
                  <option value="Internacional">Internacional</option>
                  <option value="Gubernamental">Gubernamental</option>
                  <option value="Autonoma">Autonoma</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col xs={12} sm={12} md={8} lg={6} xl={6}>
              <Form.Group controlId="COMEADIC" sm={6} md={3}>
                <Form.Label className="ATBJformLabel">
                  Comentario adicional:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Comentario adicional"
                  name="COMEADIC"
                  className="ATBJFormInput"
                  {...register("COMEADIC")}
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
                  {...register("CODSUC")}
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
                  {...register("NOMBRE")}
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
                  {...register("TEL")}
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
                register={register}
                cambiosForm={cambiosForm}
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <SelectComp
                NAME={"IDCAT12"}
                ObtOpciones={Catalogos.cat012}
                ObtOpcioneSuccess={true}
                LABEL={"Departamento:"}
                register={register}
                cambiosForm={cambiosForm}
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <SelectComp
                NAME={"IDCAT13"}
                ObtOpciones={Catalogos.cat013}
                ObtOpcioneSuccess={true}
                LABEL={"Municipios:"}
                register={register}
                cambiosForm={cambiosForm}
                FILTRODEPARTAMENTO={filtroDepartamento}
              />
            </Col>
          </Row>
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <Form.Group controlId="UBI">
                <Form.Label className="ATBJformLabel">
                  Complemento de la Dirección:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Complemento de la Dirección:"
                  name="UBI"
                  className="ATBJFormInput"
                  {...register("UBI")}
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
                <label htmlFor="primaria" className="form-label ATBJformLabel">
                  Primaria:
                </label>
                <input
                  required
                  type="text"
                  placeholder="Buscar"
                  name="primaria"
                  className="ATBJFormInput form-control"
                  {...register("primaria")}
                  onChange={filter1}
                  list="acteco"
                  autoComplete="off"
                />
                <datalist id="acteco">
                  {optiondatalist.map((option, i) => (
                    <option key={i} value={option.COD + ": " + option.VAL} />
                  ))}
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
                  {...register("secundaria")}
                  onChange={filter1}
                  list="acteco"
                  autoComplete="off"
                />
                <datalist id="acteco">
                  {optiondatalist.map((option, i) => (
                    <option key={i} value={option.VAL} />
                  ))}
                </datalist>
              </Form.Group>
            </Col>
          </Row>
          <Row className="ATBJformfila">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group controlId="terciaria">
                <label htmlFor="terciaria" className="form-label ATBJformLabel">
                  {" "}
                  Terciaria:{" "}
                </label>
                <input
                  required
                  type="text"
                  placeholder="Buscar"
                  name="terciaria"
                  className="ATBJFormInput form-control"
                  {...register("terciaria")}
                  onChange={filter1}
                  list="acteco"
                  autoComplete="off"
                />
                <datalist id="acteco">
                  {optiondatalist.map((option, i) => (
                    <option key={i} value={option.VAL} />
                  ))}
                </datalist>
              </Form.Group>
            </Col>
          </Row>

          <br />
          <hr />
          <div>Contácto Principal de la Empresa a agregar</div>
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
                  {...register("CPRINC")}
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
                  {...register("CDUI")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CEMAIL">
                <Form.Label className="ATBJformLabel">
                  {" "}
                  Correo Electrónico:{" "}
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Correo Electrónico"
                  name="CEMAIL"
                  className="ATBJFormInput"
                  {...register("CEMAIL")}
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
                  {...register("CTEL")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="CAREA" sm={6} md={3}>
                <Form.Label className="ATBJformLabel">
                  Área a la que pertenece:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Area"
                  name="CAREA"
                  className="ATBJFormInput"
                  {...register("CAREA")}
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
                  {...register("CCARGO")}
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
                  {...register("CDESCRIP")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="ATBJformfila">
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
              <Button variant="flat" size="xxl" type="submit">
                Guardar Información
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Toaster />
    </>
  );
};

export default AgregarEmpresas;

/*
  <Form.Control
    type="hidden"
    id="custId"
    name="custId"
    value="3487"
  />
*/