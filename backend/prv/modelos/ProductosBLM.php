<?php
class Productos {
    private $id_producto;
    private $id_categoria;
    private $vc_nombre;
    private $i_precioG;
    private $i_precioP;
    private $vc_imagen;
    private $t_descripcion;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_producto() {
            return $this->id_producto;
        }

        public function setId_producto($id_producto) {
            $this->id_producto = $id_producto;
        }

        public function getId_categoria() {
            return $this->id_categoria;
        }

        public function setId_categoria($id_categoria) {
            $this->id_categoria = $id_categoria;
        }

        public function getVc_nombre() {
            return $this->vc_nombre;
        }

        public function setVc_nombre($vc_nombre) {
            $this->vc_nombre = $vc_nombre;
        }

        public function getI_precioG() {
            return $this->i_precioG;
        }

        public function setI_precioG($i_precioG) {
            $this->i_precioG = $i_precioG;
        }

        public function getI_precioP() {
            return $this->i_precioP;
        }

        public function setI_precioP($i_precioP) {
            $this->i_precioP = $i_precioP;
        }

        public function getVc_imagen() {
            return $this->vc_imagen;
        }

        public function setVc_imagen($vc_imagen) {
            $this->vc_imagen = $vc_imagen;
        }

        public function getT_descripcion(){
            return $this->$t_descripcion;
        }    

        public function setT_descripcion($t_descripcion){
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
    
    //-----[ HABILITADAS ]------------------------------------------------
        
        public function listarxidcategoria() {
            try {
                $query = "SELECT p.id_producto AS IDPROD, p.id_categoria AS IDCAT, p.vc_nombre AS PRODNOM, p.vc_imagen AS   PRODIMG, c.vc_nombre AS NOMBRECAT, '' AS MENUNOMBRE, '' AS FPROG, p.i_precioG AS PRECIOG, p.i_precioP AS PRECIOP
                FROM menu.productos AS p 
                JOIN menu.categorias AS c ON p.id_categoria = c.id_categoria
                WHERE p.id_categoria = :id 
                AND p.c_activo = 'S' 
                AND c.c_activo='S'
                ORDER BY p.vc_nombre
                ";
                $stmt = $this->conn->prepare($query);
                $params = [':id' => $this->getId_categoria()];
                $stmt->execute($params);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }  
        
        public function listarxidforaneo($TIPOCAT){
            try {
                if($TIPOCAT==='P'){
                    $query = "SELECT 
                        p.id_producto AS IDPROD, 
                        p.id_categoria AS IDCAT, 
                        p.vc_nombre AS PRODNOM, 
                        p.i_precioG AS PRECIOG, 
                        p.i_precioP AS PRECIOP, 
                        p.vc_imagen AS PRODIMG, 
                        c.vc_nombre AS NOMBRECAT, 
                        m.vc_nombre AS MENUNOMBRE, 
                        m.d_programada AS FPROG, 
                        md.i_preciogrande AS PRECIOG, 
                        md.i_preciopequeno AS PRECIOP
                        FROM menu.menudetalles AS md
                        JOIN menu.productos AS p ON md.id_producto = p.id_producto
                        JOIN menu.categorias AS c ON p.id_categoria = c.id_categoria
                        LEFT JOIN menu.menu AS m ON md.id_menu = m.id_menu
                        WHERE 
                            p.id_categoria = :id
                            AND p.c_activo = 'S' 
                            AND c.c_activo = 'S'
                            AND md.c_activo = 'S'
                            AND m.c_activo = 'S'
                            AND DATE(CONVERT_TZ(NOW(), '+00:00', '-06:00')) = m.d_programada 
                        ORDER BY  p.vc_nombre 
                        ASC";
                }else{
                    $query = "SELECT p.id_producto AS IDPROD, p.id_categoria AS IDCAT, p.vc_nombre AS PRODNOM, p.vc_imagen AS PRODIMG, c.vc_nombre AS NOMBRECAT, '' AS MENUNOMBRE, '' AS FPROG, p.i_precioG AS PRECIOG, p.i_precioP AS PRECIOP
                    FROM menu.productos AS p 
                    JOIN menu.categorias AS c ON p.id_categoria = c.id_categoria
                    WHERE p.id_categoria = :id 
                    AND p.c_activo = 'S' 
                    AND c.c_activo='S'";
                }
                $stmt = $this->conn->prepare($query);
                $params = [':id' => $this->getId_categoria()];
                $stmt->execute($params);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }//utilizada por ProductosXCategoria

        public function listar(){
            try {
                $query = "SELECT ROW_NUMBER() OVER (ORDER BY p.id_producto ) AS NF, p.id_producto AS IDPROD, p.id_categoria AS IDCAT, p.vc_nombre AS PRODNOM, p.vc_imagen AS   PRODIMG, c.vc_nombre AS NOMBRECAT, '' AS MENUNOMBRE, '' AS FPROG, p.i_precioG AS PRECIOG, p.i_precioP AS PRECIOP,  p.t_descripcion AS DESCRIP
                FROM menu.productos AS p 
                JOIN menu.categorias AS c ON p.id_categoria = c.id_categoria
                WHERE p.c_activo = 'S' 
                AND c.c_activo='S'
                ORDER BY c.id_categoria
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
            try {
                $query = "UPDATE menu.productos SET id_categoria = :id_categoria , vc_nombre = :vc_nombre , i_precioG = :i_precioG, i_precioP = :i_precioP, vc_imagen = :vc_imagen, t_descripcion = :t_descripcion,  d_actualizacion = :d_actualizacion, c_activo = :c_activo
                WHERE id_producto = :id_producto";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_producto = htmlspecialchars(strip_tags($this->id_producto));
                $this->id_categoria = htmlspecialchars(strip_tags($this->id_categoria));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
                $this->i_precioG = htmlspecialchars(strip_tags($this->i_precioG));
                $this->i_precioP = htmlspecialchars(strip_tags($this->i_precioP));
                $this->vc_imagen = htmlspecialchars(strip_tags($this->vc_imagen));
                $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));               

                // Arreglo de parámetros
                $params = [
                    ':id_producto' => $this->id_producto,
                    ':id_categoria' => $this->id_categoria,
                    ':vc_nombre' => $this->vc_nombre,
                    ':i_precioG' => $this->i_precioG,
                    ':i_precioP' => $this->i_precioP,
                    ':vc_imagen' => $this->vc_imagen,
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
                $query = "INSERT INTO productos ( id_categoria, vc_nombre, i_precioG, i_precioP, vc_imagen,
                t_descripcion, d_registro, c_activo) VALUES (:id_categoria, :vc_nombre, :i_precioG, :i_precioP, 
                :vc_imagen, :t_descripcion, :d_registro, :c_activo)";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos      
                $this->id_categoria = htmlspecialchars(strip_tags($this->id_categoria));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
                $this->i_precioG = htmlspecialchars(strip_tags($this->i_precioG));
                $this->i_precioP = htmlspecialchars(strip_tags($this->i_precioP));
                $this->vc_imagen = htmlspecialchars(strip_tags($this->vc_imagen));
                $this->t_descripcion = htmlspecialchars(strip_tags($this->t_descripcion));
                $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

                // Arreglo de parámetros
                $params = [
                    ':id_categoria' => $this->id_categoria,
                    ':vc_nombre' => $this->vc_nombre,
                    ':i_precioG' => $this->i_precioG,
                    ':i_precioP' => $this->i_precioP,
                    ':vc_imagen' => $this->vc_imagen,
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


    //-----[ NO HABILITADAS ]------------------------------------------------
        public function leerUno($id) {
            try {
                $query = "SELECT * FROM productos WHERE id = :id LIMIT 0,1";
                $stmt = $this->conn->prepare($query);
                $params = [':id' => $id];
                $stmt->execute($params);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $this->id_producto = $row['id_producto'];
                    $this->id_categoria = $row['id_categoria'];
                    $this->vc_nombre = $row['vc_nombre'];
                    $this->i_precio = $row['i_precio'];
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
                $query = "DELETE FROM productos WHERE id = :id";
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

