<?php

class ProductosController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Productos($db);         
    }

    public function accion($data) {        
        switch ($data['accion']) {  
            
            case "LIXIDCAT";//---[LISTAR TODOS POR ID CATEGORIA]---
                return $this->lixidcat($data);
            break;
            
            case "LXIDF";/*litar por id foraneeo*/
                return $this->lixdf($data);
            break;  

            case "LI";/** Todos los productos */
                return $this->li($data);   
            break; 

            case "AG";
                return $this->ag($data);
            break;      

            case "AC";
                return $this->ac($data);          
            break;    
               
            case "LXID";
                return $this->lixd($data);     
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //-----[ HABILITADAS ]--------
        private function lixidcat($data) {
            $this->obj->setId_categoria($data['ID']);
            $temp= $this->obj->listarxidcategoria();   
            return $temp;   
        }

        private function lixdf($data) {
            $this->obj->setId_categoria($data['ID']);
            $temp=$this->obj->listarxidforaneo($data['TIPOCAT']);        
            return $temp;
        }    

        private function li($data){   
            $resultado = $this->obj->listar();
            if ($resultado) {
                return $resultado;
            } else {
                return array("error" => "No se encontraron resultados.");
            }
        }

        private function ac($d) {     

            $this->obj->setVc_imagen($d["PRODIMG"]);
          
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                // Procesar el archivo
                $fileTmpPath = $_FILES['image']['tmp_name']; // Ruta temporal del archivo        
                $fileName = $_FILES['image']['name']; // Nombre original del archivo
                $fileSize = $_FILES['image']['size']; // Tamaño del archivo
                $fileType = $_FILES['image']['type']; // Tipo MIME del archivo

                $this->obj->setVc_imagen($fileName);
            
                // Construir la ruta de destino
                $destPath = rtrim($d['dir_images'], '/') . '/' . $fileName;
            
                if (move_uploaded_file($fileTmpPath, $destPath)) {       
                    $archivosubido =  "IMAGEN GUARDADA CORRECTAMENTE.";         

                } else {
                    $archivosubido = "IMAGEN NO SE GUARDÓ.";
                }
            } else {
                $archivosubido = "NO SE CARGÓ NINGÚN ARCHIVO DE IMAGEN.";
            }            

            $this->obj->setId_producto($d['IDPROD']);
            $this->obj->setId_categoria($d['IDCAT']);
            $this->obj->setVc_nombre($d['PRODNOM']);
            $this->obj->setI_precioG($d['PRECIOG']);  
            $this->obj->setI_precioP($d['PRECIOP']);  
            $this->obj->setT_descripcion($d['DESCRIP']);
            $this->obj->setD_actualizacion(date('Y-m-d'));  
            $this->obj->setC_activo('S');                      
            $resptem = $this->obj->actualizar();   
    
            if($resptem ){
                $temarray=['E'=>"LOS DATOS SE ACTUALIZARON Y $archivosubido"];
                return $temarray;
            }else{
                $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ACTUALIZARON'];
                return $temarray;
            }     
        }   

    //-----[ NO HABILITADAS ]-----

        private function ag($d) {

            $this->obj->setVc_imagen("no_img.png");

            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                // Procesar el archivo
                $fileTmpPath = $_FILES['image']['tmp_name']; // Ruta temporal del archivo
                $fileName = $_FILES['image']['name']; // Nombre original del archivo
                $fileSize = $_FILES['image']['size']; // Tamaño del archivo
                $fileType = $_FILES['image']['type']; // Tipo MIME del archivo

                $this->obj->setVc_imagen($fileName);
            
                // Guardar el archivo en un directorio
                $destPath = rtrim($d['dir_images'], '/') . '/' . $fileName;
            
                if (move_uploaded_file($fileTmpPath, $destPath)) {       
                    $archivosubido =  "IMAGEN GUARDADA CORRECTAMENTE.";         

                } else {
                    $archivosubido = "IMAGEN NO SE GUARDÓ.";
                }
            } else {
                $archivosubido = "NO SE CARGÓ NINGÚN ARCHIVO DE IMAGEN.";
            }    

            $imagen = "noinage.png";
            $this->obj->setId_categoria($d['IDCAT']);
            $this->obj->setVc_nombre($d['PRODNOM']);
            $this->obj->setI_precioG($d['PRECIOG']);  
            $this->obj->setI_precioP($d['PRECIOP']);
            $this->obj->setT_descripcion($d['DESCRIP']);
            $this->obj->setD_registro(date('Y-m-d'));  
            $this->obj->setC_activo('S');                      
            $resptem = $this->obj->agregar();   
    
            if($resptem ){
                $temarray=['E'=>"LOS DATOS SE ACTUALIZARON Y $archivosubido"];
                return $temarray;
            }else{
                $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ACTUALIZARON'];
                return $temarray;
            }  
        }

        //-----[ NO HABILITADAS ]-----
        private function lixd($data) {
            // Implementación de la función LXID
            return "Función LXID ejecutada";
        }

        private function lifs($data) {
            // Implementación de la función LIFS
            echo "Función LIFS ejecutada";
        }
}