<?php

class DetalleOrdenesController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new DetalleOrdenes($db);         
    }

    public function accion($data) {        
        switch ($data['accion']) {   
            case "AG";
                return $this->ag($data);
            break;
            case "AC";
                return $this->ac($data);
            break;
            case "LI";
                return $this->li($data);
            break;
            case "LXID";
                return $this->lixd($data);
            break;
            case "LIFS";
                return $this->lifs($data);
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //----[ ACTIVADAS EN PROYECTO MENU ]-------------------

        private function ag($data) {
                $tempresp='';
                //---[ NO OPERATIVAS ]
                    //$this->obj->setId_detalleorden($data['']);
                    //$this->obj->setD_actualizacion();

                    //---[ SI OPERATIVAS ]   
                    foreach ($data['PRODSEL'] as $producto) {
                        // VALORES FIJOS
                        $this->obj->setId_orden($data['IDORD']);
                        $this->obj->setD_registro(date('Y-m-d'));            
                        $this->obj->setC_activo('S');
                        // Asignar valores del producto al objeto
                        $this->obj->setId_producto($producto['IDPROD']);
                        $this->obj->setDc_preciounidad($producto['PRECIOG']);
                        $this->obj->setI_cantidad($producto['cantidad']);
                        $this->obj->setDc_preciofinal($producto['PRECIOG'] * $producto['cantidad']);
                        $this->obj->setDc_descuento($producto['descuento']);
                        $this->obj->setDc_totalapagar(($producto['PRECIOG'] * $producto['cantidad']) - $producto['descuento']);                
                        $tempresp = $this->obj->agregar();
                    }
                    if($tempresp ){
                        return true;
                    }else{
                        return false;
                    }
        }

        private function li($data) {
            $this->obj->setId_orden($data['ID']);
            $tempresp = $this->obj->listar();
            return $tempresp;
        }
    

//-----------------------------------------------------------------------------------
    private function ac($data) {
        // Implementación de la función AC
        echo "Función AC ejecutada";
    }


    private function lixd($data) {
        // Implementación de la función LXID
        echo "Función LXID ejecutada";
    }

    private function lifs($data) {
        // Implementación de la función LIFS
        echo "Función LIFS ejecutada";
    }
}