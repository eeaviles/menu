import { React } from "react";
import { Row, Col, Image } from "react-bootstrap";

const Menucardboton = ({ ListaProductos, NombreCategoria, onProductoSeleccionado }) => {
  // Asegúrate de que ListaProductos sea un arreglo
  const productos = Array.isArray(ListaProductos) ? ListaProductos : [];

  // Manejar el clic en una tarjeta
  const agregarProductoATabla = (producto) => {
    if (onProductoSeleccionado) {
      // Llamar al callback con el producto y el precio seleccionado
      onProductoSeleccionado({ ...producto });
    }
  };

  return (
    <>
    <div className="titulos_MenuCrearMenu"> {NombreCategoria}</div><br />
    <Row style={{paddingLeft:'20px', gap: '10px'}}>
      {productos.map((producto, index) => (
        <Col key={index} className='cardproductos2' xs={12} sm={4} md={2} lg={2} xl={2}>          
          <div onClick={() => agregarProductoATabla(producto)}>
            <Image
              alt={producto.PRODNOM || "Producto"}
              src={producto.PRODIMG ? `./img/productos/${producto.PRODIMG}` : "./img/productos/no_img.png"}
            />
          </div>
          <div className="etinombreproducto">
            {producto.PRODNOM  || "Producto sin nombre"}
          </div>         
        </Col>
      ))}
    </Row>
    </>
  );
};

export default Menucardboton;