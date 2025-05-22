<?php
class Roles {
    private $id_rol;
    private $v_rol;
    private $t_comentario;
    private $conn;

    //-----[ getters y setters ]-----//

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getId_rol() {
            return $this->id_rol;
        }

        public function setId_rol($id_rol) {
            $this->id_rol = $id_rol;
        }

        public function getV_rol() {
            return $this->v_rol;
        }

        public function setV_rol($v_rol) {
            $this->v_rol = $v_rol;
        }

        public function getT_comentario() {
            return $this->t_comentario;
        }

        public function setT_comentario($t_comentario) {
            $this->t_comentario = $t_comentario;
        }

    //-----------------------------------------------------------------
    
    //-----[ FUNCIONAL PARA MODULO MENU ]-----//
    public function listarparaformulario(){
        try{
            $query = "SELECT id_rol AS IROL, v_rol AS NROL FROM menu.roles";
            $sth = $this->conn->prepare($query);      
            $sth->execute();
            $result = $sth->fetchAll(PDO::FETCH_ASSOC); 
            return $result;
        }catch(PDOException $e){
            return array("error" => "Error al listar los roles: " . $e->getMessage());
        }       
    }    

}
?>