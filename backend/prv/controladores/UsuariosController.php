<?php

class UsuariosController {
    private $objusers;
    private $objSe;

    public function __construct($db) {
        // Crear una instancia de la clase Usuarios
        $this->objusers = new Usuarios($db);
        $this->objSe = new Sessions();
    }

    public function accion($data) {
        switch ($data['accion']) {
            case "login":
                return $this->Loginin($data);
            break;
            case "loginout":
                return $this->LogOut();
            break;
            case "LI":
                return $this->Listar($data);
            break;
            case "LXID":
                return $this->ListarXid($data);
            break;
            case "AG":
                return $this->Agregar($data);
            break;
            case "AC":
                return $this->Actualizar($data);
            break;
            default:
                return "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    private function Loginin($d) {
        
        $this->objusers->setV_username($d['login']);
        $result = $this->objusers->loginin();

        if ($result) {
            if ($result[0]['PASSWD'] === $d['passwd']) {
                $this->objSe->init(); //---[ ACTIVAR SESSION ]
                $this->objSe->set('IDUSER', $result[0]['IDUSER']);
                $this->objSe->set('USERNAME', $result[0]['USERNAME']);
                $this->objSe->set('ROL', $result[0]['ROL']);
                $this->objSe->set('IDROL', $result[0]['IDROL']);
                $this->objSe->set('NOMBRE', $result[0]['NOMBRE']);
                $this->objSe->set('FOTO', $result[0]['FOTO']);
                $this->objSe->set('IDP', $result[0]['IDP']);
                $obtSesion = $this->objSe->getdataSesion();
                return ["sesionUser" => $obtSesion];
            } else {
                return ['nopass' => 'El Password es incorrecto'];
            }
        } else {
            return ['nouser' => 'Usuario no existe'];
        }
    }

    private function LogOut(){
        return $this->objSe->destroy();          
    }

    private function Listar($d) {
        $resultado = $this->objusers->listar();
          if ($resultado) {
            return $resultado;
        } else {
            return array("error" => "No se encontraron resultados.");
        }

    }

    private function Actualizar($d) {        
        //---[ CREADOS EXTERNAMENTE]
        $this->objusers->setId_usuario($d['IUSUA']);
        $this->objusers->setId_persona($d['IDPER']);
        $this->objusers->setId_rol($d['IROL']);
        $this->objusers->setV_username($d['NUSER']);
        $this->objusers->setV_password($d['PASWD']);
        $this->objusers->setEmail_recup($d['CORREO']);
        $this->objusers->setC_activo($d['USERACT']);
        $this->objusers->setT_descripcion($d['DESCRIP']);

        //[ CREADOS POR SISTEMA]
        $this->objusers->setD_actualizacion(date("Y-m-d"));
        
        $resptem = $this->objusers->actualizar();   
        if($resptem ){
            $temarray=['E'=>'LOS DATOS SE ACTUALIZARON'];
            return $temarray;
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ACTUALIZARON'];
            return $temarray;
        } 
    }

    private function Agregar($d) {
        //---[ CREADOS EXTERNAMENTE]
        $this->objusers->setId_persona($d['IDPER']);
        $this->objusers->setId_rol($d['IROL']);
        $this->objusers->setV_username($d['NUSER']);
        $this->objusers->setV_password($d['PASWD']);
        $this->objusers->setEmail_recup($d['CORREO']);
        $this->objusers->setT_descripcion($d['DESCRIP']);

        //[ CREADOS POR SISTEMA]
        $this->objusers->setC_activo('S');
        $this->objusers->setD_registro(date("Y-m-d"));

        //---[ SOLICTUD ]
        $resptem = $this->objusers->agregar();   
        if($resptem ){
            $temarray=['E'=>'LOS DATOS SE ALMACENARON'];
            return $temarray;
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ALMACENARON'];
            return $temarray;
        } 
    }    

//--------------------------------------------

    private function Listartodos() {
        return $this->objusers->leer();
    }

}

?>