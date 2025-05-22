<?php

$allowedOrigins = [
    "https://www.cafegarzan.com",
    "https://cafegarzan.com",
    "http://localhost:3000",
    "http://localhost"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: https://www.cafegarzan.com"); // Valor por defecto
}

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

$data = null;

// Verificar si hay datos en php://input
$inputData = file_get_contents('php://input');

if (!empty($inputData) && is_string($inputData)) {
    $data = json_decode($inputData, true); // Decodificar JSON a un array asociativo
}

// Si no hay datos en php://input, verificar $_POST
if (empty($data) && !empty($_POST)) {
    $data = $_POST; // Usar $_POST directamente como array
}

// Si no hay datos en $_POST, verificar $_GET
if (empty($data) && !empty($_GET)) {
    $data = $_GET; // Usar $_GET directamente como array
}

// Verificar si se enviaron imágenes
if (!empty($_FILES) && isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    // Agregar $dir_images al arreglo $data
    if (!empty($data)) {
        $data['dir_images'] = $dir_images;
    }
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
            case "ProductosController":
                $productoscontroller = new ProductosController($db);
                $MensajeSalida = $productoscontroller->accion($data);
                break;
            case "CategoriasController":
                $categoriascontroller= new CategoriasController($db);
                $MensajeSalida = $categoriascontroller->accion($data);                
                break;
            case "MenuController":
                $menucontroller= new MenuController($db);
                $MensajeSalida = $menucontroller->accion($data);                
                break;
            case "MenuDetallesController":
                $menudetallescontroller= new MenuDetallesController($db);
                $MensajeSalida = $menudetallescontroller->accion($data);                
                break;
            case "OrdenesController": 
                $ordenescontroller= new OrdenesController($db);
                $MensajeSalida = $ordenescontroller->accion($data);                
                break;
            case "DetalleOrdenesController":
                $detalleordenescontroller= new DetalleOrdenesController($db);
                $MensajeSalida = $detalleordenescontroller->accion($data);                
                break;
            case "AreasController":
                $areascontroller= new AreasController($db);
                $MensajeSalida = $areascontroller->accion($data);                
                break;
            case "PuestosTrabajosController":
                $puestostrabajoscontroller= new PuestostrabajosController($db);
                $MensajeSalida = $puestostrabajoscontroller->accion($data);                
                break;
            case "EmpleadosController":
                $empleadoscontroller= new EmpleadosController($db);
                $MensajeSalida = $empleadoscontroller->accion($data);                
                break;
            case "UsuariosController":
                $usuarioscontroller2= new UsuariosController($db);
                $MensajeSalida = $usuarioscontroller2->accion($data);                
                break;
            case "RolesController":
                $rolescontroller= new RolesController($db);
                $MensajeSalida = $rolescontroller->accion($data);                
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