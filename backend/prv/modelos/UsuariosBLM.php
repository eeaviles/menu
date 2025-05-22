<?php
class Usuarios {
    private $id_usuario;
    private $id_persona;
    private $id_rol;
    private $v_username;
    private $v_password;
    private $email_recup;
    private $t_descripcion;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_usuario() {
            return $this->id_usuario;
        }

        public function setId_usuario($id_usuario) {
            $this->id_usuario = $id_usuario;
        }

        public function getId_persona() {
            return $this->id_persona;
        }

        public function setId_persona($id_persona) {
            $this->id_persona = $id_persona;
        }

        public function getId_rol() {
            return $this->id_rol;
        }

        public function setId_rol($id_rol) {
            $this->id_rol = $id_rol;
        }

        public function getV_username() {
            return $this->v_username;
        }

        public function setV_username($v_username) {
            $this->v_username = $v_username;
        }

        public function getV_password() {
            return $this->v_password;
        }

        public function setV_password($v_password) {
            $this->v_password = $v_password;
        }

        public function getEmail_recup() {
            return $this->email_recup;
        }

        public function setEmail_recup($email_recup) {
            $this->email_recup = $email_recup;
        }

        public function getT_descripcion() {
            return $this->t_descripcion;
        }

        public function setT_descripcion($t_descripcion) {
            $this->t_descripcion = $t_descripcion;
        }

        public function getD_registro() {
            return $this->d_registro;
        }

        public function setD_registro($d_registro) {
            $this->d_registro = $d_registro;
        }

        public function getD_actualizacion() {
            return $this->d_actualizacion;
        }

        public function setD_actualizacion($d_actualizacion) {
            $this->d_actualizacion = $d_actualizacion;
        }

        public function getC_activo() {
            return $this->c_activo;
        }

        public function setC_activo($c_activo) {
            $this->c_activo = $c_activo;
        }

    //-----[ Métodos de la clase ]------------------------------------------------

    public function loginin(){
        $result='';
        try{        
            
            $sth = $this->conn->prepare(
                'SELECT u.id_usuario AS IDUSER, u.v_username AS USERNAME, u.c_activo AS ACTIVO,  u.v_password AS PASSWD, r.id_rol AS IDROL, 
                r.v_rol AS ROL, concat( p.vc_nbre1," " ,p.vc_nbre2," ", vc_Ape1, " ", vc_Ape2) AS NOMBRE, p.vc_foto AS FOTO, p.id_persona AS IDP                
                FROM menu.usuarios AS u  
                JOIN menu.roles AS r ON u.id_rol=r.id_rol
                JOIN menu.personas AS p ON u.id_persona = p.id_persona
                WHERE u.v_username =:inicio'        
            );

            //-----[ Sanitizar datos ]--------------------------------
            $this->setV_username(htmlspecialchars(strip_tags($this->getV_username())));

            //-----[ Arreglo de parámetros ]--------------------------------
            $params = [':inicio'=>$this->getV_username() ];

            $sth->execute($params);
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (Exception $e) {
            echo $e->getMessage();
        }  
        
	}//funcional

    public function listar(){  
        try{        
            $sth = $this->conn->prepare(
                'SELECT ROW_NUMBER() OVER (ORDER BY u.id_usuario ) AS NF, u.id_usuario AS IUSUA, per.id_persona AS IDPER, r.id_rol AS IROL,  r.v_rol AS ROL, per.vc_nombrecompleto AS NPER, u.v_username AS NUSER, u.email_recup AS CORREO, u.c_activo AS USERACT, u.t_descripcion AS DESCRIP
                FROM menu.usuarios AS u
                JOIN menu.personas AS per ON u.id_persona = per.id_persona
                JOIN menu.roles AS r ON u.id_rol = r.id_rol
                WHERE per.id_persona > 0'        
            );

            //-----[ Arreglo de parámetros ]--------------------------------
            $params = [':activo'=>'S'];

            $sth->execute($params);
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function actualizar() {
        try{ 
            $query = 'UPDATE menu.usuarios SET id_rol = :irol, v_username = :uname, email_recup = :em, d_actualizacion = :dact, t_descripcion = :descrip, c_activo = :activo';

            $params = [
                ':idu' => $this->getId_usuario(),
                ':idp' => $this->getId_persona(),
                ':irol'=> $this->getId_rol(),
                ':uname' => $this->getV_username(),            
                ':em' => $this->getEmail_recup(),
                ':dact'=>$this->getD_actualizacion(),
                ':descrip'=>$this->getT_descripcion(),
                ':activo'=>$this->getC_activo()
            ];

            // Verificar si v_password no es null
                if ($this->getV_password() !== null) {
                    $query .= ', v_password = :pas ';
                    $params[':pas'] = $this->getV_password();
                }
    
            // Completar la consulta con la cláusula WHERE
                $query .= 'WHERE id_usuario = :idu AND id_persona = :idp';

            // Preparar y ejecutar la consulta

            $stmt = $this->conn->prepare($query);
            if ($stmt->execute($params)) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function agregar() {
        try {
            $query = "INSERT INTO menu.usuarios (id_persona, id_rol, v_username, v_password, email_recup, t_descripcion, d_registro, c_activo) VALUES (:id_persona, :id_rol, :v_username, :v_password, :email_recup, :t_descripcion, :d_registro, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos            
            $this->setId_persona(htmlspecialchars(strip_tags($this->getId_persona())));
            $this->setId_rol(htmlspecialchars(strip_tags($this->getId_rol())));
            $this->setV_username(htmlspecialchars(strip_tags($this->getV_username())));
            $this->setV_password(htmlspecialchars(strip_tags($this->getV_password())));
            $this->setEmail_recup(htmlspecialchars(strip_tags($this->getEmail_recup())));
            $this->setT_descripcion(htmlspecialchars(strip_tags($this->getT_descripcion())));
            $this->setD_registro(htmlspecialchars(strip_tags($this->getD_registro())));
            $this->setC_activo(htmlspecialchars(strip_tags($this->getC_activo())));

            // Arreglo de parámetros
            $params = [
                ':id_persona' => $this->getId_persona(),
                ':id_rol'=> $this->getId_rol(),
                ':v_username' => $this->getV_username(),                
                ':v_password' => $this->getV_password(), 
                ':email_recup' => $this->getEmail_recup(),
                ':d_registro'=>$this->getD_registro(),
                ':t_descripcion'=>$this->getT_descripcion(),
                ':c_activo'=>$this->getC_activo()
            ];

            // Ejecutar la consulta con el arreglo de parámetros
            if ($stmt->execute($params)) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }



    //---[ NO ACTIVOS ]------------------------------------------------


    public function leer() {
        try{
            $ArrayTag=array(':activo'=>'S');           
            $sth = $this->objDb->prepare( 
                'SELECT ROW_NUMBER() OVER (ORDER BY u.id_usuario ) AS NF, u.id_usuario IDU, p.id_persona AS IDP,
                CONCAT_WS(\' \' ,p.vc_nbre1, p.vc_nbre2, p.vc_ape1, p.vc_ape2) AS NOMBRE, u.v_username AS UNAME, 
                u.email_recup AS EMAIL, r.v_rol AS ROL, u.c_activo AS ACTIVO
                FROM menu.usuarios AS u
                JOIN menu.personas AS p ON u.id_persona = p.id_persona
                JOIN menu.roles AS r ON u.id_rol = r.id_rol
                WHERE p.id_persona > 0
                AND p.c_activo = :activo
                '            
            );      
            $sth->execute($ArrayTag);
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);  
            return $result;
        } catch (Exception $e) {
            $mensaje = ['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE PUEDEN OBTENER'];
            return $mensaje;
           // echo 'Error: ' . $e->getMessage();
           // return false;
        }
    }

    public function leerUno() {
        try{           
            $ArrayListar=array(
                ':idp'=>$this->getId_persona(),
                ':dactivo'=>$this->getC_activo()    
            );
            $sth = $this->objDb->prepare( 
                'SELECT ROW_NUMBER() OVER (ORDER BY u.id_usuario ) AS NF, u.id_usuario IDU, p.id_persona AS IDP, u.id_rol AS IDR, u.v_username AS UNAME, 
                u.email_recup AS EMAIL, r.v_rol AS ROL, u.c_activo AS ACTIVO
                FROM gpa.usuarios AS u
                JOIN gpa.personas AS p ON u.id_persona = p.id_persona
                JOIN gpa.roles AS r ON u.id_rol = r.id_rol    
                WHERE p.id_persona = :idp
                AND p.c_activo = :dactivo'
            );      
            $sth->execute($ArrayListar);
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);  
            return $result;
        } catch (Exception $e) {
            $mensaje = ['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE PUEDEN OBTENER'];
            return $mensaje;
           // echo 'Error: ' . $e->getMessage();
           // return false;
        } 
    }
}

?>