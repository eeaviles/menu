<?php

class EmpleadosController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Empleados($db);         
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
            case "LIFS";
                return $this->lifs($data);
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //---[ FUNCIONES ACTIVAS EN PROYECTO MENU ]-----
    
    //---[ FUNCIONAL DESDE Empleados.js]-----
    private function li($data) {
        $resultado = $this->obj->listar();
        if ($resultado) {
            return $resultado;
        } else {
            return array("error" => "No se encontraron resultados.");
        }
    }

    private function ag($data) {
        $this->obj->setId_puestotrabajo($data['IDPTBJO']);
        $this->obj->setId_persona($data['IDPER']);
        $this->obj->setD_inicio($data['FINI']);
        $this->obj->setD_fin($data['FFIN']);
        $this->obj->setT_descripcion($data['DESCRIP']);  
        $this->obj->setD_registro(date('Y-m-d'));   
        $this->obj->setC_activo($data['ACTIVO']);
        
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
        $this->obj->setId_empleado($data['IDEMPLEADO']);
        $this->obj->setId_puestotrabajo($data['IDPTBJO']);
        $this->obj->setId_persona($data['IDPER']);
        $this->obj->setD_inicio($data['FINI']);
        $this->obj->setD_fin($data['FFIN']);
        $this->obj->setT_descripcion($data['DESCRIP']);  
        $this->obj->setD_actualizacion(date('Y-m-d'));   
        $this->obj->setC_activo($data['ACTIVO']);
        
        $resptem = $this->obj->actualizar();   
 
        if($resptem ){
            $temarray=['E'=>'LOS DATOS SE ACTUALIZARON'];
            return $temarray;
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ACTUALIZARON'];
            return $temarray;
        }        

    }



}