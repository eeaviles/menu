<?php
class EmpresasContactosController{
	private $objEmpresascontactos;

	public function __construct($db){		
        $this->objEmpresascontactos = new Empresascontactos($db);	 		
    }

    public function accion($data){        
        switch ($data['accion']) {   
            case "AG";
                return $this->Agregar($data);
            break;
            case "AC";
                return $this->Actualizar($data);
            break;
            case "LI";
                return $this->Listar($data);
            break;
            case "LXID";
                return $this->ListarXID($data);
            break;
            case "LXIDEX";
                return $this->ListarXIDEX($data);
            break;
            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

//------[ FUNCIONES PRIVADAS ]----------------------------------------------

    private function Agregar($d){
        /*CREADOS POR _POST*/  
        $this->objEmpresascontactos->setId_empresa($d['IDEMPRESA']);
        $this->objEmpresascontactos->setVc_nombre($d['CPRINC']);
        $this->objEmpresascontactos->setVc_dui($d['CDUI']);
        $this->objEmpresascontactos->setVc_correo($d['CEMAIL']);
        $this->objEmpresascontactos->setVc_telefono($d['CTEL']);
        $this->objEmpresascontactos->setVc_area($d['CAREA']);
        $this->objEmpresascontactos->setVc_puestotrabajo($d['CCARGO']);        
        $this->objEmpresascontactos->setT_descripcion($d['CDESCRIP']);
        /*CREADOS POR SISTEMA*/
        $this->objEmpresascontactos->setD_registro($d['FREG']);
        $this->objEmpresascontactos->setC_activo($d['CACT']);
        /*SALIDA*/
        return $this->objEmpresascontactos->agregar();
    }

    private function Actualizar($d){
        /*CREADOS POR _POST*/        
        $this->objEmpresascontactos->setId_empresacontacto($d['CIDEMPRESA']);
        $this->objEmpresascontactos->setId_empresa($d['IDEMPRESA']);        
        $this->objEmpresascontactos->setVc_nombre($d['CPRINC']);
        $this->objEmpresascontactos->setVc_dui($d['CDUI']);
        $this->objEmpresascontactos->setVc_correo($d['CEMAIL']);
        $this->objEmpresascontactos->setVc_telefono($d['CTEL']);
        $this->objEmpresascontactos->setVc_area($d['CAREA']);
        $this->objEmpresascontactos->setVc_puestotrabajo($d['CCARGO']);        
        $this->objEmpresascontactos->setT_descripcion($d['CDESCRIP']);
        /*CREADOS POR SISTEMA*/
        $this->objEmpresascontactos->setD_actualizacion($d['FACT']);
        $this->objEmpresascontactos->setC_activo($d['CACT']);
        /*SALIDA*/
        return $this->objEmpresascontactos->actualizar();
    }


    private function Listar($d){           
        $Resptemp = $this->obj->listar();
        echo json_encode($Resptemp);
    }//FUNCIONAL PARA    

 
}