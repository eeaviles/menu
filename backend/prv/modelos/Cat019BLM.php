<?php
class Cat019 {
    private $id_cat019;
    private $vc_codigo;
    private $vc_valores;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_cat019() {
            return $this->id_cat019;
        }

        public function setId_cat019($id_cat019) {
            $this->id_cat019 = $id_cat019;
        }

        public function getVc_codigo() {
            return $this->vc_codigo;
        }

        public function setVc_codigo($vc_codigo) {
            $this->vc_codigo = $vc_codigo;
        }

        public function getVc_valores() {
            return $this->vc_valores;
        }

        public function setVc_valores($vc_valores) {
            $this->vc_valores = $vc_valores;
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

        public function listarxcode(){      
            try{   
                $query = "SELECT c.id_cat019 AS IDCAT019 
                FROM menu.cat019 c
                WHERE c.vc_codigo = :CODE
                AND c.c_activo = :ACT
                ";
                $stmt = $this->conn->prepare($query); 
                $params = [
                    ':CODE'=> $this->getVc_codigo(),
                    ':ACT'=> 'S',
                ]; 
                $stmt->execute( $params);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if($row){
                    return $row;
                }else{
                    return false;
                }//---[ Verificar si hay datos ]    
            } catch (PDOException $e) {
                    echo 'Error: ' . $e->getMessage();
                    return false;
            }
        } //FUNCIONAL PARA AregarEmpresas.js

        public function listarxid() {
            try {
                $query =
                'SELECT  c19.id_cat019 AS IDCAT019, e.vc_nombre AS NOMBRE, c19.vc_codigo AS COD,  c19.vc_valores AS VALS
                FROM gpa.emp_cat019 as e
                JOIN cat019 as c19 ON e.id_cat019 = c19.id_cat019
                WHERE e.id_empresa = :IDEMP
                ';

                $stmt = $this->conn->prepare($query);
                $params = [':IDEMP' => $this->getId_empresa(),':cati'=>'S'];
                $stmt->execute($params);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if($row){
                    return $row;
                }else{
                    return false;
                }//---[ Verificar si hay datos ]    
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }

        
    //------------------------------------------------
        public function crear() {
            try {
                $query = "INSERT INTO cat019 (id_cat019, vc_codigo, vc_valores, d_registro, d_actualizacion, c_activo) VALUES (:id_cat019, :vc_codigo, :vc_valores, :d_registro, :d_actualizacion, :c_activo)";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_cat019 = htmlspecialchars(strip_tags($this->id_cat019));
                $this->vc_codigo = htmlspecialchars(strip_tags($this->vc_codigo));
                $this->vc_valores = htmlspecialchars(strip_tags($this->vc_valores));
                $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

                // Arreglo de parámetros
                $params = [
                    ':id_cat019' => $this->id_cat019,
                    ':vc_codigo' => $this->vc_codigo,
                    ':vc_valores' => $this->vc_valores,
                    ':d_registro' => $this->d_registro,
                    ':d_actualizacion' => $this->d_actualizacion,
                    ':c_activo' => $this->c_activo,
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

        public function leer() {
            try {
                $query = "SELECT * FROM cat019";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }
        public function actualizar() {
            try {
                $query = "UPDATE cat019 SET id_cat019 = : , vc_codigo = : , vc_valores = : , d_registro = : , d_actualizacion = : , c_activo = : WHERE id = :id";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_cat019 = htmlspecialchars(strip_tags($this->id_cat019));
                $this->vc_codigo = htmlspecialchars(strip_tags($this->vc_codigo));
                $this->vc_valores = htmlspecialchars(strip_tags($this->vc_valores));
                $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));
                $this->id = htmlspecialchars(strip_tags($this->id));

                // Arreglo de parámetros
                $params = [
                    ':id_cat019' => $this->id_cat019,
                    ':vc_codigo' => $this->vc_codigo,
                    ':vc_valores' => $this->vc_valores,
                    ':d_registro' => $this->d_registro,
                    ':d_actualizacion' => $this->d_actualizacion,
                    ':c_activo' => $this->c_activo,
                    ':id' => $this->id
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

        public function eliminar($id) {
            try {
                $query = "DELETE FROM cat019 WHERE id = :id";
                $stmt = $this->conn->prepare($query);
                $params = [':id' => $id];
                if ($stmt->execute($params)) {
                    return true;
                }
                return false;
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }
}
?>