<?php

class OrdenesController {
    private $objOrdenes;
    private $DetalleOrdenesController;

    public function __construct($db) {        
        $this->objOrdenes = new Ordenes($db);  
        $this->DetalleOrdenesController = new DetalleOrdenesController($db);        
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
            case "LIXF"; //LISTAR POR FECHAS
                return $this->lixf($data);
            break;

            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    /*----[ SECCION DE FUNCIONES PRIVADAS AQUÍ ]-----*/

    //----[ ACTIVAS PROYECTO MENU ]-------------------

    private function ag($data) {  // Implementación de la función AG
        $MjeDetalleOrdenesController='';
        //---[ NO OPERATIVAS ]
            //$this->objOrdenes->setIdorden(); SE GENERA AUTOMATICA AL REGISTRAR
            //$this->objOrdenes->setDactualizacion(); PRA EL PROCESO DE ACTUALIZACIÓN

        //---[ OPERATIVAS ]
            $fechaActual = new DateTime("now", new DateTimeZone("America/El_Salvador"));
            $fechaGMT6 = $fechaActual->format("Y-m-d H:i:s"); 
            $this->objOrdenes->setId_usuario($data['IDUSER']);
            $this->objOrdenes->setVc_codigo($data['CODOR']);            
            $this->objOrdenes->setDc_totalpreciofinal($data['totalPrecioFinal']);
            $this->objOrdenes->setDc_totaldescuento($data['totalDescuento']);
            $this->objOrdenes->setDc_totalapagar($data['totalAPagar']);
            $this->objOrdenes->setC_estado($data['ESTD']);
            $this->objOrdenes->setC_metodopago($data['METPGO']);
            $this->objOrdenes->setDt_creacion($fechaGMT6);//CURRENT_TIMESTAMP
            $this->objOrdenes->setD_registro(date('Y-m-d'));            
            $this->objOrdenes->setC_activo('S');
            $LastidOrdenes = $this->objOrdenes->agregar(); 

            if($LastidOrdenes){
                $ArrayTag = array('accion'=> 'AG','PRODSEL'=>$data['PRODSEL'], 'IDORD'=>$LastidOrdenes );
                $MjeDetalleOrdenesController = $this->DetalleOrdenesController->accion($ArrayTag);
            }
            
            if($LastidOrdenes && $MjeDetalleOrdenesController){
                $temarray=['E'=>'LOS DATOS SE ALMACENARON'];
                return $temarray;
            }else{
                $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE ALMACENARON'];
                return $temarray;
            } 

    }

    private function li($data) {   
        $restmep= $this->objOrdenes->listar();
        return $restmep;
    }

    private function lixf($data) {   
        $restmep= $this->objOrdenes->listarporfechas($data['FI'],$data['FF']);
        return $restmep;
    }

}