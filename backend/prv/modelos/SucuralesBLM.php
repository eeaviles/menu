<?php
class Sucursales {
    private $id_sucursal;
    private $id_empresa;
    private $id_cat020;
    private $id_cat9;
    private $id_cat13;
    private $vc_codsucursal;
    private $vc_nombresucursal;
    private $vc_ubicacion;
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
        public function getId_sucursal() {
            return $this->id_sucursal;
        }

        public function setId_sucursal($id_sucursal) {
            $this->id_sucursal = $id_sucursal;
        }

        public function getId_empresa() {
            return $this->id_empresa;
        }

        public function setId_empresa($id_empresa) {
            $this->id_empresa = $id_empresa;
        }

        public function getId_cat020() {
            return $this->id_cat020;
        }

        public function setId_cat020($id_cat020) {
            $this->id_cat020 = $id_cat020;
        }

        public function getId_cat9() {
            return $this->id_cat9;
        }

        public function setId_cat9($id_cat9) {
            $this->id_cat9 = $id_cat9;
        }

        public function getId_cat13() {
            return $this->id_cat13;
        }

        public function setId_cat13($id_cat13) {
            $this->id_cat13 = $id_cat13;
        }

        public function getVc_codsucursal() {
            return $this->vc_codsucursal;
        }

        public function setVc_codsucursal($vc_codsucursal) {
            $this->vc_codsucursal = $vc_codsucursal;
        }

        public function getVc_nombresucursal() {
            return $this->vc_nombresucursal;
        }

        public function setVc_nombresucursal($vc_nombresucursal) {
            $this->vc_nombresucursal = $vc_nombresucursal;
        }

        public function getVc_ubicacion() {
            return $this->vc_ubicacion;
        }

        public function setVc_ubicacion($vc_ubicacion) {
            $this->vc_ubicacion = $vc_ubicacion;
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
    
    public function agregarsucursales() {
        try {
            $query = "INSERT INTO menu.sucursales (id_empresa, id_cat020, id_cat9, id_cat13, vc_codsucursal, vc_nombresucursal, vc_ubicacion, vc_telefono, t_descripcion, d_registro, c_activo) 
            VALUES (:id_empresa, :id_cat020, :id_cat9, :id_cat13, :vc_codsucursal, :vc_nombresucursal, :vc_ubicacion, :vc_telefono, :t_descripcion, :d_registro, :c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->id_empresa = htmlspecialchars(strip_tags($this->id_empresa));
            $this->id_cat020 = htmlspecialchars(strip_tags($this->id_cat020));
            $this->id_cat9 = htmlspecialchars(strip_tags($this->id_cat9));
            $this->id_cat13 = htmlspecialchars(strip_tags($this->id_cat13));
            $this->vc_codsucursal = htmlspecialchars(strip_tags($this->vc_codsucursal));
            $this->vc_nombresucursal = htmlspecialchars(strip_tags($this->vc_nombresucursal));
            $this->vc_ubicacion = htmlspecialchars(strip_tags($this->vc_ubicacion));
            $this->vc_telefono = htmlspecialchars(strip_tags($this->vc_telefono));
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':id_empresa' => $this->id_empresa,
                ':id_cat020' => $this->id_cat020,
                ':id_cat9' => $this->id_cat9,
                ':id_cat13' => $this->id_cat13,
                ':vc_codsucursal' => $this->vc_codsucursal,
                ':vc_nombresucursal' => $this->vc_nombresucursal,
                ':vc_ubicacion' => $this->vc_ubicacion,
                ':vc_telefono' => $this->vc_telefono,
                ':t_descripcion' => $this->t_descripcion,
                ':d_registro' => $this->d_registro,
                ':c_activo' => $this->c_activo,
            ];

            // Ejecutar la consulta con el arreglo de parámetros
            if ($stmt->execute($params)) {
                return 'Secursales';
            }
            return false;
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function actualizarsucursales() {
        try {
            $query = "UPDATE menu.sucursales SET id_empresa = :id_empresa, id_cat020 = :id_cat020, id_cat9 = :id_cat9, id_cat13 = :id_cat13, vc_codsucursal = :vc_codsucursal, vc_nombresucursal = :vc_nombresucursal, vc_ubicacion = :vc_ubicacion, vc_telefono = :vc_telefono,  t_descripcion = :t_descripcion, d_actualizacion = :d_actualizacion, c_activo = :c_activo 
            WHERE id_sucursal = :id_sucursal";
            $stmt = $this->conn->prepare($query);
            
            // Sanitizar datos
            $this->id_sucursal = htmlspecialchars(strip_tags($this->id_sucursal));
            $this->id_empresa = htmlspecialchars(strip_tags($this->id_empresa));
            $this->id_cat020 = htmlspecialchars(strip_tags($this->id_cat020));
            $this->id_cat9 = htmlspecialchars(strip_tags($this->id_cat9));
            $this->id_cat13 = htmlspecialchars(strip_tags($this->id_cat13));
            $this->vc_codsucursal = htmlspecialchars(strip_tags($this->vc_codsucursal));
            $this->vc_nombresucursal = htmlspecialchars(strip_tags($this->vc_nombresucursal));
            $this->vc_ubicacion = htmlspecialchars(strip_tags($this->vc_ubicacion));
            $this->vc_telefono = htmlspecialchars(strip_tags($this->vc_telefono));
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
            $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));     

            // Arreglo de parámetros
            $params = [
                ':id_sucursal' => $this->id_sucursal,
                ':id_empresa' => $this->id_empresa,
                ':id_cat020' => $this->id_cat020,
                ':id_cat9' => $this->id_cat9,
                ':id_cat13' => $this->id_cat13,
                ':vc_codsucursal' => $this->vc_codsucursal,
                ':vc_nombresucursal' => $this->vc_nombresucursal,
                ':vc_ubicacion' => $this->vc_ubicacion,
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
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    //---[ FUNCIONAL MENU: AccionesSucursales.js ]---
    public function listarsucursalesxid(){      
        $TokenArray = array(':IDEMP'=>$this->id_empresa);             
        try{      
            $query=
            'SELECT ROW_NUMBER() OVER (ORDER BY s.id_sucursal ) AS NF, s.id_sucursal AS IDSUC, e.id_empresa AS IDEMP, 
            s.vc_codsucursal AS CODSUC, s.vc_nombresucursal AS NOMBRE, s.vc_ubicacion AS UBI, s.vc_telefono AS TEL, 
            s.t_descripcion AS DESCRIP, muni.id_cat13 AS IDCAT13, muni.vc_valores AS MUNICIPIO, depa.vc_valores AS DEPARTAMENTO, depa.id_cat12 AS IDCAT12, est.id_cat9 AS IDCAT9, est.vc_valores AS NCAT9, pais.id_cat020 AS IDCAT20, 
            pais.vc_valores AS NCAT20                
            FROM menu.sucursales AS s
            JOIN menu.empresas AS e ON s.id_empresa = e.id_empresa
            JOIN menu.cat9 AS est ON s.id_cat9 = est.id_cat9
            JOIN menu.cat13 AS muni ON s.id_cat13 = muni.id_cat13
            JOIN menu.cat12 AS depa ON muni.id_cat12 = depa.id_cat12
            JOIN menu.cat020 AS pais ON s.id_cat020 = pais.id_cat020
            WHERE s.id_empresa=:IDEMP
            ';
   
            $sth = $this->conn->prepare($query);      
            $sth->execute($TokenArray);
            $result = $sth->fetchAll(PDO::FETCH_ASSOC); 
            return $result;
        } catch (Exception $e) {
            echo $e->getMessage();
        }  
    } 

    //---[ FUNCIONAL MENU: AreasSucursales.js ]---
    public function listarsucursalesparaformulario() {
        try {
            $query = "SELECT id_sucursal AS IDSUC, vc_nombresucursal AS NSUC 
            FROM menu.sucursales
            WHERE id_empresa = :id";
            $params = [':id' => $this->id_empresa];
            $stmt = $this->conn->prepare($query);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

//--------------------------------------------------------



    public function eliminar($id) {
        try {
            $query = "DELETE FROM sucursales WHERE id = :id";
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
