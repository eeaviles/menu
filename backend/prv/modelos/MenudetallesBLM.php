 <?php
class Menudetalles {
    private $id_menudetalle;
    private $id_menu;
    private $id_producto;
    private $i_preciogrande;
    private $i_preciopequeno;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_menudetalle() {
            return $this->id_menudetalle;
        }

        public function setId_menudetalle($id_menudetalle) {
            $this->id_menudetalle = $id_menudetalle;
        }

        public function getId_menu() {
            return $this->id_menu;
        }

        public function setId_menu($id_menu) {
            $this->id_menu = $id_menu;
        }

        public function getId_producto() {
            return $this->id_producto;
        }

        public function setId_producto($id_producto) {
            $this->id_producto = $id_producto;
        }

        public function getI_preciogrande() {
            return $this->i_preciogrande;
        }

        public function setI_preciogrande($i_preciogrande) {
            $this->i_preciogrande = $i_preciogrande;
        }

        public function getI_preciopequeno() {
            return $this->i_preciopequeno;
        }

        public function setI_preciopequeno($i_preciopequeno) {
            $this->i_preciopequeno = $i_preciopequeno;
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

    //-----[ METODOS ACTIVOS PROYECTO MENU]------------------------------------------------
        public function agregar() {
            try {
                $query = "INSERT INTO menudetalles (id_menu, id_producto, i_preciogrande, i_preciopequeno, d_registro, c_activo) VALUES (:id_menu, :id_producto, :i_preciogrande, :i_preciopequeno, :d_registro, :c_activo)";
    
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos 
                $this->id_menu = htmlspecialchars(strip_tags($this->id_menu));
                $this->id_producto = htmlspecialchars(strip_tags($this->id_producto));
                $this->i_preciogrande = htmlspecialchars(strip_tags($this->i_preciogrande));
                $this->i_preciopequeno = htmlspecialchars(strip_tags($this->i_preciopequeno));
                $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));

                // Arreglo de parámetros
                $params = [
                    ':id_menu' => $this->id_menu,
                    ':id_producto' => $this->id_producto,
                    ':i_preciogrande' => $this->i_preciogrande,
                    ':i_preciopequeno' => $this->i_preciopequeno,
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

        public function listarxidmenu() {
            try {
                $query = "SELECT md.id_menudetalle as IDMMENUDET,md.id_menu AS IDMENU, md.id_producto AS IDPROD, md.i_preciogrande AS PRECIOG, md.i_preciopequeno AS PRECIOP,
                p.vc_nombre AS PRODNOM, p.vc_imagen AS PRODIMG
                FROM menu.menudetalles AS md
                JOIN menu.productos AS p ON md.id_producto = p.id_producto
                WHERE md.id_menu = :id
                AND md.c_activo = 'S'
                ";
                
                // Sanitizar datos
                $this->id_menu = htmlspecialchars(strip_tags($this->id_menu));
                
                // Arreglo de parámetros
                $params = [':id'=> $this->getId_menu()];
                
                // Ejecutar la consulta con el arreglo de parámetros
                $stmt = $this->conn->prepare($query);
                $stmt->execute($params);
                
                // Verificar si se obtuvieron resultados
                if ($stmt->rowCount() > 0) {
                    return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retornar los resultados
                } else {
                    return false; // Retornar false si no se encontraron resultados
                }                
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }

        public function actualizar() {               
            try {
                $query = "UPDATE menudetalles SET id_menu=:id_menu, id_producto=:id_producto, i_preciogrande=:i_preciogrande, i_preciopequeno=:i_preciopequeno, 
                d_actualizacion=:d_actualizacion, c_activo=:c_activo 
                WHERE id_menudetalle=:id_menudetalle";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_menudetalle = htmlspecialchars(strip_tags($this->id_menudetalle));
                $this->id_menu = htmlspecialchars(strip_tags($this->id_menu));
                $this->id_producto = htmlspecialchars(strip_tags($this->id_producto));
                $this->i_preciogrande = htmlspecialchars(strip_tags($this->i_preciogrande));
                $this->i_preciopequeno = htmlspecialchars(strip_tags($this->i_preciopequeno));
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));          

                // Arreglo de parámetros
                $params = [
                    ':id_menudetalle' => $this->id_menudetalle,
                    ':id_menu' => $this->id_menu,
                    ':id_producto' => $this->id_producto,
                    ':i_preciogrande' => $this->i_preciogrande,
                    ':i_preciopequeno' => $this->i_preciopequeno,
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
        
        public function eliminar() {
            try {            
                $query = "UPDATE menudetalles SET d_actualizacion=:d_actualizacion, c_activo=:c_activo 
                WHERE id_menudetalle=:id_menudetalle";
                $stmt = $this->conn->prepare($query);
                $params = [
                    ':id_menudetalle' => $this->id_menudetalle,
                    ':d_actualizacion' => $this->d_actualizacion,
                    ':c_activo' => $this->c_activo,
                ];
                if ($stmt->execute($params)) {
                    return true;
                }
                return false;
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
                return false;
            }
        }

    //-------------------------------------------------------------------------------------
    //---[METODOS NO ACTIVOS PROYECTO MENU]------------------------------------------------
        public function leerUno($id) {
            try {
                $query = "SELECT * FROM menudetalles WHERE id = :id LIMIT 0,1";
                $stmt = $this->conn->prepare($query);
                $params = [':id' => $id];
                $stmt->execute($params);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $this->id_menudetalle = $row['id_menudetalle'];
                    $this->id_menu = $row['id_menu'];
                    $this->id_producto = $row['id_producto'];
                    $this->i_preciogrande = $row['i_preciogrande'];
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


}
?>