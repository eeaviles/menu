<?php

class MenuDetallesController {
    private $obj;

    public function __construct($db) {        
        $this->obj = new Menudetalles($db);         
    }

    public function accion($data) {        
        switch ($data['accion']) {   
            case "AG";
                return $this->ag($data);
            break;
            case "AC";
                return $this->ac($data);
            break;
            case "OPER";
                return $this->oper($data);
            break;
            case "LIXIDMENU";//--[LISTAR POR IDMENU MAS DETALLES]
                return $this->lisxidmenu($data);
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
    //-----[ OPERATIVAS ]--------
    private function ag($data) {
 
        //---[ NO UTILIZADAS ] 
        //$this->obj->setId_menudetalle();
        //$this->obj->setD_actualizacion();

        //---[ UTILIZADAS]
        $this->obj->setId_menu($data['IDMENU']);

        //---[ ES UN SOLO REGSITRO ]-----------------------------------------------------------------------------

        if (isset($data['PRODSEL']['IDPROD'])) {
            // Procesar un único registro
            $registro = $data['PRODSEL'];
    
            // Validar que las claves necesarias existan
            if (!isset($registro['IDPROD'], $registro['PRECIOG'], $registro['PRECIOP'])) {
                echo "Error: Faltan datos en el registro.";
                return false;
            }
    
            // Procesar el registro
            $this->obj->setD_registro(date('Y-m-d'));
            $this->obj->setC_activo('S');
            $this->obj->setId_producto($registro['IDPROD']);
            $this->obj->setI_preciogrande($registro['PRECIOG']);
            $this->obj->setI_preciopequeno($registro['PRECIOP']);
            $tempresp = $this->obj->agregar();    
            return $tempresp;
        }

        //---[ SON VARIOS REGISTROS ]---------------------------------------------------------------------------

        foreach ($data['PRODSEL'] as $registro) {

            // Validar que $registro sea un array
            if (!is_array($registro)) {
                echo "Error: El registro no es un array válido.";
                continue; // Saltar al siguiente registro
            }

            // Validar que las claves necesarias existan
            if (!isset($registro['IDPROD'], $registro['PRECIOG'], $registro['PRECIOP'])) {
                echo "Error: Faltan datos en el registro.";
                continue; // Saltar al siguiente registro
            }

            //---[AUTOMÁTICAS POR SISTEMA ]---
            $this->obj->setD_registro(date('Y-m-d'));        
            $this->obj->setC_activo('S');
            //---[ EXTERNAS ]---                
            $this->obj->setId_producto($registro['IDPROD']);     
            $this->obj->setI_preciogrande($registro['PRECIOG']);
            $this->obj->setI_preciopequeno($registro['PRECIOP']);
            $tempresp = $this->obj->agregar();            
        }

        return $tempresp;
    }

    private function lisxidmenu($data) {
        //---[ LISTAR DETALLES POR IDMENU ]---
        $this->obj->setId_menu($data['ID']);
        $result = $this->obj->listarxidmenu(); // Llamar al método para listar por ID_MENU            
        if ($result) {
            return $result; // Retornar el resultado de la consulta
        } else {
            return false; // Retornar false si no se encontraron resultados
        }
    }

    private function ac($data) {
        // Validar que $data['PRODSEL'] sea un array
        if (!is_array($data['PRODSEL'])) {
            echo "Error: 'PRODSEL' no es un array válido.";
            return false;
        }    
        $this->obj->setId_menu($data['IDMENU']);
    
        //---[ ES UN SOLO REGISTROS ]-----------------------------------------------------------------------------
        if (isset($data['PRODSEL']['IDPROD'])) {
            // Procesar un único registro
            $registro = $data['PRODSEL'];
    
            // Validar que las claves necesarias existan
            if (!isset($registro['IDPROD'], $registro['PRECIOG'], $registro['PRECIOP'], $registro['IDMMENUDET'])) {
                echo "Error: Faltan datos en el registro.";
                return false;
            }
    
            // Procesar el registro
            $this->obj->setId_menudetalle($registro['IDMMENUDET']); // ID del detalle del menú
            $this->obj->setD_actualizacion(date('Y-m-d')); // Fecha de actualización
            $this->obj->setId_producto($registro['IDPROD']);
            $this->obj->setI_preciogrande($registro['PRECIOG']);
            $this->obj->setI_preciopequeno($registro['PRECIOP']);
            $this->obj->setC_activo('S');
            $tempresp = $this->obj->actualizar(); // Método para actualizar el registro
    
            return $tempresp;
        }
    
        //---[ SON VARIOS ARREGLOS ]--------------------------------------------------------------------------------
        foreach ($data['PRODSEL'] as $registro) {
            // Validar que $registro sea un array
            if (!is_array($registro)) {
                echo "Error: El registro no es un array válido.";
                continue; // Saltar al siguiente registro
            }
    
            // Validar que las claves necesarias existan
            if (!isset($registro['IDPROD'], $registro['PRECIOG'], $registro['PRECIOP'], $registro['IDMMENUDET'])) {
                echo "Error: Faltan datos en el registro.";
                continue; // Saltar al siguiente registro
            }
    
            // Procesar el registro
            $this->obj->setId_menudetalle($registro['IDMMENUDET']); // ID del detalle del menú
            $this->obj->setD_actualizacion(date('Y-m-d')); // Fecha de actualización
            $this->obj->setId_producto($registro['IDPROD']);
            $this->obj->setI_preciogrande($registro['PRECIOG']);
            $this->obj->setI_preciopequeno($registro['PRECIOP']);
            $this->obj->setC_activo('S');
            $tempresp = $this->obj->actualizar(); // Método para actualizar el registro
        }
    
        return isset($tempresp) && $tempresp ? true : false;
    }

    private function bo($data) {
        // Validar que $data['PRODSEL'] sea un array
        if (!is_array($data['PRODSEL'])) {
            echo "Error DESDE BORRAR: 'PRODSEL' no es un array válido.";
            return false;
        }    
        $this->obj->setId_menu($data['IDMENU']);
    
        //---[ ES UN SOLO REGISTRO ]-----------------------------------------------------------------------------
        if (isset($data['PRODSEL']['IDMMENUDET'])) {
            // Procesar un único registro
            $registro = $data['PRODSEL'];
    
            // Validar que las claves necesarias existan
            if (!isset($registro['IDMMENUDET'])) {
                echo "Error DESDE BORRAR: Faltan datos en el registro.";
                return false;
            }
    
            // Procesar el registro
            $this->obj->setId_menudetalle($registro['IDMMENUDET']); // ID del detalle del menú
            $this->obj->setD_actualizacion(date('Y-m-d')); // Fecha de actualización
            $this->obj->setC_activo('N'); // Cambiar a inactivo
            $tempresp = $this->obj->eliminar(); // Método para eliminar el registro
            return $tempresp;
        }
    
        //---[ SON VARIOS REGISTROS ]-----------------------------------------------------------------------------
        foreach ($data['PRODSEL'] as $registro) {
            // Validar que $registro sea un array
            if (!is_array($registro)) {
                echo "Error DESDE BORRAR VARIOS REGISTROS: El registro no es un array válido.";
                continue; // Saltar al siguiente registro
            }    
            // Validar que las claves necesarias existan
            if (!isset($registro['IDMMENUDET'])) {
                echo "Error DESDE BORRAR: Faltan datos en el registro.";
                continue; // Saltar al siguiente registro
            }    

            // Procesar el registro
            $this->obj->setId_menudetalle($registro['IDMMENUDET']); // ID del detalle del menú
            $this->obj->setD_actualizacion(date('Y-m-d')); // Fecha de actualización
            $this->obj->setC_activo('N'); // Cambiar a inactivo
            $tempresp = $this->obj->eliminar(); // Método para eliminar el registro
        }    

        return isset($tempresp) && $tempresp ? true : false;

    }
        
    private function oper($data) {

        foreach ($data['PRODSEL'] as $producto) {       

            if (!isset($producto['operacion'])) {
                // Si no existe, continuar con el siguiente producto
                continue;
            }
            
            switch ($producto['operacion']) {
                case 'AGREGAR':
                    $variablesequivalentes=['PRODSEL'=>$producto, 'IDMENU'=> $data['IDMENU']];
                    $tempresp = $this->ag($variablesequivalentes);
                    break;
                case 'BORRAR':
                    $variablesequivalentes=['PRODSEL'=>$producto, 'IDMENU'=> $data['IDMENU']];
                    $tempresp = $this->bo($variablesequivalentes);        
                    break;
                case 'ACTUALIZAR':
                    $variablesequivalentes=['PRODSEL'=>$producto, 'IDMENU'=> $data['IDMENU']];
                    $tempresp = $this->ac($variablesequivalentes);
                    break;
                default:
                break;
            }          
        }
        
        if($tempresp){
            $temarray=['E'=>'LOS DATOS SE PROCESARON CORRECTAMENTE'];
            return $temarray;
        }else{
            $temarray=['E'=>'HUBO UN PROBLEMA LOS DATOS NO SE PROCESESARON'];
            return $temarray;
        }
    
    }

    //---[ NO OPERATIVAS ]-----

        private function lixd($data) {
            // Implementación de la función LXID
            echo "Función LXID ejecutada";
        }

        private function lifs($data) {
            // Implementación de la función LIFS
            echo "Función LIFS ejecutada";
        }
}