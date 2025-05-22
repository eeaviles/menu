<?php

class AreasController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Areas($db);         
    }

    public function accion($data) {        
        switch ($data['accion']) {   
            case "AG";
                return $this->ag($data);
            break;
            case "AC";
                return $this->ac($data);
            break;
            case "LI";
                return $this->li($data);
            break;
            case "LIPF";
                return $this->lipf($data);//---[LISTAR PORA FORMULARIOS]
            break;
            case "LIFS";
                return $this->lifs($data);
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //---[ACTIVAS PROYECTO MENU ]---//

        //---[FUNCIONAL AccionesAreas.js]
        private function ag($data) {
            //$this->obj->setD_actualizacion($data['d_actualizacion']);  
            //$this->obj->setId_area($data['id_area']);

            $this->obj->setId_sucursal($data['IDSUC']);
            $this->obj->setVc_codarea($data['CODAREA']);
            $this->obj->setVc_nombre($data['ANBRE']);
            $this->obj->setT_descripcion($data['DESCRIP']);
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

        //---[FUNCIONAL AccionesAreas.js]
        private function ac($data) {            
            //$this->obj->setD_registro(date('Y-m-d'));
            $this->obj->setId_area($data['IDAREA']);
            $this->obj->setId_sucursal($data['IDSUC']);
            $this->obj->setVc_codarea($data['CODAREA']);
            $this->obj->setVc_nombre($data['ANBRE']);
            $this->obj->setT_descripcion($data['DESCRIP']);
            $this->obj->setD_actualizacion(date('Y-m-d'));                        
            $this->obj->setC_activo('S');            
            $resptem = $this->obj->actualizar();   
 
            if($resptem ){
                $temarray=['E'=>'LOS DATOS SE ALMACENARON'];
                return $temarray;
            }else{
                $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ALMACENARON'];
                return $temarray;
            } 
        }

        //---[FUNCIONAL AccionesAreas.js]
        private function li($data) {
            $resptem = $this->obj->listar();   
            return $resptem;  
        }

        //---[FUNCIONAL PuestosTrabajosAcciones.js]
        private function lipf($data) {
            $this->obj->setId_sucursal($data['IDPF']);
            $resptem = $this->obj->listarareasparaformulario($data['ID']);   
            return $resptem; 
        }

    //---[NO ACTIVAS PROYECTO MENU ]---//

}