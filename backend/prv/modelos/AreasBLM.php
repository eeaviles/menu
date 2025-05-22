<?php
class Areas {
    private $id_area;
    private $id_sucursal;
    private $vc_codarea;
    private $vc_nombre;
    private $t_descripcion;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_area() {
            return $this->id_area;
        }

        public function setId_area($id_area) {
            $this->id_area = $id_area;
        }

        public function getId_sucursal() {
            return $this->id_sucursal;
        }

        public function setId_sucursal($id_sucursal) {
            $this->id_sucursal = $id_sucursal;
        }

        public function getVc_codarea() {
            return $this->vc_codarea;
        }

        public function setVc_codarea($vc_codarea) {
            $this->vc_codarea = $vc_codarea;
        }

        public function getVc_nombre() {
            return $this->vc_nombre;
        }

        public function setVc_nombre($vc_nombre) {
            $this->vc_nombre = $vc_nombre;
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

    //---[MEOTODS ACTIVOS DESDE PROY MENU ]---//
        
    //---[FUNCIONAL AccionesAreas.js]
        public function listar() {
            try {
                $query = "SELECT ROW_NUMBER() OVER (ORDER BY a.id_area ) AS NF, a.id_area AS IDAREA,
                a.vc_codarea AS CODAREA, a.vc_nombre AS ANBRE, a.t_descripcion AS DESCRIP,
                s.id_sucursal AS IDSUC, s.vc_nombresucursal AS NSUC
                FROM menu.areas AS a
                JOIN menu.sucursales AS s ON a.id_sucursal = s.id_sucursal";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }

        public function agregar() {
            try {
                $query = "INSERT INTO areas (id_sucursal, vc_codarea, vc_nombre, t_descripcion, d_registro, c_activo) VALUES (:id_sucursal, :vc_codarea, :vc_nombre, :t_descripcion, :d_registro, :c_activo)";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos    
                $this->id_sucursal = htmlspecialchars(strip_tags($this->id_sucursal));
                $this->vc_codarea = htmlspecialchars(strip_tags($this->vc_codarea));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
                $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
                $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

                // Arreglo de parámetros
                $params = [
                    ':id_sucursal' => $this->id_sucursal,
                    ':vc_codarea' => $this->vc_codarea,
                    ':vc_nombre' => $this->vc_nombre,
                    ':t_descripcion' => $this->t_descripcion,
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

        public function actualizar() {
            try {
                $query = "UPDATE areas SET id_sucursal = :id_sucursal, vc_codarea = :vc_codarea, vc_nombre = :vc_nombre, t_descripcion = :t_descripcion, d_actualizacion = :d_actualizacion, c_activo = :c_activo WHERE id_area = :id_area";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_area = htmlspecialchars(strip_tags($this->id_area));
                $this->id_sucursal = htmlspecialchars(strip_tags($this->id_sucursal));
                $this->vc_codarea = htmlspecialchars(strip_tags($this->vc_codarea));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
                $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));       
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

                // Arreglo de parámetros
                $params = [
                    ':id_area' => $this->id_area,
                    ':id_sucursal' => $this->id_sucursal,
                    ':vc_codarea' => $this->vc_codarea,
                    ':vc_nombre' => $this->vc_nombre,
                    ':t_descripcion' => $this->t_descripcion,
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

        public function listarareasparaformulario($ID){
            try {
                $query = "SELECT a.id_area AS IDAREA, a.vc_nombre AS NAREA     
                FROM menu.areas AS a
                JOIN menu.sucursales AS s ON a.id_sucursal = s.id_sucursal
                WHERE s.id_empresa = :ID AND a.id_sucursal = :IDSUCU AND a.c_activo = 'S'";

                $stmt = $this->conn->prepare($query);
                $params = [
                    ':ID' => $ID,
                    ':IDSUCU' => $this->id_sucursal,
                ];
                $stmt->execute($params);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }

        }



    //---[NO ACTIVAS PROYECTO MENU ]---//

        public function leerUno($id) {
            try {
                $query = "SELECT * FROM areas WHERE id = :id LIMIT 0,1";
                $stmt = $this->conn->prepare($query);
                $params = [':id' => $id];
                $stmt->execute($params);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $this->id_area = $row['id_area'];
                    $this->id_sucursal = $row['id_sucursal'];
                    $this->vc_codarea = $row['vc_codarea'];
                    $this->vc_nombre = $row['vc_nombre'];
                    $this->t_descripcion = $row['t_descripcion'];
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
        public function eliminar($id) {
            try {
                $query = "DELETE FROM areas WHERE id = :id";
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