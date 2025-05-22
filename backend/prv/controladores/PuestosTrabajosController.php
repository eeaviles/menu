<?php

class PuestosTrabajosController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Puestotrabajo($db);         
    }

    public function accion($data) {        
        switch ($data['accion']) {   
            case "AG";
                return $this->ag($data);
            break;
            case "AC";
                return $this->ac($data);
            break;
            case "LXID";
                return $this->lixd($data);
            break;
            case "LIPF";
            return $this->lipf($data);//---[LISTAR PORA FORMULARIOS]
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/


//---[ACTIVAS PROYECTO MENU ]---//

    //---[FUNCIONAL AccionesPuestosTrabajos.js]
    private function lixd($data) {
        $IDEMP = $data['ID'];
        $resptem = $this->obj->listarxid($IDEMP);   
        return $resptem; 
    }

    private function ag($data) {
        $this->obj->setId_area($data['IDAREA']);
        $this->obj->setVc_codpuestotrabajo($data['CODPT']);
        $this->obj->setVc_nombre($data['PTNOM']);
        $this->obj->setT_descripcion($data['PTDESCRIP']);
        $this->obj->setD_registro(date('Y-m-d'));
        $this->obj->setC_activo('S');
        $resptem = $this->obj->agregar();   
        if($resptem ){
            $temarray=['E'=>'LOS DATOS SE ALMACENARON'];
            return $temarray; 
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ALMACENARON'];
            return $temarray; 
        }

    }

    private function ac($data) {
        $this->obj->setId_puestotrabajo($data['IDPT']);
        $this->obj->setId_area($data['IDAREA']);
        $this->obj->setVc_codpuestotrabajo($data['CODPT']);
        $this->obj->setVc_nombre($data['PTNOM']);
        $this->obj->setT_descripcion($data['PTDESCRIP']);
        $this->obj->setD_actualizacion(date('Y-m-d'));
        $this->obj->setC_activo('S');
        $resptem = $this->obj->actualizar();
        if($resptem ){
            $temarray=['E'=>'LOS DATOS SE ACTUALIZARON'];
            return $temarray; 
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ACTUALIZARON'];
            return $temarray; 
        }       
    }

    private function lipf($data) {
        $this->obj->setId_area($data['IDPF']);
        $resptem = $this->obj->listarareasparaformulario($data['ID']);  
        return $resptem; 
    }
}