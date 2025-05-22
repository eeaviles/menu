<?php
class Categorias {
    private $id_categoria;
    private $vc_nombre;
    private $vc_descripcion;
    private $c_tipocat;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;
    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_categoria() {
            return $this->id_categoria;
        }

        public function setId_categoria($id_categoria) {
            $this->id_categoria = $id_categoria;
        }

        public function getVc_nombre() {
            return $this->vc_nombre;
        }

        public function setVc_nombre($vc_nombre) {
            $this->vc_nombre = $vc_nombre;
        }

        public function getVc_descripcion() {
            return $this->vc_descripcion;
        }

        public function setVc_descripcion($vc_descripcion) {
            $this->vc_descripcion = $vc_descripcion;
        }

        public function getC_tipocat() {
            return $this->vc_descripcion;
        }

        public function setC_tipocat($c_tipocat) {
            $this->c_tipocat = $c_tipocat;
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
 
    //-----[ HABILITADAS ]
    public function listar() {
        try {
            $query = "SELECT ROW_NUMBER() OVER (ORDER BY c.id_categoria ) AS NF, c.id_categoria AS IDCAT, c.vc_nombre AS NOMBRECAT, c.vc_categoriaimagen AS IMGCAT, c.c_tipocat AS TIPOCAT, c.vc_descripcion AS DESCCAT
            FROM menu.categorias c
            WHERE c.c_activo = :ACTIVO";
            $stmt = $this->conn->prepare($query);
            $params = [':ACTIVO' => 'S'];
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    } 

    public function listarpf(){
        try {
            $query = "SELECT c.id_categoria AS IDCAT, c.vc_nombre AS NOMBRECAT
            FROM menu.categorias c
            WHERE c.c_activo = :ACTIVO";
            $stmt = $this->conn->prepare($query);
            $params = [':ACTIVO' => 'S'];
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }
        
    public function actualizar() {
        try {
            $query = "UPDATE categorias SET vc_nombre = :vc_nombre , vc_descripcion = :vc_descripcion,  c_tipocat = :c_tipocat, d_actualizacion = :d_actualizacion, c_activo = :c_activo WHERE id_categoria = :id_categoria";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_categoria = htmlspecialchars(strip_tags($this->id_categoria));
            $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
            $this->c_tipocat = htmlspecialchars(strip_tags($this->c_tipocat)); 
            $this->vc_descripcion = htmlspecialchars(strip_tags($this->vc_descripcion));
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':id_categoria' => $this->id_categoria,
                ':vc_nombre' => $this->vc_nombre,
                ':c_tipocat' => $this->c_tipocat,
                ':vc_descripcion' => $this->vc_descripcion,
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

    public function agregar() {
        try {
            $query = "INSERT INTO categorias (vc_nombre, vc_descripcion, c_tipocat, d_registro, c_activo) VALUES (:vc_nombre, :vc_descripcion, :c_tipocat, :d_registro, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
            $this->vc_descripcion = htmlspecialchars(strip_tags($this->vc_descripcion));
            $this->c_tipocat = htmlspecialchars(strip_tags($this->c_tipocat));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':vc_nombre' => $this->vc_nombre,
                ':vc_descripcion' => $this->vc_descripcion,
                ':c_tipocat' => $this->c_tipocat,
                ':d_registro' => $this->d_registro,
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

}
?>