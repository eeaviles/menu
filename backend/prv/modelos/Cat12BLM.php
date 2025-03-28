<?php
class Cat12 {
    private $id_cat12;
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
    public function getId_cat12() {
        return $this->id_cat12;
    }

    public function setId_cat12($id_cat12) {
        $this->id_cat12 = $id_cat12;
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
    public function crear() {
        try {
            $query = "INSERT INTO cat12 (id_cat12, vc_codigo, vc_valores, d_registro, d_actualizacion, c_activo) VALUES (:id_cat12, :vc_codigo, :vc_valores, :d_registro, :d_actualizacion, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_cat12 = htmlspecialchars(strip_tags($this->id_cat12));
            $this->vc_codigo = htmlspecialchars(strip_tags($this->vc_codigo));
            $this->vc_valores = htmlspecialchars(strip_tags($this->vc_valores));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':id_cat12' => $this->id_cat12,
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
            $query = "SELECT * FROM cat12";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function leerUno($id) {
        try {
            $query = "SELECT * FROM cat12 WHERE id = :id LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $params = [':id' => $id];
            $stmt->execute($params);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $this->id_cat12 = $row['id_cat12'];
                $this->vc_codigo = $row['vc_codigo'];
                $this->vc_valores = $row['vc_valores'];
                $this->d_registro = $row['d_registro'];
                $this->d_actualizacion = $row['d_actualizacion'];
                $this->c_activo = $row['c_activo'];
                return true;
            }
            return false;
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function actualizar() {
        try {
            $query = "UPDATE cat12 SET id_cat12 = : , vc_codigo = : , vc_valores = : , d_registro = : , d_actualizacion = : , c_activo = : WHERE id = :id";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_cat12 = htmlspecialchars(strip_tags($this->id_cat12));
            $this->vc_codigo = htmlspecialchars(strip_tags($this->vc_codigo));
            $this->vc_valores = htmlspecialchars(strip_tags($this->vc_valores));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Arreglo de parámetros
            $params = [
                ':id_cat12' => $this->id_cat12,
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
            $query = "DELETE FROM cat12 WHERE id = :id";
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