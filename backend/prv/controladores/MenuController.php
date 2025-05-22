<?php

class MenuController {
    private $obj;
    private $MenuDetallesController;

    public function __construct($db) {        
        $this->obj = new Menu($db); 
        $this->MenuDetallesController = new MenuDetallesController($db);    
    }

    public function accion($data) {        
        switch ($data['accion']) {   
            case "AG";
                return $this->ag($data);
            break;
            case "AC";
                return $this->ac($data);
            break;
            case "ACEST";
                return $this->acest($data);
            break;
            case "LI";
                $this->li($data);
            break;
            case "LIFS";
                return $this->lifs($data);
            break;
            case "LIXF";//--[LISTAR POR FECHAS]
                return $this->lixf($data);
            break;
        break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //-----[ HABILITADAS ]--------
    private function ag($data) {   
        //---[ OJO: AL AGREGAR UN MENU NUEVO TENEMOS QUE AGREGAR REGISTROS EN LA TABLA MENUDETALLES ]---
        /*---[ NO UTILIZADAS ]
            // $this->obj->setId_menu;
            // $this->obj->setD_actualizacion;
        */
        //---[AUTOMÁTICAS POR SISTEMA ]---
        $this->obj->setD_registro(date('Y-m-d'));        
        $this->obj->setC_activo('S');
        //---[ EXTERNAS ]---
        $this->obj->setVc_nombre($data['NMENU']);
        $this->obj->setD_programada($data['FPROG']);
        $this->obj->setVc_comentario($data['COMMENU']);

        $Lastidmenu = $this->obj->agregar(); // Agregar el menú y obtener el último ID insertado

        if($Lastidmenu){
            $ArrayTag = array('accion'=> 'AG','PRODSEL'=>$data['PRODSEL'], 'IDMENU'=>$Lastidmenu );
            $MjeMenuController = $this->MenuDetallesController ->accion($ArrayTag);
        }
        
        if($Lastidmenu && $MjeMenuController){
            $temarray=['E'=>'LOS DATOS SE ALMACENARON'];
            return $temarray;
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ALMACENARON'];
            return $temarray;
        } 

    }

    private function ac($data){
        //---[ OJO: AL ACTUALIZAR UN MENU TENEMOS QUE ACTUALIZAR REGISTROS EN LA TABLA MENUDETALLES ]---
        /*---[ NO UTILIZADAS ]
            // $this->obj->setId_menu;
            // $this->obj->setD_actualizacion;
        */
        //---[AUTOMÁTICAS POR SISTEMA ]---
        $this->obj->setD_actualizacion(date('Y-m-d'));        
        $this->obj->setC_activo('S');
        //---[ EXTERNAS ]---
        $this->obj->setId_menu($data['IDMENU']);
        $this->obj->setVc_nombre($data['NMENU']);
        $this->obj->setD_programada($data['FPROG']);
        $this->obj->setVc_comentario($data['COMMENU']);

        $tempresp = $this->obj->actualizar(); //---esperar respuesta binaria true o false

        if($tempresp){
            $temarray=['E'=>'LOS DATOS SE ALMACENARON'];
            return $temarray;
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ALMACENARON'];
            return $temarray;
        } 
    }

    private function acest($data){
        $this->obj->setD_actualizacion(date('Y-m-d'));        
        $this->obj->setC_activo($data['ACTI']);
        $this->obj->setId_menu($data['IDMENU']);
        $tempresp = $this->obj->actualizarestado(); //---esperar respuesta binaria true o false

        if($tempresp){
            $temarray=['E'=>'SE ACTUALIZÓ EL ESTADO'];
            return $temarray;
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA NO SE ACTUALIZÓ EL ESTADO'];
            return $temarray;
        } 
    }

    private function lixf($data) {
        $restmep= $this->obj->listarporfechas($data['FI'],$data['FF']);
        return $restmep;
    }

    //---[  NO HABILITADAS ]-----
        private function li($data) {
            // Implementación de la función LI
            echo "Función LI ejecutada";
        }
        private function lifs($data) {
            // Implementación de la función LIFS
            echo "Función LIFS ejecutada";
        }
}