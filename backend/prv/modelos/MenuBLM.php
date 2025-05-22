<?php
class Menu {
    private $id_menu;
    private $vc_nombre;
    private $d_programada;
    private $vc_comentario;
    private $d_registro;
    private $d_actualizacion;
    private $c_activo;
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    //---[ Getter and Setter ]-----------------------------------------------------
        public function getId_menu() {
            return $this->id_menu;
        }

        public function setId_menu($id_menu) {
            $this->id_menu = $id_menu;
        }

        public function getVc_nombre() {
            return $this->vc_nombre;
        }

        public function setVc_nombre($vc_nombre) {
            $this->vc_nombre = $vc_nombre;
        }

        public function getD_programada() {
            return $this->d_programada;
        }

        public function setD_programada($d_programada) {
            $this->d_programada = $d_programada;
        }

        public function getVc_comentario() {
            return $this->vc_comentario;
        }

        public function setVc_comentario($vc_comentario) {
            $this->vc_comentario = $vc_comentario;
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

    //---[ UTILIZADAS EN PROY MENU ]---

        public function agregar() {
            try {
                $query = "INSERT INTO menu.menu (vc_nombre, d_programada, vc_comentario, d_registro, c_activo) VALUES (:vc_nombre, :d_programada, :vc_comentario, :d_registro, :c_activo)";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
                $this->d_programada = htmlspecialchars(strip_tags($this->d_programada));
                $this->d_registro = htmlspecialchars(strip_tags($this->d_registro));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));
                $this->vc_comentario = htmlspecialchars(strip_tags($this->vc_comentario));

                // Arreglo de parámetros
                $params = [
                    ':vc_nombre' => $this->vc_nombre,
                    ':d_programada' => $this->d_programada,
                    ':d_registro' => $this->d_registro,
                    ':c_activo' => $this->c_activo,
                    ':vc_comentario' => $this->vc_comentario
                ];

                // Ejecutar la consulta con el arreglo de parámetros
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

        public function actualizar() {
            try {
                $query = "UPDATE menu SET vc_nombre = :vc_nombre , d_programada = :d_programada , vc_comentario = :vc_comentario , d_actualizacion = :d_actualizacion , c_activo = :c_activo
                WHERE id_menu = :id_menu";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_menu = htmlspecialchars(strip_tags($this->id_menu));
                $this->vc_nombre = htmlspecialchars(strip_tags($this->vc_nombre));
                $this->d_programada = htmlspecialchars(strip_tags($this->d_programada));
                $this->vc_comentario = htmlspecialchars(strip_tags($this->vc_comentario));    
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));    

                // Arreglo de parámetros
                $params = [
                    ':id_menu' => $this->id_menu,
                    ':vc_nombre' => $this->vc_nombre,
                    ':d_programada' => $this->d_programada,
                    ':vc_comentario' => $this->vc_comentario,
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

        public function listarporfechas($FI,$FF) {
            try {
                $query = "SELECT ROW_NUMBER() OVER (ORDER BY m.id_menu ) AS NF, m.id_menu AS IDMENU, m.vc_nombre AS NMENU, m.d_programada AS FPROGR, m.c_activo AS ACTI, m.vc_comentario AS COMENT
                FROM menu.menu AS m
                WHERE DATE(m.d_programada) BETWEEN :FI AND :FF
                ";          
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

        public function actualizarestado(){
            try {
                $query = "UPDATE menu SET d_actualizacion = :d_actualizacion, c_activo = :c_activo
                WHERE id_menu = :id_menu";
                $stmt = $this->conn->prepare($query);

                // Sanitizar datos
                $this->id_menu = htmlspecialchars(strip_tags($this->id_menu));
                $this->d_actualizacion = htmlspecialchars(strip_tags($this->d_actualizacion));
                $this->c_activo = htmlspecialchars(strip_tags($this->c_activo));    

                // Arreglo de parámetros
                $params = [
                    ':id_menu' => $this->id_menu,
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








    //---[ NO UTILIZADAS EN PROY MENU ]---
        public function leer() {
            try {
                $query = "SELECT * FROM menu";
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
                $query = "SELECT * FROM menu WHERE id = :id LIMIT 0,1";
                $stmt = $this->conn->prepare($query);
                $params = [':id' => $id];
                $stmt->execute($params);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $this->id_menu = $row['id_menu'];
                    $this->vc_nombre = $row['vc_nombre'];
                    $this->d_programada = $row['d_programada'];
                    $this->vc_comentario = $row['vc_comentario'];
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
                $query = "DELETE FROM menu WHERE id = :id";
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