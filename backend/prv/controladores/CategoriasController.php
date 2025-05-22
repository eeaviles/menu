<?php

class CategoriasController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Categorias($db);         
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
                return $this->lipf($data);
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //-----[ HABILITADAS ]--------
        private function li($data) {
            return $this->obj->listar();      
        }

        private function ac($data) {
            $this->obj->setId_categoria($data['IDCAT']);
            $this->obj->setVc_nombre($data['NOMBRECAT']);
            $this->obj->setVc_descripcion($data['DESCCAT']);
            $this->obj->setC_tipocat($data['TIPOCAT']);     
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
    
        private function ag($data) {
            $this->obj->setVc_nombre($data['NOMBRECAT']);
            $this->obj->setVc_descripcion($data['DESCCAT']);
            $this->obj->setC_tipocat($data['TIPOCAT']);     
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
        private function lipf($data){
            return $this->obj->listarpf(); 
        }

}