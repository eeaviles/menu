<?php

class EmpCat019Controller{
	private $objEmpCat019;

	public function __construct($db){		
        $this->objEmpCat019 = new Emp_cat019($db);	 		
    }

    public function accion($data){        
        switch ($data['accion']) {   
            case "AG";
                return $this->AgregarEmpCat019($data);
            break;
            case "LXID";
                return  $this->ListarXID($data);
                // OBTENER ID DE UN REGISTRO ESPECIFICO CON EL VALOR DEL CODIGO
            break;
            case "AC";
                return  $this->ActualizarEmpCat019($data);
            break;
            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    private function AgregarEmpCat019($d){
        //-----[CREADOS POR _POST]
        $this->objEmpCat019->setId_empresa($d['IDEMP']);
        $this->objEmpCat019->setId_cat019($d['IDCAT019']);
        $this->objEmpCat019->setVc_nombre($d['NOMBRE']);

        //-----[FUNCIONES]
        $Resptemp = $this->objEmpCat019->agregarempcat019();
        return $Resptemp;
    } //FUNCIONAL PARA AgregarEmpresas.js, Modulo menu

    private function ListarXID($d){
        $this->objEmpCat019->setId_empresa($d['ID']);
        $Resptemp = $this->objEmpCat019->listarxid();
        return $Resptemp;
    }//FUNCIONAL PARA ActualizarEmpresa.js, Modulo menu
    
    private function ActualizarEmpCat019($d) {
        //-----[CREADOS POR _POST]
        $this->objEmpCat019->setId_empresa($d['IDEMP']);
        $this->objEmpCat019->setId_cat019($d['IDCAT019']);
        $this->objEmpCat019->setVc_nombre($d['NOMBRE']);

        //-----[FUNCIONES]
        $Resptemp = $this->objEmpCat019->actualizar();
        return $Resptemp;
    } // NUEVA FUNCIÓN PARA ACTUALIZAR, Modulo menu

//------------------------[ FUNCIONES NO UTILIZADAS POR PROYECTO MENU]----------

}

?>