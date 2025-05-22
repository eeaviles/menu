<?php
class Ordenes {
    private $id_orden;
    private $id_usuario;
    private $vc_codigo;
    private $dt_creacion;
    private $dc_totalpreciofinal;
    private $dc_totaldescuento;
    private $dc_totalapagar;
    private $c_estado;
    private $c_metodopago;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_orden() {
            return $this->id_orden;
        }

        public function setId_orden($id_orden) {
            $this->id_orden = $id_orden;
        }

        public function getId_usuario() {
            return $this->id_usuario;
        }

        public function setId_usuario($id_usuario) {
            $this->id_usuario = $id_usuario;
        }

        public function getVc_codigo() {
            return $this->vc_codigo;
        }

        public function setVc_codigo($vc_codigo) {
            $this->vc_codigo = $vc_codigo;
        }

        public function getDt_creacion() {
            return $this->dt_creacion;
        }

        public function setDt_creacion($dt_creacion) {
            $this->dt_creacion = $dt_creacion;
        }

        public function getDc_totalpreciofinal() {
            return $this->dc_totalpreciofinal;
        }

        public function setDc_totalpreciofinal($dc_totalpreciofinal) {
            $this->dc_totalpreciofinal = $dc_totalpreciofinal;
        }

        public function getDc_totaldescuento() {
            return $this->dc_totaldescuento;
        }

        public function setDc_totaldescuento($dc_totaldescuento) {
            $this->dc_totaldescuento = $dc_totaldescuento;
        }

        public function getDc_totalapagar() {
            return $this->dc_totalapagar;
        }

        public function setDc_totalapagar($dc_totalapagar) {
            $this->dc_totalapagar = $dc_totalapagar;
        }

        public function getC_estado() {
            return $this->c_estado;
        }

        public function setC_estado($c_estado) {
            $this->c_estado = $c_estado;
        }

        public function getC_metodopago() {
            return $this->c_metodopago;
        }

        public function setC_metodopago($c_metodopago) {
            $this->c_metodopago = $c_metodopago;
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
    
    //---[  ACTIVAS PROYECTO MENU ]-------------------
    public function agregar() {
        try {
            $query = "INSERT INTO menu.ordenes (id_usuario, dt_creacion, vc_codigo, dc_totalpreciofinal, dc_totaldescuento, dc_totalapagar, c_estado, c_metodopago, d_registro, c_activo) VALUES (:id_usuario, :dt_creacion, :vc_codigo, :dc_totalpreciofinal, :dc_totaldescuento, :dc_totalapagar, :c_estado, :c_metodopago, :d_registro, :c_activo)";

            $stmt = $this->conn->prepare($query);

            //-----[ Sanitizar datos ]    
            $this->id_usuario = htmlspecialchars(strip_tags($this->id_usuario));
            $this->dt_creacion = htmlspecialchars(strip_tags($this->dt_creacion));
            $this->vc_codigo = htmlspecialchars(strip_tags($this->vc_codigo));
            $this->dc_totalpreciofinal = htmlspecialchars(strip_tags($this->dc_totalpreciofinal));
            $this->dc_totaldescuento = htmlspecialchars(strip_tags($this->dc_totaldescuento));
            $this->dc_totalapagar = htmlspecialchars(strip_tags($this->dc_totalapagar));
            $this->c_estado = htmlspecialchars(strip_tags($this->c_estado));
            $this->c_metodopago = htmlspecialchars(strip_tags($this->c_metodopago));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));     
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            //-----[ Arreglo de parámetros ]
            $params = [
                ':id_usuario' => $this->id_usuario,
                ':dt_creacion' => $this->dt_creacion,
                ':vc_codigo' => $this->vc_codigo,
                ':dc_totalpreciofinal' => $this->dc_totalpreciofinal,
                ':dc_totaldescuento' => $this->dc_totaldescuento,
                ':dc_totalapagar' => $this->dc_totalapagar,
                ':c_estado' => $this->c_estado,
                ':c_metodopago' => $this->c_metodopago,
                ':d_registro' => $this->d_registro,
                ':c_activo' => $this->c_activo,
            ];

            if ($stmt->execute($params)) {
                $lastinsert=$this->conn->lastInsertId();
                return $lastinsert ;
            }     
            return false;
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function listar() {
        try {
            $query = "SELECT ROW_NUMBER() OVER (ORDER BY o.id_orden ) AS NF, o.id_orden AS IDORD, 
            concat( per.vc_nbre1,\" \" ,per.vc_nbre2,\" \", per.vc_Ape1, \" \", per.vc_Ape2) AS NOMBRE, 
             o.dt_creacion AS  FECREA, o.dc_totalapagar AS TPAGO, o.dc_totaldescuento AS TDES, 
             o.dc_totalpreciofinal AS TFINAL, o.c_estado AS ESTADO
            FROM menu.ordenes o
            JOIN menu.usuarios AS u ON o.id_usuario = u.id_usuario
            JOIN menu.personas AS per ON u.id_persona = per.id_persona";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function listarporfechas($FI,$FF) {
        try {
            $query = "SELECT ROW_NUMBER() OVER (ORDER BY o.id_orden ) AS NF, o.id_orden AS IDORD,  o.vc_codigo AS CODOR,
            concat( per.vc_nbre1,\" \" ,per.vc_nbre2,\" \", per.vc_Ape1, \" \", per.vc_Ape2) AS NOMBRE, 
             o.dt_creacion AS  FECREA, o.dc_totalapagar AS TPAGO, o.dc_totaldescuento AS TDES, 
             o.dc_totalpreciofinal AS TFINAL, o.c_estado AS ESTADO
            FROM menu.ordenes o
            JOIN menu.usuarios AS u ON o.id_usuario = u.id_usuario
            JOIN menu.personas AS per ON u.id_persona = per.id_persona
            WHERE DATE(o.dt_creacion) BETWEEN :FI AND :FF";          
            $stmt = $this->conn->prepare($query);
            $params = [
                ':FI' => $FI,
                ':FF' => $FF
            ];
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }



    //-----[ NO ACTIVAS PROYECTO MENU ]-------------------

    public function leerUno($id) {
        try {
            $query = "SELECT * FROM ordenes WHERE id = :id LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $params = [':id' => $id];
            $stmt->execute($params);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $this->id_orden = $row['id_orden'];
                $this->id_usuario = $row['id_usuario'];
                $this->dt_creacion = $row['dt_creacion'];
                $this->dc_totalpreciofinal = $row['dc_totalpreciofinal'];
                $this->dc_totaldescuento = $row['dc_totaldescuento'];
                $this->dc_totalapagar = $row['dc_totalapagar'];
                $this->c_estado = $row['c_estado'];
                $this->c_metodopago = $row['c_metodopago'];
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
            $query = "UPDATE ordenes SET id_orden = : , id_usuario = : , dt_creacion = : , dc_totalpreciofinal = : , dc_totaldescuento = : , dc_totalapagar = : , c_estado = : , c_metodopago = : , d_registro = : , d_actualizacion = : , c_activo = : WHERE id = :id";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_orden = htmlspecialchars(strip_tags($this->id_orden));
            $this->id_usuario = htmlspecialchars(strip_tags($this->id_usuario));
            $this->dt_creacion = htmlspecialchars(strip_tags($this->dt_creacion));
            $this->dc_totalpreciofinal = htmlspecialchars(strip_tags($this->dc_totalpreciofinal));
            $this->dc_totaldescuento = htmlspecialchars(strip_tags($this->dc_totaldescuento));
            $this->dc_totalapagar = htmlspecialchars(strip_tags($this->dc_totalapagar));
            $this->c_estado = htmlspecialchars(strip_tags($this->c_estado));
            $this->c_metodopago = htmlspecialchars(strip_tags($this->c_metodopago));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Arreglo de parámetros
            $params = [
                ':id_orden' => $this->id_orden,
                ':id_usuario' => $this->id_usuario,
                ':dt_creacion' => $this->dt_creacion,
                ':dc_totalpreciofinal' => $this->dc_totalpreciofinal,
                ':dc_totaldescuento' => $this->dc_totaldescuento,
                ':dc_totalapagar' => $this->dc_totalapagar,
                ':c_estado' => $this->c_estado,
                ':c_metodopago' => $this->c_metodopago,
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
            $query = "DELETE FROM ordenes WHERE id = :id";
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