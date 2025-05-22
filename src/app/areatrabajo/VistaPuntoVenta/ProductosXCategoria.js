import { React, useState, useEffect } from "react";
import { useObtproductosxidQuery } from "../../redux/servicio/GenericApi";
import Carboton from "./cardboton";

const ProductosXCategoria = ({IDCategoria, NombreCategoria, onProductoSeleccionado, TIPOCAT}) => { 
    //---[ QUERY: OBTENER PRODUCTOS POR CATEGORÍA ]----
    const [obtproductoscam, setOBtproductoscam] = useState(null);
    useEffect(() => {
      if (IDCategoria !== null) {
        setOBtproductoscam({
          ID: IDCategoria,
          controller: "ProductosController",
          accion: "LXIDF",
          TIPOCAT: TIPOCAT,
        });
      }
    }, [IDCategoria, TIPOCAT]);
    const { data: ListaProductos, isSuccess: isListaProductos} = useObtproductosxidQuery(obtproductoscam,{ skip: !obtproductoscam }); 

    if (!isListaProductos || !Array.isArray(ListaProductos)) {
      return (
        <div className="container mx-auto contenedor">
          <div className="Titulo">Cargando productos...</div>
        </div>
      );
    }

  return (  
    <div className="container mx-auto contenedor" style={{ maxWidth: "1800px" }}>    
      <Carboton 
        ListaProductos={ListaProductos} 
        NombreCategoria={NombreCategoria} 
        onProductoSeleccionado={onProductoSeleccionado}/>   
    </div>    
  )
}

export default ProductosXCategoria