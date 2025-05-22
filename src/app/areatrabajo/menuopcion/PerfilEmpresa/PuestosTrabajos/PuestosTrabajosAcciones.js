import { React, useEffect, useState, useCallback} from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";

//-----[REDUX TOOLKIT]-----
import {useEnvobtptbjoMutation, useObtsucursalesQuery, useLazyObtptbjoQuery } from "../../../../redux/servicio/GenericApi";

const PuestosTrabajosAcciones = ({ DATOS, IDEMPRE, closeModal, ETIQUETA }) => {

    console.log("DATOS", DATOS);
  //---[CONSTANTES FORMULARIO]
  const [registrodatos, setRegistrodatos] = useState([]);
  const [actualizar, setActualizar] = useState("");
  const [fijartitulo, setFijarTitulo] = useState("");
  const [objtemp1, setObjtemp1] = useState("");
  const [areascam, setAreascam] = useState(null);

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
        const [trigger, { data: ListaAreas,}] = useLazyObtptbjoQuery();
        const ObPtbjos = useCallback((IDSUC) => {   
            trigger({
                controller: "AreasController",
                accion: "LIPF",
                ID: IDEMPRE,
                IDPF: IDSUC,
            });
        }, [trigger, IDEMPRE]);       
          
        useEffect(() => {
            if (registrodatos?.IDSUC) {
                ObPtbjos(registrodatos.IDSUC); // Llamar a la función cuando IDSUC cambie
            }
        }, [registrodatos.IDSUC, ObPtbjos]); // Escuchar cambios en IDSUC
                
        useEffect(() => {
        if (ListaAreas?.length === 1 && !registrodatos.IDAREA) {
            setRegistrodatos((prev) => ({
            ...prev,
            IDAREA: ListaAreas[0].IDAREA, // Establecer automáticamente el único valor disponible
            }));
        }
        }, [ListaAreas, registrodatos.IDAREA]);    


  
    //-----[ENVIAR FORMULARIO PARA INSERTAR O ACTUALIZAR TABLAS PUESTOS DE TRABAJO]-----  
        const [enviardata, { data, isSuccess }] = useEnvobtptbjoMutation();
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

        const handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();          
            let sel = actualizar ? "AC" : "AG";          
            const nuevoEstado = {
              controller: "PuestosTrabajosController",
              accion: sel,
              ...objtemp1,
              ...registrodatos, // Usar el estado actualizado
            };
          
            setAreascam(nuevoEstado); // Actualizar areascam con los valores correctos
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

        useEffect(() => {
            console.log("ListaAreas:", ListaAreas);
            console.log("IDAREA en DATOS:", DATOS.IDAREA);
          }, [ListaAreas, DATOS]);

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
                    <Form.Group controlId="CODPT">
                    <Form.Label className="ATBJformLabel">Código del Puesto de Trabajo:</Form.Label>
                    <Form.Control
                        required
                        type="text"      
                        name="CODPT"      
                        className="ATBJFormInput"
                        value={registrodatos?.CODPT || ""}
                        onChange={(e) => {
                            setRegistrodatos((prev) => ({
                              ...prev, // Mantener las demás propiedades
                              CODPT: e.target.value, // Actualizar solo CODPT
                            }));
                        }}
                    />
                    </Form.Group>
                </Col>

                <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                    <Form.Group controlId="PTNOM">
                    <Form.Label className="ATBJformLabel">Nombre del Puesto de Trabajo:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="PTNOM"
                        className="ATBJFormInput"
                        value={registrodatos?.PTNOM || ""}
                        onChange={(e) => {
                            setRegistrodatos((prev) => ({
                                ...prev, // Mantener las demás propiedades
                                PTNOM: e.target.value, // Actualizar solo PTNOM
                            }));
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

                </Row>

                <Row className="ATBJformfila">

                <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Form.Group controlId="PTDESCRIP">
                    <Form.Label className="ATBJformLabel">Comentario Adicional:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Comentario Adicional"
                        name="PTDESCRIP"
                        className="ATBJFormInput"
                        value={registrodatos?.PTDESCRIP ? registrodatos?.PTDESCRIP: ""}
                        onChange={(e) => {
                        setRegistrodatos({
                            ...registrodatos, // Mantener las demás propiedades
                            PTDESCRIP: e.target.value, // Actualizar solo ANBRE
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

export default PuestosTrabajosAcciones;



