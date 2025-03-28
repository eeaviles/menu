import React from 'react'

const MenuDiario = (IDCategoría) => {


    //---[ QUERY: OBTENER PRODUCTOS POR CATEGORÍA ]----
    const [OBtcam, setOBtcam] = useState(null);
    useEffect(() => {
        setOBtcam({
        ID: IDCategoría,
        controller: "ProductosController",
        accion: "LXID",
        });
    }, [IDPEmpresaSelec]);
    const { data: ListaSucursales, isSuccess: isListaSucursales } = useObtsucursalesQuery(OBtcam,{ skip: !OBtcam }); 


  return (  
    <div className="container mx-auto contenedor ">
        <div className="Titulo">LISTADO DE MENÚ DIARIOS</div>
    </div>    
  )
}

export default MenuDiario