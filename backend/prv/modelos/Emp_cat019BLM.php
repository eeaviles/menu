<?php
class Emp_cat019 {
    private $id_empcat019;
    private $id_empresa;
    private $id_cat019;
    private $vc_nombre;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_empcat019() {
            return $this->id_empcat019;
        }

        public function setId_empcat019($id_empcat019) {
            $this->id_empcat019 = $id_empcat019;
        }

        public function getId_empresa() {
            return $this->id_empresa;
        }

        public function setId_empresa($id_empresa) {
            $this->id_empresa = $id_empresa;
        }

        public function getId_cat019() {
            return $this->id_cat019;
        }

        public function setId_cat019($id_cat019) {
            $this->id_cat019 = $id_cat019;
        }

        public function getVc_nombre() {
            return $this->vc_nombre;
        }

        public function setVc_nombre($vc_nombre) {
            $this->vc_nombre = $vc_nombre;
        }

    //-----[ Métodos de la clase ]------------------------------------------------
        public function agregarempcat019() {
            try {
                $query = "INSERT INTO menu.emp_cat019 (id_empresa, id_cat019, vc_nombre) VALUES (:id_empresa, :id_cat019, :vc_nombre)";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_empresa = htmlspecialchars(strip_tags($this->id_empresa));
                $this->id_cat019 = htmlspecialchars(strip_tags($this->id_cat019));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));

                // Arreglo de parámetros
                $params = [
                    ':id_empresa' => $this->id_empresa,
                    ':id_cat019' => $this->id_cat019,
                    ':vc_nombre' => $this->vc_nombre,
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

        public function listarxid() {
            try {
                $query = 'SELECT  c19.id_cat019 AS IDCAT019, e.vc_nombre AS NOMBRE, c19.vc_codigo AS COD, c19.vc_valores AS VALS
                FROM menu.emp_cat019 as e
                LEFT JOIN menu.cat019 as c19 ON e.id_cat019 = c19.id_cat019
                WHERE e.id_empresa = :IDEMP;';

                $params = [':IDEMP' => $this->getId_empresa()];    
                $stmt = $this->conn->prepare($query);                
                $stmt->execute($params);
                $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
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

        public function actualizar() {
            try {
                $query = 
                'UPDATE menu.emp_cat019 
                 SET id_cat019 = :id_cat019 
                 WHERE id_empresa = :id_empresa
                 AND vc_nombre = :vc_nombre
                ';
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_empresa = htmlspecialchars(strip_tags($this->id_empresa));
                $this->id_cat019 = htmlspecialchars(strip_tags($this->id_cat019));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));

                // Arreglo de parámetros
                $params = [
                    ':id_empresa' => $this->id_empresa,
                    ':id_cat019' => $this->id_cat019,
                    ':vc_nombre' => $this->vc_nombre,  
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


    //------------------------[ FUNCIONES NO UTILIZADAS POR PROYECTO MENU]-----------------------------------

        public function leer() {
            try {
                $query = "SELECT * FROM emp_cat019";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }
        public function eliminar($id) {
            try {
                $query = "DELETE FROM emp_cat019 WHERE id = :id";
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