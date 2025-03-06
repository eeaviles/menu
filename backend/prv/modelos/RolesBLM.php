<?php
class Roles {
    private $id_rol;
    private $v_rol;
    private $t_comentario;
    private $conn;

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

    public function crear() {
        $query = "INSERT INTO roles (id_rol, v_rol, t_comentario) VALUES (:id_rol, :v_rol, :t_comentario)";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id_rol = htmlspecialchars(strip_tags($this->id_rol));
        $this->v_rol = htmlspecialchars(strip_tags($this->v_rol));
        $this->t_comentario = htmlspecialchars(strip_tags($this->t_comentario));

        // Arreglo de parámetros
        $params = [
            ':id_rol' => $this->id_rol,
            ':v_rol' => $this->v_rol,
            ':t_comentario' => $this->t_comentario,
        ];

        // Ejecutar la consulta con el arreglo de parámetros
        if ($stmt->execute($params)) {
            return true;
        }
        return false;
    }

    public function leer() {
        $query = "SELECT * FROM roles";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function leerUno($id) {
        $query = "SELECT * FROM roles WHERE id = :id LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $params = [':id' => $id];
        $stmt->execute($params);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $this->id_rol = $row['id_rol'];
            $this->v_rol = $row['v_rol'];
            $this->t_comentario = $row['t_comentario'];
            return true;
        }
        return false;
    }

    public function actualizar() {
        $query = "UPDATE roles SET id_rol = : , v_rol = : , t_comentario = : WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id_rol = htmlspecialchars(strip_tags($this->id_rol));
        $this->v_rol = htmlspecialchars(strip_tags($this->v_rol));
        $this->t_comentario = htmlspecialchars(strip_tags($this->t_comentario));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Arreglo de parámetros
        $params = [
            ':id_rol' => $this->id_rol,
            ':v_rol' => $this->v_rol,
            ':t_comentario' => $this->t_comentario,
            ':id' => $this->id
        ];

        // Ejecutar la consulta con el arreglo de parámetros
        if ($stmt->execute($params)) {
            return true;
        }
        return false;
    }

    public function eliminar($id) {
        $query = "DELETE FROM roles WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $params = [':id' => $id];
        if ($stmt->execute($params)) {
            return true;
        }
        return false;
    }
}
?>