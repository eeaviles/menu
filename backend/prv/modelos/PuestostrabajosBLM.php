<?php
class Puestotrabajo {
    private $id_puestotrabajo;
    private $id_area;
    private $vc_codpuestotrabajo;
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
        public function getId_puestotrabajo() {
            return $this->id_puestotrabajo;
        }

        public function setId_puestotrabajo($id_puestotrabajo) {
            $this->id_puestotrabajo = $id_puestotrabajo;
        }

        public function getId_area() {
            return $this->id_area;
        }

        public function setId_area($id_area) {
            $this->id_area = $id_area;
        }

        public function getVc_codpuestotrabajo() {
            return $this->vc_codpuestotrabajo;
        }

        public function setVc_codpuestotrabajo($vc_codpuestotrabajo) {
            $this->vc_codpuestotrabajo = $vc_codpuestotrabajo;
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

    //-----[ Métodos de la clase ]------------------------------------------------

    //---[ACTIVAS PROYECTO MENU ]---//
    public function listarxid($id) {
        try {
            $query = "SELECT pt.id_puestotrabajo AS IDPT, pt.id_area AS IDAREA, pt.vc_codpuestotrabajo AS CODPT, pt.vc_nombre AS PTNOM, pt.t_descripcion AS PTDESCRIP,
            a.vc_nombre AS NAREA, s.vc_nombresucursal AS NSUC, s.id_sucursal AS IDSUC
            FROM menu.puestotrabajo AS pt
            JOIN menu.areas AS a ON pt.id_area = a.id_area
            JOIN menu.sucursales AS s ON a.id_sucursal = s.id_sucursal
            JOIN menu.empresas AS e ON s.id_empresa = e.id_empresa
            WHERE e.id_empresa = :id ";
            $params = [
                ':id' => $id
            ];
            $stmt = $this->conn->prepare($query);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function actualizar() {
        try {
            $query = "UPDATE puestotrabajo SET id_area = :id_area, vc_codpuestotrabajo = :vc_codpuestotrabajo, 
            vc_nombre = :vc_nombre, t_descripcion = :t_descripcion, d_actualizacion = :d_actualizacion, c_activo = :c_activo 
            WHERE id_puestotrabajo = :id_puestotrabajo";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_puestotrabajo = htmlspecialchars(strip_tags($this->id_puestotrabajo));
            $this->id_area = htmlspecialchars(strip_tags($this->id_area));
            $this->vc_codpuestotrabajo = htmlspecialchars(strip_tags($this->vc_codpuestotrabajo));
            $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));  

            // Arreglo de parámetros
            $params = [
                ':id_puestotrabajo' => $this->id_puestotrabajo,
                ':id_area' => $this->id_area,
                ':vc_codpuestotrabajo' => $this->vc_codpuestotrabajo,
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

    public function agregar() {
        try {
            $query = "INSERT INTO puestotrabajo (id_area, vc_codpuestotrabajo, vc_nombre, t_descripcion, d_registro, c_activo) VALUES (:id_area, :vc_codpuestotrabajo, :vc_nombre, :t_descripcion, :d_registro, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_area = htmlspecialchars(strip_tags($this->id_area));
            $this->vc_codpuestotrabajo = htmlspecialchars(strip_tags($this->vc_codpuestotrabajo));
            $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':id_area' => $this->id_area,
                ':vc_codpuestotrabajo' => $this->vc_codpuestotrabajo,
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

    public function listarareasparaformulario($ID){ 
        try {
            $query = "SELECT id_puestotrabajo AS IDPTBJO, vc_nombre AS NPTBJO
            FROM puestotrabajo WHERE id_area = :ID";            
            $stmt = $this->conn->prepare($query);
            $params = [
                ':ID' => $this->id_area
            ];
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

}
?>