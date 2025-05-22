import { React } from "react";
import { Row, Col, Image } from "react-bootstrap";

const Cardboton = ({ ListaProductos, NombreCategoria, onProductoSeleccionado }) => {
  // Asegúrate de que ListaProductos sea un arreglo
  const productos = Array.isArray(ListaProductos) ? ListaProductos : [];

  // Manejar el clic en una tarjeta
  const agregarProductoATabla = (producto, precioSeleccionado) => {
    if (onProductoSeleccionado) {
      // Llamar al callback con el producto y el precio seleccionado
      onProductoSeleccionado({ ...producto, precioSeleccionado });
    }
  };

  return (
    <>
    <div className="titulos_MenuCrearMenu"> {NombreCategoria}</div><br />
    <Row style={{paddingLeft:'5px', gap: '10px'}}>
      {productos.map((producto, index) => (
        <Col key={index} className='cardproductos' xs={12} sm={4} md={2} lg={2} xl={2}>          
          <div>
            <Image
              alt={producto.PRODNOM || "Producto"}
              src={producto.PRODIMG ? `./img/productos/${producto.PRODIMG}` : "./img/productos/no_img.png"}
            />
          </div>
          <div className="etinombreproducto">
            {producto.PRODNOM  || "Producto sin nombre"}
          </div>

          <div className="etiprecios">

            <div className="etiprecio-grande-container"
              onClick={() =>
                agregarProductoATabla(producto, producto.PRECIOG)
              }
            >
              <div className="etiprecio-grande">{'$' + producto.PRECIOG || "Sin Precio Grande"}</div>
              <span className="etiqueta-precio">Grande</span>
            </div>

            <div className="etiprecio-pequeno-container"
              onClick={() =>
                agregarProductoATabla(producto, producto.PRECIOP)
              }
            >
              <div className="etiprecio-pequeno">{'$' + producto.PRECIOP || "Sin Precio Pequeño"}</div>
              <span className="etiqueta-precio">Pequeño</span>
            </div>

          </div>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default Cardboton;