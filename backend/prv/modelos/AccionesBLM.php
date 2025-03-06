<?php
class Acciones {
    private $id_acciones;
    private $id_usuario;
    private $vc_tipoaccion;
    private $vc_tableaffectada;
    private $t_descripcion;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getId_acciones() {
        return $this->id_acciones;
    }

    public function setId_acciones($id_acciones) {
        $this->id_acciones = $id_acciones;
    }

    public function getId_usuario() {
        return $this->id_usuario;
    }

    public function setId_usuario($id_usuario) {
        $this->id_usuario = $id_usuario;
    }

    public function getVc_tipoaccion() {
        return $this->vc_tipoaccion;
    }

    public function setVc_tipoaccion($vc_tipoaccion) {
        $this->vc_tipoaccion = $vc_tipoaccion;
    }

    public function getVc_tableaffectada() {
        return $this->vc_tableaffectada;
    }

    public function setVc_tableaffectada($vc_tableaffectada) {
        $this->vc_tableaffectada = $vc_tableaffectada;
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

    public function crear() {
        $query = "INSERT INTO acciones (id_acciones, id_usuario, vc_tipoaccion, vc_tableaffectada, t_descripcion, d_registro, d_actualizacion, c_activo) VALUES (:id_acciones, :id_usuario, :vc_tipoaccion, :vc_tableaffectada, :t_descripcion, :d_registro, :d_actualizacion, :c_activo)";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id_acciones = htmlspecialchars(strip_tags($this->id_acciones));
        $this->id_usuario = htmlspecialchars(strip_tags($this->id_usuario));
        $this->vc_tipoaccion = htmlspecialchars(strip_tags($this->vc_tipoaccion));
        $this->vc_tableaffectada = htmlspecialchars(strip_tags($this->vc_tableaffectada));
        $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
        $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
        $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
        $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

        // Arreglo de parámetros
        $params = [
            ':id_acciones' => $this->id_acciones,
            ':id_usuario' => $this->id_usuario,
            ':vc_tipoaccion' => $this->vc_tipoaccion,
            ':vc_tableaffectada' => $this->vc_tableaffectada,
            ':t_descripcion' => $this->t_descripcion,
            ':d_registro' => $this->d_registro,
            ':d_actualizacion' => $this->d_actualizacion,
            ':c_activo' => $this->c_activo,
        ];

        // Ejecutar la consulta con el arreglo de parámetros
        if ($stmt->execute($params)) {
            return true;
        }
        return false;
    }

    public function leer() {
        $query = "SELECT * FROM acciones";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function leerUno($id) {
        $query = "SELECT * FROM acciones WHERE id = :id LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $params = [':id' => $id];
        $stmt->execute($params);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $this->id_acciones = $row['id_acciones'];
            $this->id_usuario = $row['id_usuario'];
            $this->vc_tipoaccion = $row['vc_tipoaccion'];
            $this->vc_tableaffectada = $row['vc_tableaffectada'];
            $this->t_descripcion = $row['t_descripcion'];
            $this->d_registro = $row['d_registro'];
            $this->d_actualizacion = $row['d_actualizacion'];
            $this->c_activo = $row['c_activo'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE acciones SET id_acciones = : , id_usuario = : , vc_tipoaccion = : , vc_tableaffectada = : , t_descripcion = : , d_registro = : , d_actualizacion = : , c_activo = : WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id_acciones = htmlspecialchars(strip_tags($this->id_acciones));
        $this->id_usuario = htmlspecialchars(strip_tags($this->id_usuario));
        $this->vc_tipoaccion = htmlspecialchars(strip_tags($this->vc_tipoaccion));
        $this->vc_tableaffectada = htmlspecialchars(strip_tags($this->vc_tableaffectada));
        $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
        $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
        $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
        $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Arreglo de parámetros
        $params = [
            ':id_acciones' => $this->id_acciones,
            ':id_usuario' => $this->id_usuario,
            ':vc_tipoaccion' => $this->vc_tipoaccion,
            ':vc_tableaffectada' => $this->vc_tableaffectada,
            ':t_descripcion' => $this->t_descripcion,
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
    }

    public function eliminar($id) {
        $query = "DELETE FROM acciones WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $params = [':id' => $id];
        if ($stmt->execute($params)) {
            return true;
        }
        return false;
    }
}
?>