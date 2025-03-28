<?php

class SucursalesController{
	private $objsucursales;

	public function __construct($db){		
        $this->objsucursales = new Sucursales($db);	 		
    }

    public function accion($data){        
        switch ($data['accion']) {   
            case "AG";
                return $this->AgregarSucursales($data);
            break;
            case "AC";
                return $this->ActualizarSucursales($data);
            break;
            case "LI";
                $this->ListarSucursales($data);
            break;
            case "LXID";
                return $this->ListarSucursalesXID($data);
            break;
            case "LIFS";
                return $this->ListarSucursalesFS($data);
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    private function AgregarSucursales($d){
        //print '---> '.$d['IDEMP'].'-----'; 
        //-----[CREADOS POR _POST]        
        $this->objsucursales->setId_empresa($d['IDEMPRE']);
        $this->objsucursales->setId_cat9($d['IDCAT9']);//Tipo de Sucursal
        $this->objsucursales->setId_cat13($d['IDCAT13']);// Departamentos
        $this->objsucursales->setId_cat020($d['IDCAT20']);//Paises
        $this->objsucursales->setVc_codsucursal($d['CODSUC']);
        $this->objsucursales->setVc_nombresucursal($d['NOMBRE']);
        $this->objsucursales->setVc_ubicacion($d['UBI']);
        $this->objsucursales->setVc_telefono($d['TEL']);
        $this->objsucursales->setT_descripcion($d['DESCRIP']);
        //-----[CREADOS POR SISTEMA]
        $this->objsucursales->setD_registro(date('Y-m-d'));
        $this->objsucursales->setC_activo('S');
        //-----[FUNCIONES]
        $Resptemp = $this->objsucursales->agregarsucursales();
        return $Resptemp;// Regresar mensaje a quien llamo a la función acción(), puede ser index u otro controller
       // echo json_encode($Resptemp);
    }

    //---[FUNCIONAL AccionesSucursales.js]
    private function ActualizarSucursales($d){ 
        //-----[CREADOS POR _POST]
        $this->objsucursales->setId_sucursal($d['IDSUC']);
        $this->objsucursales->setId_empresa($d['IDEMPRE']);
        $this->objsucursales->setId_cat9($d['IDCAT9']);//Tipo de Sucursal
        $this->objsucursales->setId_cat13($d['IDCAT13']);// Departamentos
        $this->objsucursales->setId_cat020($d['IDCAT20']);//Paises
        $this->objsucursales->setVc_codsucursal($d['CODSUC']);
        $this->objsucursales->setVc_nombresucursal($d['NOMBRE']); //
        $this->objsucursales->setVc_ubicacion($d['UBI']);
        $this->objsucursales->setVc_telefono($d['TEL']);
        $this->objsucursales->setT_descripcion($d['DESCRIP']);
        //-----[CREADOS POR SISTEMA]
        $this->objsucursales->setD_actualizacion(date('Y-m-d'));
        $this->objsucursales->setC_activo('S');
        //-----[FUNCIONES]
        $Resptemp = $this->objsucursales->actualizarsucursales();
        return $Resptemp;// Regresar mensaje a quien llamo a la función acción(), puede ser index u otro controller    
    }

    //---[FUNCIONAL MENU: AccionesSucursales.js]
    private function ListarSucursalesXID($d){
        $this->objsucursales->setId_empresa($d['ID']);
        $Resptemp2 = $this->objsucursales->listarsucursalesxid();
        return $Resptemp2;
    }






//------------------------------------------------------------------------------------------------

    private function ListarSucursales(){
         $Resptemp = $this->objsucursales->listarsucursales();
         echo json_encode($Resptemp);
    }//FUNCIONAL MENU 


        
    private function ListarSucursalesFS($d){
         $this->objsucursales->id_empresa=$d['ID'];
         $Resptemp = $this->objsucursales->listarsucursalesfs();
         return $Resptemp;
         //echo json_encode($Resptemp);        
    }

}

?>