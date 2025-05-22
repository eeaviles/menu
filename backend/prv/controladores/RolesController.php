<?php

class RolesController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Roles($db);         
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
            case "LXID";
                return $this->lixd($data);
            break;
            case "LIPF";
                return $this->lipf($data);
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/
    
    //-----[ FUNCIONES ACTIVAS EN PROYECTO MENU ]-----//
        private function lipf($data) {            
            $resptem = $this->obj->listarparaformulario(); 
            if($resptem ){
                return $resptem;
            }else{  
                return array("E" => "No se encontraron resultados.");
            } 
        }
}