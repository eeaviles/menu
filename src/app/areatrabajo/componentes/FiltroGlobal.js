import React from 'react';
import { Form, Row, Col } from "react-bootstrap";

export const FiltroGlobal = ({filter, setFilter}) => {
     return (
       <div>
         <Row className="ATBJformfila">
           <Col className="filtrobusqueda">
             <Form.Group className="BuscarAncho" controlId="buscarTabla">
               <Form.Label className="ATBJformLabel">Búscar en toda la Tabla:</Form.Label>
               <Form.Control
                 size="sm"
                 maxLength={50}
                 type="text"
                 placeholder=" Búscar en toda la Tabla"
                 className="ATBJFormInput"
                 value={filter || ""}
                 onChange={(e) => setFilter(e.target.value)}
               />
             </Form.Group>
           </Col>
         </Row>
       </div>
     );
}
