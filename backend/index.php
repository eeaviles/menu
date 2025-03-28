<?php
header("Access-Control-Allow-Origin: http://localhost:3000");   //--- [ PASO 4 ]
//header("Access-Control-Allow-Origin: http://localhost");   //--- [ PASO 4 ]
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

//-----[ CARGAR LiBRERÍAS, CONTROLADORES Y MODELOS ]------------------------------------------
$baseDir = __DIR__ . '/./prv/';
require($baseDir . 'db/dbcon.php');
require($baseDir . 'session/sessions.php');
foreach(glob($baseDir . 'controladores/*.php') as $file){ require $file; }
foreach(glob($baseDir . 'modelos/*BLM.php') as $file){ require $file; }

$db = new Database();

$dir_images = dirname(__DIR__)."/build/img/productos/";
//-----[ RECIBIENDO DATOS EXTERNOS ]---------------------------------

$data = json_decode(file_get_contents('php://input'), true); 

if($_POST){
    $datatemp = json_decode($_POST["temp"]);
    $data =  (array)$datatemp; //CAST variable a un array
}

if($_GET){
     $data =  (array)$_GET;//CAST variable a un array
}

if($data){ 
    if (!isset($_COOKIE['PHPSESSID'])) {  //---[ Verifica sí el usuario ha iniciado sesión ]  
        //echo "DESDE OPCION SEESION FALSE";
        switch ($data['controller']) {         
                       case "UsuariosController"://---[ REGISTRSR UNA NUEVA SESSION ]
               $usuarioscontroller = new UsuariosController($db);
               $MensajeSalida = $usuarioscontroller->accion($data);    
            break; 
            default:
                $MensajeSalida = "INDEX.PHP PHPSESSID FALSE, EN TODAS LAS OPCIONES EVALUADAS NO SE ENCONTRÓ COINCIDENCIA";
        }

    }else{//---[ Sí no hay sesión, hay que comenzar una ]          
        session_start();       
        switch ($data['controller']) {
            case "SessionController":
                $sessioncontroller = new SessionController($db);
                $MensajeSalida = $sessioncontroller->accion($data);
                break;
            case "UsuariosController":
                $usuarioscontroller = new UsuariosController($db);
                $MensajeSalida = $usuarioscontroller->accion($data);                
                break;
            case "EmpresasController": 
                $empresascontroller = new EmpresasController($db);
                $MensajeSalida = $empresascontroller->accion($data);
                break;
            case "PersonasController":
                $personacontroller = new PersonasController($db);
                $MensajeSalida = $personacontroller->accion($data);  
                break;
            case "SucursalesController":
                $sucursalescontroller = new SucursalesController($db);
                $MensajeSalida = $sucursalescontroller->accion($data);
                break;
            case "EmpCat019Controller":
                $empcat019controller = new EmpCat019Controller($db);
                $MensajeSalida = $empcat019controller->accion($data);
                break;
            case "Cat019Controller":
                $cat019controller = new Cat019Controller($db);
                $MensajeSalida = $cat019controller->accion($data);
                break;
            default:
                $MensajeSalida = "INDEX.PHP PHPSESSID TRUE, EN TODAS LAS OPCIONES EVALUADAS NO SE ENCONTRÓ COINCIDENCIA";
        }
    }

//---[ Salida JSON ]
//---[ El messaje de salida es elmensaje devuelto através de la función acción de cada clase Controleer ]
      echo json_encode($MensajeSalida,  JSON_UNESCAPED_UNICODE );

}
?>