<?php
class Empleados {
    private $id_empleado;
    private $id_puestotrabajo;
    private $id_persona;
    private $d_inicio;
    private $d_fin;
    private $t_descripcion;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_empleado() {
            return $this->id_empleado;
        }

        public function setId_empleado($id_empleado) {
            $this->id_empleado = $id_empleado;
        }

        public function getId_puestotrabajo() {
            return $this->id_puestotrabajo;
        }

        public function setId_puestotrabajo($id_puestotrabajo) {
            $this->id_puestotrabajo = $id_puestotrabajo;
        }

        public function getId_persona() {
            return $this->id_persona;
        }

        public function setId_persona($id_persona) {
            $this->id_persona = $id_persona;
        }

        public function getD_inicio() {
            return $this->d_inicio;
        }

        public function setD_inicio($d_inicio) {
            $this->d_inicio = $d_inicio;
        }

        public function getD_fin() {
            return $this->d_fin;
        }

        public function setD_fin($d_fin) {
            $this->d_fin = $d_fin;
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
    public function agregar() {
        try {
            $query = "INSERT INTO empleados (id_puestotrabajo, id_persona, d_inicio, d_fin, t_descripcion, d_registro,  c_activo) VALUES (:id_puestotrabajo, :id_persona, :d_inicio, :d_fin, :t_descripcion, :d_registro, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_puestotrabajo = htmlspecialchars(strip_tags($this->id_puestotrabajo));
            $this->id_persona = htmlspecialchars(strip_tags($this->id_persona));
            $this->d_inicio = !empty($this->d_inicio) ? htmlspecialchars(strip_tags($this->d_inicio)) : null;
            $this->d_fin = !empty($this->d_fin) ? htmlspecialchars(strip_tags($this->d_fin)) : null;
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':id_puestotrabajo' => $this->id_puestotrabajo,
                ':id_persona' => $this->id_persona,
                ':d_inicio' => $this->d_inicio,
                ':d_fin' => $this->d_fin,
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

    public function listar() {
        try {
                $query = "SELECT e.id_empleado AS IDEMPLEADO, e.id_puestotrabajo AS IDPTBJO, e.id_persona AS IDPER, 
                e.d_inicio AS FINI,  e.d_fin AS FFIN, e.t_descripcion AS DESCRIP, e.c_activo AS ACTIVO,
                p.vc_nombrecompleto AS PERNOM,
                pt.vc_nombre AS PTNOM,
                a.vc_nombre AS ARENOM, a.id_area AS IDAREA,
                s.vc_nombresucursal AS SUCNOM, s.id_sucursal AS IDSUC
                FROM menu.empleados e
                JOIN menu.personas p ON e.id_persona = p.id_persona
                JOIN menu.puestotrabajo pt ON e.id_puestotrabajo = pt.id_puestotrabajo
                JOIN menu.areas AS a ON pt.id_area = a.id_area
                JOIN menu.sucursales AS s ON a.id_sucursal = s.id_sucursal";
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
            $query = "UPDATE empleados SET id_empleado = :id_empleado, id_puestotrabajo = :id_puestotrabajo, 
            id_persona = :id_persona, d_inicio = :d_inicio, d_fin = :d_fin, t_descripcion = :t_descripcion, 
            d_actualizacion = :d_actualizacion, c_activo = :c_activo 
            WHERE id_empleado = :id_empleado";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_empleado = htmlspecialchars(strip_tags($this->id_empleado));
            $this->id_puestotrabajo = htmlspecialchars(strip_tags($this->id_puestotrabajo));
            $this->id_persona = htmlspecialchars(strip_tags($this->id_persona));
            $this->d_inicio = !empty($this->d_inicio) ? htmlspecialchars(strip_tags($this->d_inicio)) : null;
            $this->d_fin = !empty($this->d_fin) ? htmlspecialchars(strip_tags($this->d_fin)) : null;
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));   
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':id_empleado' => $this->id_empleado,
                ':id_puestotrabajo' => $this->id_puestotrabajo,
                ':id_persona' => $this->id_persona,
                ':d_inicio' => $this->d_inicio,
                ':d_fin' => $this->d_fin,
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
}
?>