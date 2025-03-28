<?php

class Cat019Controller{
	private $obCat019;

	public function __construct($db){		
        $this->objCat019 = new Cat019($db);	 		
    }

    public function accion($data){        
        switch ($data['accion']) {   
            case "AG";
                $this->AgregarCat019($data);
            break;
            case "listXCODE";
                return  $this->listarXCODECat019($data);// OBTENER ID DE UN REGISTRO ESPECIFICO CON EL VALOR DEL CODIGO                
            break;
            case "LXID";
                return  $this->ListarXID($data);// OBTENER ID DE UN REGISTRO ESPECIFICO CON EL VALOR DEL CODIGO                
            break;
            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    private function listarXCODECat019($d){
        $this->objCat019->setVc_codigo($d['CODE']);
        $Resptemp = $this->objCat019->listarxcode();
        return $Resptemp;
    }//FUNCIONAL PARA ActualizarEmpresas.js
    
    private function ListarXID($d){
        $this->objCat019->setId_cat019($d['ID']);
        $Resptemp = $this->objCat019->listarxid();
        return $Resptemp;
    }//FUNCIONAL PARA ActualizarEmpresa.js, Modulo menu




    //------------------------[ FUNCIONES ]-----------------------------------
    private function AgregarCat019($d){
        //print '---> '.$d['IDEMP'].'-----'; 
        //-----[CREADOS POR _POST]
        $this->objsucursales->id_empresa=$d['IDEMP'];
        $this->objsucursales->id_cat9=$d['IDCAT9'];
        $this->objsucursales->id_cat13=$d['IDCAT13'];//
        $this->objsucursales->id_cat020=$d['IDCAT20'];//Paises
        $this->objsucursales->vc_codsucursal=$d['CODSUC'];
        $this->objsucursales->vc_nombresucursal=$d['NOMBRE'];
        $this->objsucursales->vc_ubicacion=$d['UBI'];
        $this->objsucursales->vc_telefono=$d['TEL'];
        $this->objsucursales->t_descripcion=$d['DESCRIP'];
        //-----[CREADOS POR SISTEMA]
        $this->objsucursales->d_registro=date('Y-m-d');
        $this->objsucursales->c_activo='S';
        //-----[FUNCIONES]
        $Resptemp = $this->objsucursales->agregarsucursales();
        echo json_encode($Resptemp);
    }// NO FUNCIONAL


    

}

?>