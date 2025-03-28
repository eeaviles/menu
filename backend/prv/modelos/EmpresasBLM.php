<?php
class Empresas {
    private $id_empresa;
    private $vc_codempresa;
    private $c_empreprincipal;
    private $c_proveclien;
    private $vc_tipo;
    private $vc_razonsocial;
    private $vc_nombre;
    private $vc_logo;
    private $vc_girocomercio;
    private $vc_nit;
    private $vc_nrc;
    private $c_clascontribuyente;
    private $vc_pais;
    private $vc_correo;
    private $vc_webpage;
    private $t_dirprincipal;
    private $t_dirfactura;
    private $t_dircobro;
    private $vc_codpostalpago;
    private $vc_empresatel;
    private $t_descripcion;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    //------
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

//---[ Getter and Setter ]-----------------------------------------------------
    public function getId_empresa() {
        return $this->id_empresa;
    }

    public function setId_empresa($id_empresa) {
        $this->id_empresa = $id_empresa;
    }

    public function getVc_codempresa() {
        return $this->vc_codempresa;
    }

    public function setVc_codempresa($vc_codempresa) {
        $this->vc_codempresa = $vc_codempresa;
    }

    public function getC_empreprincipal() {
        return $this->c_empreprincipal;
    }

    public function setC_empreprincipal($c_empreprincipal) {
        $this->c_empreprincipal = $c_empreprincipal;
    }

    public function getC_proveclien() {
        return $this->c_proveclien;
    }

    public function setC_proveclien($c_proveclien) {
        $this->c_proveclien = $c_proveclien;
    }

    public function getVc_tipo() {
        return $this->vc_tipo;
    }

    public function setVc_tipo($vc_tipo) {
        $this->vc_tipo = $vc_tipo;
    }

    public function getVc_razonsocial() {
        return $this->vc_razonsocial;
    }

    public function setVc_razonsocial($vc_razonsocial) {
        $this->vc_razonsocial = $vc_razonsocial;
    }

    public function getVc_nombre() {
        return $this->vc_nombre;
    }

    public function setVc_nombre($vc_nombre) {
        $this->vc_nombre = $vc_nombre;
    }

    public function getVc_logo() {
        return $this->vc_logo;
    }

    public function setVc_logo($vc_logo) {
        $this->vc_logo = $vc_logo;
    }

    public function getVc_girocomercio() {
        return $this->vc_girocomercio;
    }

    public function setVc_girocomercio($vc_girocomercio) {
        $this->vc_girocomercio = $vc_girocomercio;
    }

    public function getVc_nit() {
        return $this->vc_nit;
    }

    public function setVc_nit($vc_nit) {
        $this->vc_nit = $vc_nit;
    }

    public function getVc_nrc() {
        return $this->vc_nrc;
    }

    public function setVc_nrc($vc_nrc) {
        $this->vc_nrc = $vc_nrc;
    }

    public function getC_clascontribuyente() {
        return $this->c_clascontribuyente;
    }

    public function setC_clascontribuyente($c_clascontribuyente) {
        $this->c_clascontribuyente = $c_clascontribuyente;
    }

    public function getVc_pais() {
        return $this->vc_pais;
    }

    public function setVc_pais($vc_pais) {
        $this->vc_pais = $vc_pais;
    }

    public function getVc_correo() {
        return $this->vc_correo;
    }

    public function setVc_correo($vc_correo) {
        $this->vc_correo = $vc_correo;
    }

    public function getVc_webpage() {
        return $this->vc_webpage;
    }

    public function setVc_webpage($vc_webpage) {
        $this->vc_webpage = $vc_webpage;
    }

    public function getT_dirprincipal() {
        return $this->t_dirprincipal;
    }

    public function setT_dirprincipal($t_dirprincipal) {
        $this->t_dirprincipal = $t_dirprincipal;
    }

    public function getT_dirfactura() {
        return $this->t_dirfactura;
    }

    public function setT_dirfactura($t_dirfactura) {
        $this->t_dirfactura = $t_dirfactura;
    }

    public function getT_dircobro() {
        return $this->t_dircobro;
    }

    public function setT_dircobro($t_dircobro) {
        $this->t_dircobro = $t_dircobro;
    }

    public function getVc_codpostalpago() {
        return $this->vc_codpostalpago;
    }

    public function setVc_codpostalpago($vc_codpostalpago) {
        $this->vc_codpostalpago = $vc_codpostalpago;
    }

    public function getVc_empresatel() {
        return $this->vc_empresatel;
    }

    public function setVc_empresatel($vc_empresatel) {
        $this->vc_empresatel = $vc_empresatel;
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


    public function leer() {
        try {
            $query = "SELECT * FROM empresas";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function listarempresaxid() {       
        try {
            $query = 
                'SELECT ROW_NUMBER() OVER (ORDER BY e.id_empresa ) AS NF, e.id_empresa AS IDEMPRE, e.vc_logo AS LOGO, e.vc_nombre AS NEMPRE, e.vc_razonsocial AS RAZSOC, e.vc_nit AS NIT, e.vc_nrc AS NRC, e.vc_correo AS EMAIL, e.vc_codpostalpago AS CODPOS, e.vc_empresatel AS TELEMP, e.vc_webpage AS WEBP, e.t_dirprincipal AS UBI, e.vc_girocomercio AS GIRO, vc_pais AS PAIS, ec.vc_nombre AS CPRINC, ec.vc_dui AS CDUI, ec.vc_correo AS CEMAIL, ec.vc_telefono AS CTEL, ec.vc_puestotrabajo AS CCARGO, ec.vc_area AS CAREA,  ec.t_descripcion AS CDESCRIP, ec.id_empresacontacto AS CIDEMPRESA, e.c_proveclien AS PROVCLIEN, e.vc_tipo AS TIPOEMPRESA, e.t_descripcion AS COMEADIC, s.id_sucursal AS IDSUC, s.vc_nombresucursal AS NOMBRE, s.vc_telefono AS TEL, 
                s.vc_codsucursal AS  CODSUC, c20.id_cat020 AS IDCAT20, c20.vc_valores AS valores, c13.id_cat13 AS IDCAT13, c12.id_cat12 AS IDCAT12
                FROM menu.empresas AS e 
                JOIN menu.empresascontactos AS ec ON e.id_empresa = ec.id_empresa
                JOIN menu.sucursales AS s ON e.id_empresa = s.id_empresa       
                JOIN menu.cat020 AS c20 ON s.id_cat020 = c20.id_cat020
                JOIN menu.cat13 AS c13 ON s.id_cat13 = c13.id_cat13
                JOIN menu.cat12 AS c12 ON c13.id_cat12 = c12.id_cat12       
                WHERE e.id_empresa = :IDEMP
                AND ec.c_activo = :cati';
            $stmt = $this->conn->prepare($query);
            $params = [':IDEMP' => $this->getId_empresa(),':cati'=>'S'];
            $stmt->execute($params);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if($row){
                return $row;
            }else{
                return false;
            }//---[ Verificar si hay datos ]    
             
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            //return false;
        }
    }

    public function agregarempresa() {
        try {
            $query = "INSERT INTO menu.empresas (vc_codempresa, c_empreprincipal, c_proveclien, vc_tipo, vc_razonsocial, vc_nombre, vc_logo, vc_girocomercio, vc_nit, vc_nrc, c_clascontribuyente, vc_pais, vc_correo, vc_webpage, t_dirprincipal, t_dirfactura, t_dircobro, vc_codpostalpago, vc_empresatel, t_descripcion, d_registro,  c_activo) VALUES (:vc_codempresa, :c_empreprincipal, :c_proveclien, :vc_tipo, :vc_razonsocial, :vc_nombre, :vc_logo, :vc_girocomercio, :vc_nit, :vc_nrc, :c_clascontribuyente, :vc_pais, :vc_correo, :vc_webpage, :t_dirprincipal, :t_dirfactura, :t_dircobro, :vc_codpostalpago, :vc_empresatel, :t_descripcion, :d_registro,:c_activo)";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->vc_codempresa = htmlspecialchars(strip_tags($this->vc_codempresa));
            $this->c_empreprincipal = htmlspecialchars(strip_tags($this->c_empreprincipal));
            $this->c_proveclien = htmlspecialchars(strip_tags($this->c_proveclien));
            $this->vc_tipo = htmlspecialchars(strip_tags($this->vc_tipo));
            $this->vc_razonsocial = htmlspecialchars(strip_tags($this->vc_razonsocial));
            $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
            $this->vc_logo = htmlspecialchars(strip_tags($this->vc_logo));
            $this->vc_girocomercio = htmlspecialchars(strip_tags($this->vc_girocomercio));
            $this->vc_nit = htmlspecialchars(strip_tags($this->vc_nit));
            $this->vc_nrc = htmlspecialchars(strip_tags($this->vc_nrc));
            $this->c_clascontribuyente = htmlspecialchars(strip_tags($this->c_clascontribuyente));
            $this->vc_pais = htmlspecialchars(strip_tags($this->vc_pais));
            $this->vc_correo = htmlspecialchars(strip_tags($this->vc_correo));
            $this->vc_webpage = htmlspecialchars(strip_tags($this->vc_webpage));
            $this->t_dirprincipal = htmlspecialchars(strip_tags($this->t_dirprincipal));
            $this->t_dirfactura = htmlspecialchars(strip_tags($this->t_dirfactura));
            $this->t_dircobro = htmlspecialchars(strip_tags($this->t_dircobro));
            $this->vc_codpostalpago = htmlspecialchars(strip_tags($this->vc_codpostalpago));
            $this->vc_empresatel = htmlspecialchars(strip_tags($this->vc_empresatel));
            $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
            $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
            $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

            // Arreglo de parámetros
            $params = [
                ':vc_codempresa' => $this->vc_codempresa,
                ':c_empreprincipal' => $this->c_empreprincipal,
                ':c_proveclien' => $this->c_proveclien,
                ':vc_tipo' => $this->vc_tipo,
                ':vc_razonsocial' => $this->vc_razonsocial,
                ':vc_nombre' => $this->vc_nombre,
                ':vc_logo' => $this->vc_logo,
                ':vc_girocomercio' => $this->vc_girocomercio,
                ':vc_nit' => $this->vc_nit,
                ':vc_nrc' => $this->vc_nrc,
                ':c_clascontribuyente' => $this->c_clascontribuyente,
                ':vc_pais' => $this->vc_pais,
                ':vc_correo' => $this->vc_correo,
                ':vc_webpage' => $this->vc_webpage,
                ':t_dirprincipal' => $this->t_dirprincipal,
                ':t_dirfactura' => $this->t_dirfactura,
                ':t_dircobro' => $this->t_dircobro,
                ':vc_codpostalpago' => $this->vc_codpostalpago,
                ':vc_empresatel' => $this->vc_empresatel,
                ':t_descripcion' => $this->t_descripcion,
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


    public function actualizarempresa() {

        try {
            $query = "UPDATE menu.empresas SET vc_tipo = :vc_tipo , vc_razonsocial = :vc_razonsocial , vc_nombre = :vc_nombre, 
            vc_girocomercio = :vc_girocomercio , vc_nit = :vc_nit , vc_nrc = :vc_nrc, c_clascontribuyente = :c_clascontribuyente , 
            vc_pais = :vc_pais , vc_correo = :vc_correo , vc_webpage = :vc_webpage , t_dirprincipal = :t_dirprincipal , 
            t_dirfactura = :t_dirfactura, t_dircobro = :t_dircobro, vc_codpostalpago = :vc_codpostalpago , vc_empresatel = :vc_empresatel, t_descripcion = :t_descripcion, d_actualizacion = :d_actualizacion
            WHERE id_empresa = :IDEMPRE";
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
                $this->vc_tipo = htmlspecialchars(strip_tags($this->vc_tipo));
                $this->vc_razonsocial = htmlspecialchars(strip_tags($this->vc_razonsocial));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
                $this->vc_logo = htmlspecialchars(strip_tags($this->vc_logo));
                $this->vc_girocomercio = htmlspecialchars(strip_tags($this->vc_girocomercio));
                $this->vc_nit = htmlspecialchars(strip_tags($this->vc_nit));
                $this->vc_nrc = htmlspecialchars(strip_tags($this->vc_nrc));
                $this->c_clascontribuyente = htmlspecialchars(strip_tags($this->c_clascontribuyente));
                $this->vc_pais = htmlspecialchars(strip_tags($this->vc_pais));
                $this->vc_correo = htmlspecialchars(strip_tags($this->vc_correo));
                $this->vc_webpage = htmlspecialchars(strip_tags($this->vc_webpage));
                $this->t_dirprincipal = htmlspecialchars(strip_tags($this->t_dirprincipal));
                $this->t_dirfactura = htmlspecialchars(strip_tags($this->t_dirfactura));
                $this->t_dircobro = htmlspecialchars(strip_tags($this->t_dircobro));
                $this->vc_codpostalpago = htmlspecialchars(strip_tags($this->vc_codpostalpago));
                $this->vc_empresatel = htmlspecialchars(strip_tags($this->vc_empresatel));
                $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->id_empresa = htmlspecialchars(strip_tags($this->id_empresa));

            // Arreglo de parámetros
            $params = [
                ':IDEMPRE' => $this->id_empresa,
                ':vc_tipo' => $this->vc_tipo,
                ':vc_razonsocial' => $this->vc_razonsocial,
                ':vc_nombre' => $this->vc_nombre,
                ':vc_girocomercio' => $this->vc_girocomercio,
                ':vc_nit' => $this->vc_nit,
                ':vc_nrc' => $this->vc_nrc,
                ':c_clascontribuyente' => $this->c_clascontribuyente,
                ':vc_pais' => $this->vc_pais,
                ':vc_correo' => $this->vc_correo,
                ':vc_webpage' => $this->vc_webpage,
                ':t_dirprincipal' => $this->t_dirprincipal,
                ':t_dirfactura' => $this->t_dirprincipal,
                ':t_dircobro' => $this->t_dirprincipal,
                ':vc_codpostalpago' => $this->vc_codpostalpago,
                ':vc_empresatel' => $this->vc_empresatel,
                ':t_descripcion' => $this->t_descripcion,
                ':d_actualizacion' => $this->d_actualizacion,
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
            $query = "DELETE FROM empresas WHERE id = :id";
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