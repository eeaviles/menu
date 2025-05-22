import { React, useEffect, useState, useRef, useCallback } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import {useEnvproductosfileMutation, useLazyObtcategoriasQuery } from "../../../../redux/servicio/GenericApi";

const ProductosAcciones = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [actualizar, setActualizar] = useState(true);
  const [fijartitulo, setFijarTitulo] = useState("");
  const formRef = useRef(null); // Referencia al formulario
  const [toastShown, setToastShown] = useState(false); // Estado para controlar el toast
  const [imagenPreview, setImagenPreview] = useState(null); // Estado para la previsualización de la imagen
  const [imagen, setImagen] = useState(null); // Estado para almacenar el archivo de imagen seleccionado

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file); // Guardar el archivo seleccionado
      setImagenPreview(URL.createObjectURL(file)); // Generar una URL para previsualizar la imagen
    }
  };

    //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR]-----
    const [enviardata, { data, isSuccess }] = useEnvproductosfileMutation();
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
    }, [DATOS]);  

    //---[ QUERY: OBTENER LISTA DE AREAS ]----    
      const [trigger, { data: ListaCategorias,}] = useLazyObtcategoriasQuery();
      const ObPtbjos = useCallback(() => {   
        trigger({
            controller: "CategoriasController",
            accion: "LIPF",
          });
      }, [trigger]);       

      useEffect(() => {
          if (actualizar===false) {
              ObPtbjos();
          }
      }, [actualizar, ObPtbjos]);

  //-----[ MANEJAR EL ENVIO DE FORMULARIO ]-----
    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
    
      // Crear una instancia de FormData
      const formData = new FormData();
    
      // Agregar los datos del formulario a FormData
      formData.append("IDEMPRE", IDEMPRE);
      formData.append("controller", "ProductosController");
      formData.append("accion", actualizar ? "AC" : "AG");
    
      // Agregar los datos de registrodatos
      Object.keys(registrodatos).forEach((key) => {
        formData.append(key, registrodatos[key]);
      });
    
      // Agregar la imagen si está seleccionada
      if (imagen) {
        formData.append("image", imagen);
      }
    
      // Enviar los datos a la API usando RTK Query
      enviardata(formData);
    
      // Limpiar el formulario y la previsualización
      if (formRef.current) {
        formRef.current.reset();
      }
      setRegistrodatos([]);
      setImagen(null);
      setImagenPreview(null);
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
          <div className="Titulo">
            {fijartitulo} {ETIQUETA}
          </div>

          <Form ref={formRef} className="ATBJform" onSubmit={handleSubmit} method="POST">
            {!actualizar && ( 
              <Row className="ATBJformfila">
                <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Form.Group controlId="IDCAT">
                      <Form.Label className="ATBJformLabel">Categorías:</Form.Label>
                      <Form.Control
                          required
                          as="select"
                          name="IDCAT"
                          className="ATBJFormInput"
                          value={registrodatos?.IDCAT ? registrodatos?.IDCAT: ""}
                          onChange={(e) => {
                              setRegistrodatos((prev) => ({
                                ...prev,
                                IDCAT: e.target.value, // Actualizar IDSUC
                              }));

                          }}
                      >
                          {!actualizar && (<option value="" defaultValue>Seleccionar</option>)}
                          {ListaCategorias?.map((categorias, index) => (
                          <option key={`${categorias.IDCAT}-${index}`} value={categorias.IDCAT}>
                              {categorias.NOMBRECAT}
                          </option>  
                            ))}
                      </Form.Control>
                    </Form.Group>
                </Col>     
              </Row>
            )}           
            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="PRODNOM">
                  <Form.Label className="ATBJformLabel">Nombre del Producto:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nombre del producto"
                    name="PRODNOM"
                    className="ATBJFormInput"
                    value={registrodatos?.PRODNOM ? registrodatos?.PRODNOM: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PRODNOM: e.target.value, // Actualizar solo ANBRE
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="PASWD">
                  <Form.Label className="ATBJformLabel"> Precio Grande: </Form.Label>                
                    <Form.Control         
                      type="number"
                      step={0.01}
                      placeholder="Precio Grande"
                      min={0.00}
                      name="PRECIOG"
                      className="ATBJFormInput"
                      value={registrodatos?.PRECIOG ? registrodatos?.PRECIOG: ""}
                      onChange={(e) => {
                        setRegistrodatos({
                          ...registrodatos, // Mantener las demás propiedades
                          PRECIOG: e.target.value, // Actualizar solo ANBRE
                        });
                      }}
                    />                 
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="PRECIOP">
                  <Form.Label className="ATBJformLabel">Precio Pequeño: </Form.Label>
                  <Form.Control  
                    required      
                    type="number"     
                    min={0.00}  
                    step={0.01}          
                    placeholder="Precio Pequeño"
                    name="PRECIOP"
                    className="ATBJFormInput"
                    value={registrodatos?.PRECIOP ? registrodatos?.PRECIOP: ""}
                    onChange={(e) => {
                      setRegistrodatos({
                        ...registrodatos, // Mantener las demás propiedades
                        PRECIOP: e.target.value, // Actualizar solo ANBRE
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
            </Row>
            <Row className="ATBJformfila">
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                <Form.Group controlId="image">
                  <Form.Label className="ATBJformLabel">Imagen:</Form.Label>
                  <Form.Control             
                    type="file"
                    name="image"
                    className="ATBJFormInput"
                    accept="image/*"
                    onChange={handleImageChange} // Manejar el cambio de imagen
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              {/* Mostrar la previsualización de la imagen */}
              {imagenPreview && (
                <div
                  style={{
                    marginTop: "5px",
                    textAlign: "center",
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)", // Sombra en el borde
                    padding: "10px", // Espaciado interno para que la sombra no toque el contenido
                    borderRadius: "5px", // Bordes redondeados opcionales
                  }}
                >
                  {/* Etiqueta para la imagen previsualizada */}
                  <span style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Imagen Seleccionada:
                  </span>
                  <img
                    src={imagenPreview}
                    alt="Previsualización"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </div>
              )}
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

export default ProductosAcciones;