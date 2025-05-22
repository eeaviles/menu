<?php
class Detalleordenes {
    private $id_detalleorden;
    private $id_orden;
    private $id_producto;
    private $dc_preciounidad;
    private $i_cantidad;
    private $dc_preciofinal;
    private $dc_descuento;
    private $dc_totalapagar;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_detalleorden() {
            return $this->id_detalleorden;
        }

        public function setId_detalleorden($id_detalleorden) {
            $this->id_detalleorden = $id_detalleorden;
        }

        public function getId_orden() {
            return $this->id_orden;
        }

        public function setId_orden($id_orden) {
            $this->id_orden = $id_orden;
        }

        public function getId_producto() {
            return $this->id_producto;
        }

        public function setId_producto($id_producto) {
            $this->id_producto = $id_producto;
        }

        public function getDc_preciounidad() {
            return $this->dc_preciounidad;
        }

        public function setDc_preciounidad($dc_preciounidad) {
            $this->dc_preciounidad = $dc_preciounidad;
        }

        public function getI_cantidad() {
            return $this->i_cantidad;
        }

        public function setI_cantidad($i_cantidad) {
            $this->i_cantidad = $i_cantidad;
        }

        public function getDc_preciofinal() {
            return $this->dc_preciofinal;
        }

        public function setDc_preciofinal($dc_preciofinal) {
            $this->dc_preciofinal = $dc_preciofinal;
        }

        public function getDc_descuento() {
            return $this->dc_descuento;
        }

        public function setDc_descuento($dc_descuento) {
            $this->dc_descuento = $dc_descuento;
        }

        public function getDc_totalapagar() {
            return $this->dc_totalapagar;
        }

        public function setDc_totalapagar($dc_totalapagar) {
            $this->dc_totalapagar = $dc_totalapagar;
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
   
    //---[ ACTIVADOS]-------------------------------------------------------------
   
    public function agregar() {
        try {
            $query = "INSERT INTO menu.detalleordenes (id_orden, id_producto, dc_preciounidad, i_cantidad, dc_preciofinal, dc_descuento, dc_totalapagar, d_registro, c_activo) VALUES ( :id_orden, :id_producto, :dc_preciounidad, :i_cantidad, :dc_preciofinal, :dc_descuento, :dc_totalapagar, :d_registro, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos          
            $this->id_orden = htmlspecialchars(strip_tags($this->id_orden));
            $this->id_producto = htmlspecialchars(strip_tags($this->id_producto));
            $this->dc_preciounidad = htmlspecialchars(strip_tags($this->dc_preciounidad));
            $this->i_cantidad = htmlspecialchars(strip_tags($this->i_cantidad));
            $this->dc_preciofinal = htmlspecialchars(strip_tags($this->dc_preciofinal));
            $this->dc_descuento = htmlspecialchars(strip_tags($this->dc_descuento));
            $this->dc_totalapagar = htmlspecialchars(strip_tags($this->dc_totalapagar));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [      
                ':id_orden' => $this->id_orden,
                ':id_producto' => $this->id_producto,
                ':dc_preciounidad' => $this->dc_preciounidad,
                ':i_cantidad' => $this->i_cantidad,
                ':dc_preciofinal' => $this->dc_preciofinal,
                ':dc_descuento' => $this->dc_descuento,
                ':dc_totalapagar' => $this->dc_totalapagar,
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
            $query = "SELECT d.id_detalleorden AS IDDETORD, d.id_orden AS IDOR, d.id_producto AS IDPROD, d.dc_preciounidad AS PRECIO, d.i_cantidad AS CANT, d.dc_preciofinal AS PREFIN,
            d.dc_descuento AS PRECDES, d.dc_totalapagar AS TAPGAR,
            prd.vc_nombre AS NOMPRD
            FROM menu.detalleordenes AS d
            JOIN menu.productos AS prd ON d.id_producto = prd.id_producto
            JOIN menu.ordenes AS o ON d.id_orden=o.id_orden
            WHERE o.id_orden = :id";
            $stmt = $this->conn->prepare($query);
            $params = [':id' => $this->getId_orden()];
            $stmt->execute($params);

            if ($stmt->execute($params)) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            return false;            
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }


//---[ NO ACTIVADAS]-----------------------------------------------


    public function leerUno($id) {
        try {
            $query = "SELECT * FROM detalleordenes WHERE id = :id LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $params = [':id' => $id];
            $stmt->execute($params);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $this->id_detalleorden = $row['id_detalleorden'];
                $this->id_orden = $row['id_orden'];
                $this->id_producto = $row['id_producto'];
                $this->dc_preciounidad = $row['dc_preciounidad'];
                $this->i_cantidad = $row['i_cantidad'];
                $this->dc_preciofinal = $row['dc_preciofinal'];
                $this->dc_descuento = $row['dc_descuento'];
                $this->dc_totalapagar = $row['dc_totalapagar'];
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
            $query = "UPDATE detalleordenes SET id_detalleorden = : , id_orden = : , id_producto = : , dc_preciounidad = : , i_cantidad = : , dc_preciofinal = : , dc_descuento = : , dc_totalapagar = : , d_registro = : , d_actualizacion = : , c_activo = : WHERE id = :id";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_detalleorden = htmlspecialchars(strip_tags($this->id_detalleorden));
            $this->id_orden = htmlspecialchars(strip_tags($this->id_orden));
            $this->id_producto = htmlspecialchars(strip_tags($this->id_producto));
            $this->dc_preciounidad = htmlspecialchars(strip_tags($this->dc_preciounidad));
            $this->i_cantidad = htmlspecialchars(strip_tags($this->i_cantidad));
            $this->dc_preciofinal = htmlspecialchars(strip_tags($this->dc_preciofinal));
            $this->dc_descuento = htmlspecialchars(strip_tags($this->dc_descuento));
            $this->dc_totalapagar = htmlspecialchars(strip_tags($this->dc_totalapagar));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Arreglo de parámetros
            $params = [
                ':id_detalleorden' => $this->id_detalleorden,
                ':id_orden' => $this->id_orden,
                ':id_producto' => $this->id_producto,
                ':dc_preciounidad' => $this->dc_preciounidad,
                ':i_cantidad' => $this->i_cantidad,
                ':dc_preciofinal' => $this->dc_preciofinal,
                ':dc_descuento' => $this->dc_descuento,
                ':dc_totalapagar' => $this->dc_totalapagar,
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
            $query = "DELETE FROM detalleordenes WHERE id = :id";
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