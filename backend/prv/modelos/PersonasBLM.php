<?php
class Personas {
    private $id_persona;
    private $vc_nombrecompleto;
    private $vc_nbre1;
    private $vc_nbre2;
    private $vc_ape1;
    private $vc_ape2;
    private $d_fnacimiento;
    private $vc_sex;
    private $vc_estadocivil;
    private $vc_nacionalidad;
    private $vc_paisresidencia;
    private $vc_profesionoficio;
    private $vc_correo;
    private $vc_foto;
    private $vc_nitdui;
    private $vc_pasaporte;
    private $t_direccion;
    private $vc_vivienda;
    private $i_tiemporesidir;
    private $vc_tel;
    private $vc_perconnombre;
    private $vc_perconparentesco;
    private $vc_percontel;
    private $d_registro;
    private $t_descripcion;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    //---[ getters y setters ]----------------------------------
        public function __construct($db) {
            $this->conn = $db;
        }

        public function getId_persona() {
            return $this->id_persona;
        }

        public function setId_persona($id_persona) {
            $this->id_persona = $id_persona;
        }

        public function getVc_nombrecompleto() {
            return $this->vc_nombrecompleto;
        }

        public function setVc_nombrecompleto($vc_nombrecompleto) {
            $this->vc_nombrecompleto = $vc_nombrecompleto;
        }

        public function getVc_nbre1() {
            return $this->vc_nbre1;
        }

        public function setVc_nbre1($vc_nbre1) {
            $this->vc_nbre1 = $vc_nbre1;
        }

        public function getVc_nbre2() {
            return $this->vc_nbre2;
        }

        public function setVc_nbre2($vc_nbre2) {
            $this->vc_nbre2 = $vc_nbre2;
        }

        public function getVc_ape1() {
            return $this->vc_ape1;
        }

        public function setVc_ape1($vc_ape1) {
            $this->vc_ape1 = $vc_ape1;
        }

        public function getVc_ape2() {
            return $this->vc_ape2;
        }

        public function setVc_ape2($vc_ape2) {
            $this->vc_ape2 = $vc_ape2;
        }

        public function getD_fnacimiento() {
            return $this->d_fnacimiento;
        }

        public function setD_fnacimiento($d_fnacimiento) {
            $this->d_fnacimiento = $d_fnacimiento;
        }

        public function getVc_sex() {
            return $this->vc_sex;
        }

        public function setVc_sex($vc_sex) {
            $this->vc_sex = $vc_sex;
        }

        public function getVc_estadocivil() {
            return $this->vc_estadocivil;
        }

        public function setVc_estadocivil($vc_estadocivil) {
            $this->vc_estadocivil = $vc_estadocivil;
        }

        public function getVc_nacionalidad() {
            return $this->vc_nacionalidad;
        }

        public function setVc_nacionalidad($vc_nacionalidad) {
            $this->vc_nacionalidad = $vc_nacionalidad;
        }

        public function getVc_paisresidencia() {
            return $this->vc_paisresidencia;
        }

        public function setVc_paisresidencia($vc_paisresidencia) {
            $this->vc_paisresidencia = $vc_paisresidencia;
        }

        public function getVc_profesionoficio() {
            return $this->vc_profesionoficio;
        }

        public function setVc_profesionoficio($vc_profesionoficio) {
            $this->vc_profesionoficio = $vc_profesionoficio;
        }

        public function getVc_correo() {
            return $this->vc_correo;
        }

        public function setVc_correo($vc_correo) {
            $this->vc_correo = $vc_correo;
        }

        public function getVc_foto() {
            return $this->vc_foto;
        }

        public function setVc_foto($vc_foto) {
            $this->vc_foto = $vc_foto;
        }

        public function getVc_nitdui() {
            return $this->vc_nitdui;
        }

        public function setVc_nitdui($vc_nitdui) {
            $this->vc_nitdui = $vc_nitdui;
        }

        public function getVc_pasaporte() {
            return $this->vc_pasaporte;
        }

        public function setVc_pasaporte($vc_pasaporte) {
            $this->vc_pasaporte = $vc_pasaporte;
        }

        public function getT_direccion() {
            return $this->t_direccion;
        }

        public function setT_direccion($t_direccion) {
            $this->t_direccion = $t_direccion;
        }

        public function getVc_vivienda() {
            return $this->vc_vivienda;
        }

        public function setVc_vivienda($vc_vivienda) {
            $this->vc_vivienda = $vc_vivienda;
        }

        public function getI_tiemporesidir() {
            return $this->i_tiemporesidir;
        }

        public function setI_tiemporesidir($i_tiemporesidir) {
            $this->i_tiemporesidir = $i_tiemporesidir;
        }

        public function getVc_tel() {
            return $this->vc_tel;
        }

        public function setVc_tel($vc_tel) {
            $this->vc_tel = $vc_tel;
        }

        public function getVc_perconnombre() {
            return $this->vc_perconnombre;
        }

        public function setVc_perconnombre($vc_perconnombre) {
            $this->vc_perconnombre = $vc_perconnombre;
        }

        public function getVc_perconparentesco() {
            return $this->vc_perconparentesco;
        }

        public function setVc_perconparentesco($vc_perconparentesco) {
            $this->vc_perconparentesco = $vc_perconparentesco;
        }

        public function getVc_percontel() {
            return $this->vc_percontel;
        }

        public function setVc_percontel($vc_percontel) {
            $this->vc_percontel = $vc_percontel;
        }

        public function getD_registro() {
            return $this->d_registro;
        }

        public function setD_registro($d_registro) {
            $this->d_registro = $d_registro;
        }

        public function getT_descripcion() {
            return $this->t_descripcion;
        }

        public function setT_descripcion($t_descripcion) {
            $this->t_descripcion = $t_descripcion;
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

    
    
    
    public function agregar() {

        // Sanitizar datos
        $this->vc_nombrecompleto = htmlspecialchars(strip_tags($this->vc_nombrecompleto));
        $this->vc_nbre1 = htmlspecialchars(strip_tags($this->vc_nbre1));
        $this->vc_nbre2 = htmlspecialchars(strip_tags($this->vc_nbre2));
        $this->vc_ape1 = htmlspecialchars(strip_tags($this->vc_ape1));
        $this->vc_ape2 = htmlspecialchars(strip_tags($this->vc_ape2));
        $this->d_fnacimiento = htmlspecialchars(strip_tags($this->d_fnacimiento));
        $this->vc_sex = htmlspecialchars(strip_tags($this->vc_sex));
        $this->vc_estadocivil = htmlspecialchars(strip_tags($this->vc_estadocivil));
        $this->vc_nacionalidad = htmlspecialchars(strip_tags($this->vc_nacionalidad));
        $this->vc_paisresidencia = htmlspecialchars(strip_tags($this->vc_paisresidencia));
        $this->vc_profesionoficio = htmlspecialchars(strip_tags($this->vc_profesionoficio));
        $this->vc_correo = htmlspecialchars(strip_tags($this->vc_correo));
        $this->vc_nitdui = htmlspecialchars(strip_tags($this->vc_nitdui));
        $this->vc_pasaporte = htmlspecialchars(strip_tags($this->vc_pasaporte));
        $this->t_direccion = htmlspecialchars(strip_tags($this->t_direccion));
        $this->vc_vivienda = htmlspecialchars(strip_tags($this->vc_vivienda));
        $this->i_tiemporesidir = htmlspecialchars(strip_tags($this->i_tiemporesidir));
        $this->vc_tel = htmlspecialchars(strip_tags($this->vc_tel));
        $this->vc_perconnombre = htmlspecialchars(strip_tags($this->vc_perconnombre));
        $this->vc_perconparentesco = htmlspecialchars(strip_tags($this->vc_perconparentesco));
        $this->vc_percontel = htmlspecialchars(strip_tags($this->vc_percontel));
        $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
        $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
        $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));


        // Preparar la consulta SQL
        $query = "INSERT INTO personas (vc_nombrecompleto, vc_nbre1, vc_nbre2, vc_ape1, vc_ape2, d_fnacimiento, vc_sex, vc_estadocivil, vc_nacionalidad, vc_paisresidencia, vc_profesionoficio, vc_correo, vc_nitdui, vc_pasaporte, t_direccion, vc_vivienda, i_tiemporesidir, vc_tel, vc_perconnombre, vc_perconparentesco, vc_percontel, d_registro, t_descripcion, c_activo) VALUES (:vc_nombrecompleto, :vc_nbre1, :vc_nbre2, :vc_ape1, :vc_ape2, :d_fnacimiento, :vc_sex, :vc_estadocivil, :vc_nacionalidad, :vc_paisresidencia, :vc_profesionoficio, :vc_correo, :vc_nitdui, :vc_pasaporte, :t_direccion, :vc_vivienda, :i_tiemporesidir, :vc_tel, :vc_perconnombre, :vc_perconparentesco, :vc_percontel, :d_registro, :t_descripcion, :c_activo)";
        $stmt = $this->conn->prepare($query);

        // Arreglo de parámetros
        $params = [
            ':vc_nombrecompleto' => $this->vc_nombrecompleto,
            ':vc_nbre1' => $this->vc_nbre1,
            ':vc_nbre2' => $this->vc_nbre2,
            ':vc_ape1' => $this->vc_ape1,
            ':vc_ape2' => $this->vc_ape2,
            ':d_fnacimiento' => $this->d_fnacimiento,
            ':vc_sex' => $this->vc_sex,
            ':vc_estadocivil' => $this->vc_estadocivil,
            ':vc_nacionalidad' => $this->vc_nacionalidad,
            ':vc_paisresidencia' => $this->vc_paisresidencia,
            ':vc_profesionoficio' => $this->vc_profesionoficio,
            ':vc_correo' => $this->vc_correo,
            ':vc_nitdui' => $this->vc_nitdui,
            ':vc_pasaporte' => $this->vc_pasaporte,
            ':t_direccion' => $this->t_direccion,
            ':vc_vivienda' => $this->vc_vivienda,
            ':i_tiemporesidir' => $this->i_tiemporesidir,
            ':vc_tel' => $this->vc_tel,
            ':vc_perconnombre' => $this->vc_perconnombre,
            ':vc_perconparentesco' => $this->vc_perconparentesco,
            ':vc_percontel' => $this->vc_percontel,
            ':d_registro' => $this->d_registro,
            ':t_descripcion' => $this->t_descripcion,
            ':c_activo' => $this->c_activo,
        ];

        // Ejecutar la consulta con el arreglo de parámetros
        if ($stmt->execute($params)) {
            return true;
        }
        return false;
    }

    public function listar() {
        try {
            $query = "SELECT ROW_NUMBER() OVER (ORDER BY p.id_persona ) AS NF, p.id_persona AS IDPERSONA, p.vc_nombrecompleto AS NOMBRECOMPLETO, vc_nbre1 AS N1, p.vc_nbre2 AS N2, p.vc_ape1 AS AP1, p.vc_ape2 AS AP2, p.d_fnacimiento AS FN, p.vc_sex AS SEXO, p.vc_estadocivil AS ESTADOCIVIL, p.vc_nacionalidad AS NACIONALIDAD, p.vc_paisresidencia AS PAISRESIDENCIA, p.vc_profesionoficio AS PROFESIONOFICIO, p.vc_correo AS CORREO, p.vc_foto AS FOTO, p.vc_nitdui AS NITDUI, 
            p.vc_pasaporte AS PASAPORTE, p.t_direccion AS DIRECCION, p.vc_vivienda AS VIVIENDA, 
            p.i_tiemporesidir AS TIEMPORESIDIR, p.vc_tel AS TEL, p.vc_perconnombre AS PERCONNOMBRE, 
            p.vc_perconparentesco AS PERCONPARENTESCO, p.vc_percontel AS PERCONTEL, p.t_descripcion AS DESCRIPCION FROM menu.personas AS p 
            WHERE p.id_persona > 0
            "; 
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function actualizar() {

        // Sanitizar datos
        $this->id_persona = htmlspecialchars(strip_tags($this->id_persona));
        $this->vc_nombrecompleto = htmlspecialchars(strip_tags($this->vc_nombrecompleto));
        $this->vc_nbre1 = htmlspecialchars(strip_tags($this->vc_nbre1));
        $this->vc_nbre2 = htmlspecialchars(strip_tags($this->vc_nbre2));
        $this->vc_ape1 = htmlspecialchars(strip_tags($this->vc_ape1));
        $this->vc_ape2 = htmlspecialchars(strip_tags($this->vc_ape2));
        $this->d_fnacimiento = htmlspecialchars(strip_tags($this->d_fnacimiento));
        $this->vc_sex = htmlspecialchars(strip_tags($this->vc_sex));
        $this->vc_estadocivil = htmlspecialchars(strip_tags($this->vc_estadocivil));
        $this->vc_nacionalidad = htmlspecialchars(strip_tags($this->vc_nacionalidad));
        $this->vc_paisresidencia = htmlspecialchars(strip_tags($this->vc_paisresidencia));
        $this->vc_profesionoficio = htmlspecialchars(strip_tags($this->vc_profesionoficio));
        $this->vc_correo = htmlspecialchars(strip_tags($this->vc_correo));
        $this->vc_foto = htmlspecialchars(strip_tags($this->vc_foto));
        $this->vc_nitdui = htmlspecialchars(strip_tags($this->vc_nitdui));
        $this->vc_pasaporte = htmlspecialchars(strip_tags($this->vc_pasaporte));
        $this->t_direccion = htmlspecialchars(strip_tags($this->t_direccion));
        $this->vc_vivienda = htmlspecialchars(strip_tags($this->vc_vivienda));
        $this->i_tiemporesidir = htmlspecialchars(strip_tags($this->i_tiemporesidir));
        $this->vc_tel = htmlspecialchars(strip_tags($this->vc_tel));
        $this->vc_perconnombre = htmlspecialchars(strip_tags($this->vc_perconnombre));
        $this->vc_perconparentesco = htmlspecialchars(strip_tags($this->vc_perconparentesco));
        $this->vc_percontel = htmlspecialchars(strip_tags($this->vc_percontel));
        $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
        $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
        $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

        // Preparar la consulta SQL
        $query = "UPDATE personas 
        SET vc_nombrecompleto = :vc_nombrecompleto, vc_nbre1 = :vc_nbre1, vc_nbre2 = :vc_nbre2, vc_ape1 = :vc_ape1, 
        vc_ape2 = :vc_ape2, d_fnacimiento = :d_fnacimiento, vc_sex = :vc_sex, vc_estadocivil = :vc_estadocivil, 
        vc_nacionalidad = :vc_nacionalidad, vc_paisresidencia = :vc_paisresidencia, vc_profesionoficio = :vc_profesionoficio, vc_correo = :vc_correo, vc_nitdui = :vc_nitdui, vc_pasaporte = :vc_pasaporte, t_direccion = :t_direccion, 
        vc_vivienda = :vc_vivienda, i_tiemporesidir = :i_tiemporesidir, vc_tel = :vc_tel, vc_perconnombre = :vc_perconnombre, 
        vc_perconparentesco = :vc_perconparentesco, vc_percontel = :vc_percontel, t_descripcion = :t_descripcion, d_actualizacion = :d_actualizacion, c_activo = :c_activo 
        WHERE id_persona = :id_persona";
        $stmt = $this->conn->prepare($query);

        // Arreglo de parámetros
        $params = [
            ':id_persona' => $this->id_persona,
            ':vc_nombrecompleto' => $this->vc_nombrecompleto,
            ':vc_nbre1' => $this->vc_nbre1,
            ':vc_nbre2' => $this->vc_nbre2,
            ':vc_ape1' => $this->vc_ape1,
            ':vc_ape2' => $this->vc_ape2,
            ':d_fnacimiento' => $this->d_fnacimiento,
            ':vc_sex' => $this->vc_sex,
            ':vc_estadocivil' => $this->vc_estadocivil,
            ':vc_nacionalidad' => $this->vc_nacionalidad,
            ':vc_paisresidencia' => $this->vc_paisresidencia,
            ':vc_profesionoficio' => $this->vc_profesionoficio,
            ':vc_correo' => $this->vc_correo,
            ':vc_nitdui' => $this->vc_nitdui,
            ':vc_pasaporte' => $this->vc_pasaporte,
            ':t_direccion' => $this->t_direccion,
            ':vc_vivienda' => $this->vc_vivienda,
            ':i_tiemporesidir' => $this->i_tiemporesidir,
            ':vc_tel' => $this->vc_tel,
            ':vc_perconnombre' => $this->vc_perconnombre,
            ':vc_perconparentesco' => $this->vc_perconparentesco,
            ':vc_percontel' => $this->vc_percontel,
            ':t_descripcion' => $this->t_descripcion,
            ':d_actualizacion' => $this->d_actualizacion,
            ':c_activo' => $this->c_activo,
        ];

        // Ejecutar la consulta con el arreglo de parámetros
        if ($stmt->execute($params)) {
            return true;
        }
        return false;
    }

    public function listarpersonasformempleados(){
        try {
            $query = "SELECT p.id_persona AS IDPER, 
            p.vc_nombrecompleto AS NPER
            FROM personas p
            LEFT JOIN empleados e ON p.id_persona = e.id_persona
            WHERE e.id_persona IS NULL AND p.id_persona >'0'";                                                                                  
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function listarpersonasformusuarios(){
        try {
            $query = "SELECT p.id_persona AS IDPER, 
            p.vc_nombrecompleto AS NPER
            FROM personas p
            LEFT JOIN usuarios u ON p.id_persona = u.id_persona
            WHERE u.id_persona IS NULL AND p.id_persona > '0'";                                                                                  
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

}
?>