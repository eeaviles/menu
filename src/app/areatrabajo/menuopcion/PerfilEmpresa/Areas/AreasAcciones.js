import { React, useEffect, useState} from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import {useEnvareasMutation, useObtsucursalesQuery } from "../../../../redux/servicio/GenericApi";

const AreasAcciones = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [actualizar, setActualizar] = useState("");
  const [fijartitulo, setFijarTitulo] = useState("");
  const [objtemp1, setObjtemp1] = useState("");
  const [areascam, setAreascam] = useState(null);

   //-----[ OBTENER CATALOGO DE SUCURSALES ]-----

      //---[ QUERY: OBTENER LISTA DE SUCURSALES ]----
      const [OBtcam, setOBtcam] = useState(null);
      useEffect(() => {
        setOBtcam({
          controller: "SucursalesController",
          accion: "LIPF", //---[ Listar para formulario input select ]---
          ID: IDEMPRE,
        });
      }, [IDEMPRE]);
      const { data: ListaSucursales } = useObtsucursalesQuery(OBtcam,{ skip: !OBtcam }); 
  
  //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR TABLAS AREAS]-----
  const [enviardata, { data, isSuccess }] = useEnvareasMutation();

  useEffect(() => {
    if (DATOS !== "") {
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
      
        setRegistrodatos((prev) => {
          const nuevoEstado = {
            controller: "AreasController",
            accion: sel,
            ...objtemp1,
            ...prev, // Usar el estado más reciente
          };
      
          setAreascam(nuevoEstado); // Actualizar areascam con los valores correctos
          return prev; // Retornar el estado sin cambios
        });
      };

      //-----[ Usar useEffect para reaccionar al cambio en areascam ]-----
      useEffect(() => {
        if (areascam) {
            enviardata(areascam); // Enviar los datos después de que se actualice
        }
      }, [areascam, enviardata]);


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
  /*
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
  */
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
                <Form.Group controlId="CODAREA">
                  <Form.Label className="ATBJformLabel">Código de Área:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder=" (4 carácteres máximo)"
                    name="CODAREA"
                    maxLength="4"
                    className="ATBJFormInput"
                    value={registrodatos?.CODAREA ? registrodatos?.CODAREA: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        CODAREA: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group controlId="ANBRE">
                <Form.Label className="ATBJformLabel">Nombre del Área:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre de la Sucursal"
                  name="ANBRE"
                  className="ATBJFormInput"
                  value={registrodatos?.ANBRE ? registrodatos?.ANBRE : ""}
                  onChange={(e) => {
                    setRegistrodatos({
                      ...registrodatos, // Mantener las demás propiedades
                      ANBRE: e.target.value, // Actualizar solo ANBRE
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
                        value={registrodatos?.IDSUC ? registrodatos?.IDSUC : ""}
                        onChange={(e) => {
                          setRegistrodatos({
                            ...registrodatos,
                            IDSUC: e.target.value, // Actualizar el estado con el valor seleccionado
                          });
                        }}
                      >
                      <option value="" defaultValue>{registrodatos?.NSUC ? registrodatos?.NSUC : ""}</option>
                      {ListaSucursales?.map((sucursal) => (
                        <option key={sucursal.IDSUC} value={sucursal.IDSUC}>{sucursal.NSUC}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="ATBJformfila">

              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="DESCRIP">
                  <Form.Label className="ATBJformLabel">Comentario Adicional:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Comentario Adicional"
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
      </>
    );
};

export default AreasAcciones;