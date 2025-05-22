<?php

class PersonasController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Personas($db);         
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
            case "LIPFXP";
                return $this->lipfxp($data);//lista de personas para formulario de empleados
            break;
            case "LIPFXU";
                return $this->lipfxu($data);//lista de personas para formulario de usuarios
            break;
            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //---[ FUNCIONES ACTIVAS PROYECTO MENU ]-----

    private function li($data) {
        $resultado = $this->obj->listar();
        if ($resultado) {
            return $resultado;
        } else {
            return array("error" => "No se encontraron resultados.");
        }
    }

    private function ac($data) {

        $nombrecompleto = $data['N1'] . " " . $data['N2'] . " " . $data['AP1'] . " " . $data['AP2'];
        $this->obj->setId_persona($data['IDPERSONA']);
        $this->obj->setVc_nombrecompleto($nombrecompleto);
        $this->obj->setVc_nbre1($data['N1']);
        $this->obj->setVc_nbre2($data['N2']);
        $this->obj->setVc_ape1($data['AP1']);
        $this->obj->setVc_ape2($data['AP2']);        
        $this->obj->setD_fnacimiento($data['FN']);
        $this->obj->setVc_sex($data['SEXO']);
        $this->obj->setVc_estadocivil($data['ESTADOCIVIL']);
        $this->obj->setVc_nacionalidad($data['NACIONALIDAD']);
        $this->obj->setVc_paisresidencia($data['PAISRESIDENCIA']);
        $this->obj->setVc_profesionoficio($data['PROFESIONOFICIO']);
        $this->obj->setVc_correo($data['CORREO']);
        $this->obj->setVc_nitdui($data['NITDUI']);
        $this->obj->setVc_pasaporte($data['PASAPORTE']);
        $this->obj->setT_direccion($data['DIRECCION']);
        $this->obj->setVc_vivienda($data['VIVIENDA']);
        $this->obj->setI_tiemporesidir($data['TIEMPORESIDIR']);
        $this->obj->setVc_tel($data['TEL']);
        $this->obj->setVc_perconnombre($data['PERCONNOMBRE']);
        $this->obj->setVc_perconparentesco($data['PERCONPARENTESCO']);
        $this->obj->setVc_percontel($data['PERCONTEL']);
         $this->obj->setD_actualizacion(date("Y-m-d"));
        $this->obj->setT_descripcion($data['DESCRIPCION']);
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

    private function ag($data) {      

        $nombrecompleto = $data['N1'] . " " . $data['N2'] . " " . $data['AP1'] . " " . $data['AP2'];   
        $this->obj->setVc_nombrecompleto($nombrecompleto);
        $this->obj->setVc_nbre1($data['N1']);
        $this->obj->setVc_nbre2($data['N2']);
        $this->obj->setVc_ape1($data['AP1']);
        $this->obj->setVc_ape2($data['AP2']);        
        $this->obj->setD_fnacimiento($data['FN']);
        $this->obj->setVc_sex($data['SEXO']);
        $this->obj->setVc_estadocivil($data['ESTADOCIVIL']);
        $this->obj->setVc_nacionalidad($data['NACIONALIDAD']);
        $this->obj->setVc_paisresidencia($data['PAISRESIDENCIA']);
        $this->obj->setVc_profesionoficio($data['PROFESIONOFICIO']);
        $this->obj->setVc_correo($data['CORREO']);
        $this->obj->setVc_nitdui($data['NITDUI']);
        $this->obj->setVc_pasaporte($data['PASAPORTE']);
        $this->obj->setT_direccion($data['DIRECCION']);
        $this->obj->setVc_vivienda($data['VIVIENDA']);
        $this->obj->setI_tiemporesidir($data['TIEMPORESIDIR']);
        $this->obj->setVc_tel($data['TEL']);
        $this->obj->setVc_perconnombre($data['PERCONNOMBRE']);
        $this->obj->setVc_perconparentesco($data['PERCONPARENTESCO']);
        $this->obj->setVc_percontel($data['PERCONTEL']);
        $this->obj->setD_registro(date("Y-m-d"));
        $this->obj->setT_descripcion($data['DESCRIPCION']);
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

    private function lipfxp($data) {
        $this->obj->setId_persona($data['ID']);
        $resultado = $this->obj->listarpersonasformempleados();   
        if ($resultado) {
            return $resultado;
        } else {
            return array("error" => "No se encontraron resultados.");
        } 
    }

    private function lipfxu($data) {
        $this->obj->setId_persona($data['ID']);
        $resultado = $this->obj->listarpersonasformusuarios();   
        if ($resultado) {
            return $resultado;
        } else {
            return array("error" => "No se encontraron resultados.");
        } 
    }



}