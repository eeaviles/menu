<?php
class Empresascontactos {
    private $id_empresacontacto;
    private $id_empresa;
    private $vc_nombre;
    private $vc_dui;
    private $vc_correo;
    private $vc_puestotrabajo;
    private $vc_area;
    private $vc_telefono;
    private $t_descripcion;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

//---[ Getter and Setter ]-----------------------------------------------------
    public function getId_empresacontacto() {
        return $this->id_empresacontacto;
    }

    public function setId_empresacontacto($id_empresacontacto) {
        $this->id_empresacontacto = $id_empresacontacto;
    }

    public function getId_empresa() {
        return $this->id_empresa;
    }

    public function setId_empresa($id_empresa) {
        $this->id_empresa = $id_empresa;
    }

    public function getVc_nombre() {
        return $this->vc_nombre;
    }

    public function setVc_nombre($vc_nombre) {
        $this->vc_nombre = $vc_nombre;
    }

    public function getVc_dui() {
        return $this->vc_dui;
    }

    public function setVc_dui($vc_dui) {
        $this->vc_dui = $vc_dui;
    }

    public function getVc_correo() {
        return $this->vc_correo;
    }

    public function setVc_correo($vc_correo) {
        $this->vc_correo = $vc_correo;
    }

    public function getVc_puestotrabajo() {
        return $this->vc_puestotrabajo;
    }

    public function setVc_puestotrabajo($vc_puestotrabajo) {
        $this->vc_puestotrabajo = $vc_puestotrabajo;
    }

    public function getVc_area() {
        return $this->vc_area;
    }

    public function setVc_area($vc_area) {
        $this->vc_area = $vc_area;
    }

    public function getVc_telefono() {
        return $this->vc_telefono;
    }

    public function setVc_telefono($vc_telefono) {
        $this->vc_telefono = $vc_telefono;
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
            $query = "INSERT INTO menu.empresascontactos (id_empresa, vc_nombre, vc_dui, vc_correo, vc_puestotrabajo, vc_area, vc_telefono, t_descripcion, d_registro, c_activo) VALUES (:id_empresa, :vc_nombre, :vc_dui, :vc_correo, :vc_puestotrabajo, :vc_area, :vc_telefono, :t_descripcion, :d_registro, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_empresa = htmlspecialchars(strip_tags($this->id_empresa));
            $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
            $this->vc_dui = htmlspecialchars(strip_tags($this->vc_dui));
            $this->vc_correo = htmlspecialchars(strip_tags($this->vc_correo));
            $this->vc_puestotrabajo = htmlspecialchars(strip_tags($this->vc_puestotrabajo));
            $this->vc_area = htmlspecialchars(strip_tags($this->vc_area));
            $this->vc_telefono = htmlspecialchars(strip_tags($this->vc_telefono));
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':id_empresa' => $this->id_empresa,
                ':vc_nombre' => $this->vc_nombre,
                ':vc_dui' => $this->vc_dui,
                ':vc_correo' => $this->vc_correo,
                ':vc_puestotrabajo' => $this->vc_puestotrabajo,
                ':vc_area' => $this->vc_area,
                ':vc_telefono' => $this->vc_telefono,
                ':t_descripcion' => $this->t_descripcion,
                ':d_registro' => $this->d_registro,
                ':c_activo' => $this->c_activo,
            ];

            // Ejecutar la consulta con el arreglo de parámetros
            if ($stmt->execute($params)) {
                return "Empresacontactos";
            }
            return false;
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }//---[ACTIVO DESDE ActualizarEmpresa.js]

    public function actualizar() {
        try {
            $query = "UPDATE menu.empresascontactos SET id_empresa = :id_empresa , vc_nombre = :vc_nombre , vc_dui = :vc_dui , vc_correo = :vc_correo , vc_puestotrabajo = :vc_puestotrabajo , vc_area = :vc_area , vc_telefono = :vc_telefono , t_descripcion = :t_descripcion, d_actualizacion = :d_actualizacion, c_activo = :c_activo WHERE id_empresacontacto = :id_empresacontacto";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_empresacontacto = htmlspecialchars(strip_tags($this->id_empresacontacto));
            $this->id_empresa = htmlspecialchars(strip_tags($this->id_empresa));
            $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
            $this->vc_dui = htmlspecialchars(strip_tags($this->vc_dui));
            $this->vc_correo = htmlspecialchars(strip_tags($this->vc_correo));
            $this->vc_puestotrabajo = htmlspecialchars(strip_tags($this->vc_puestotrabajo));
            $this->vc_area = htmlspecialchars(strip_tags($this->vc_area));
            $this->vc_telefono = htmlspecialchars(strip_tags($this->vc_telefono));
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));            
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));
            

            // Arreglo de parámetros
            $params = [
                ':id_empresacontacto' => $this->id_empresacontacto,
                ':id_empresa' => $this->id_empresa,
                ':vc_nombre' => $this->vc_nombre,
                ':vc_dui' => $this->vc_dui,
                ':vc_correo' => $this->vc_correo,
                ':vc_puestotrabajo' => $this->vc_puestotrabajo,
                ':vc_area' => $this->vc_area,
                ':vc_telefono' => $this->vc_telefono,
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
            echo 'Error EmpresasContactoBLM, AC: ' . $e->getMessage();
            return false;
        }
    }//---[ACTIVO DESDE ActualizarEmpresa.js]






//----------------------------------------------------------------------------------
    public function leer() {
        try {
            $query = "SELECT * FROM empresascontactos";
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
            $query = "SELECT * FROM empresascontactos WHERE id = :id LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $params = [':id' => $id];
            $stmt->execute($params);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $this->id_empresacontacto = $row['id_empresacontacto'];
                $this->id_empresa = $row['id_empresa'];
                $this->vc_nombre = $row['vc_nombre'];
                $this->vc_dui = $row['vc_dui'];
                $this->vc_correo = $row['vc_correo'];
                $this->vc_puestotrabajo = $row['vc_puestotrabajo'];
                $this->vc_area = $row['vc_area'];
                $this->vc_telefono = $row['vc_telefono'];
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
            $query = "DELETE FROM empresascontactos WHERE id = :id";
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