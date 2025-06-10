import { React, useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button  } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import {useEnvcategoriasMutation} from "../../../../redux/servicio/GenericApi";

const CategoriasAcciones = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [actualizar, setActualizar] = useState("");
  const [fijartitulo, setFijarTitulo] = useState("");
  const formRef = useRef(null); // Referencia al formulario
  const [toastShown, setToastShown] = useState(false); // Estado para controlar el toast
  const opcionesTipoCategoria = [
    { value: "P", label: "Programada" },
    { value: "G", label: "Generico" },
  ];

  //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR]-----
  const [enviardata, { data, isSuccess }] = useEnvcategoriasMutation();
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
      let accion = actualizar ? "AC" : "AG";
      const datosEnviar = {
        IDEMPRE,
        controller: "CategoriasController",
        accion,
        ...registrodatos,
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
        <div className="container mx-auto  ">
          <div className="Titulo"> {fijartitulo} {ETIQUETA} </div>
          <Form ref={formRef} className="ATBJform" onSubmit={handleSubmit} method="POST">
            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="NOMBRECAT">
                  <Form.Label className="ATBJformLabel">Nombre de la categoría:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nombre de la Categoría "
                    name="NOMBRECAT"
                    className="ATBJFormInput"
                    value={registrodatos?.NOMBRECAT ? registrodatos?.NOMBRECAT: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        NOMBRECAT: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="TIPOCAT">
                  <Form.Label className="ATBJformLabel">Tipo de Categoría:</Form.Label>
                  <Form.Control
                      required
                      as="select"
                      name="TIPOCAT"
                      className="ATBJFormInput"
                      value={registrodatos?.TIPOCAT ? registrodatos?.TIPOCAT: ""}
                      onChange={(e) => {
                          setRegistrodatos((prev) => ({
                            ...prev,
                            TIPOCAT: e.target.value, 
                          }));

                      }}
                  >
                      {!actualizar && (<option value="" defaultValue>Seleccionar</option>)}

                      {/* Mostrar la opción actual si actualizar es true */}
                      {actualizar && (
                        <option value={registrodatos.TIPOCAT}>
                          {opcionesTipoCategoria.find((opcion) => opcion.value === registrodatos.TIPOCAT)?.label || "Seleccionar"}
                        </option>
                      )}   

                      {opcionesTipoCategoria.map((opcion) => (
                        <option key={opcion.value} value={opcion.value}>
                          {opcion.label}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>   
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="DESCCAT">
                    <Form.Label className="ATBJformLabel"> Descripción: </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Descripción"
                      name="DESCCAT"
                      className="ATBJFormInput"
                      value={registrodatos?.DESCCAT ? registrodatos?.DESCCAT: ""}
                      onChange={(e) => {
                        setRegistrodatos({
                          ...registrodatos, // Mantener las demás propiedades
                          DESCCAT: e.target.value, // Actualizar solo ANBRE
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
        <Toaster />
      </>
    );
};

export default CategoriasAcciones;