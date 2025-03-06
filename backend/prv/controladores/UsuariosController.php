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
            case "loginout":
                return $this->LogOut();
            case "listar":
                return $this->Listartodos();
            case "listarxid":
                return $this->ListarXid($data);
            case "agregar":
                return $this->Agregar($data);
            case "actualizar":
                return $this->Actualizar($data);
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

    private function Agregar($d) {
        //---[ CREADOS EXTERNAMENTE]
        $this->objusers->setId_persona($d['IDP']);
        $this->objusers->setId_rol($d['IDR']);
        $this->objusers->setV_username($d['UNAME']);
        $this->objusers->setV_password($d['PASSWORD']);
        $this->objusers->setEmail_recup($d['EMAIL']);

        //[ CREADOS POR SISTEMA]
        $this->objusers->setC_activo('S');
        $this->objusers->setD_registro(date("Y-m-d"));

        //---[ SOLICTUD ]
        return $this->objusers->crear();
    }    

    private function Listartodos() {
        return $this->objusers->leer();
    }

    private function ListarXid() {
        $this->objusers->setId_persona($d['ID']);
        $this->objusers->setC_activo('S');
        return $this->objusers->leerUno($d['ID']);
    }

    private function Actualizar() {
        //---[ CREADOS EXTERNAMENTE]
        $this->objusers->setId_usuario($d['IDU']);
        $this->objusers->setId_persona($d['IDP']);
        $this->objusers->setId_rol($d['IDR']);
        $this->objusers->setV_username($d['UNAME']);
        $this->objusers->setV_password($d['PASSWORD']);
        $this->objusers->setEmail_recup($d['EMAIL']);

        //[ CREADOS POR SISTEMA]
        $this->objusers->setD_actualizacion(date("Y-m-d"));

        //---[ SOLICTUD ]
        return $this->objusers->actualizar();
    }
}

?>