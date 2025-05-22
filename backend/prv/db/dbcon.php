<?php
class Database extends PDO{
    public function __construct() {
        try{
            // Detectar si estamos en localhost o en el servidor
            $isLocalhost = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1']);

            //parent::__construct('mysql:host=localhost;dbname=menu','root','alepam2020#r');    // LOCAL
            //parent::__construct('mysql:host=localhost;dbname=menu','root','2022ALPA#alpa');     // SERVER

            //------------------------------------------------------------
            // Configuración de conexión
            if ($isLocalhost) {
                // Configuración para LOCALHOST
                $dsn = 'mysql:host=localhost;dbname=menu';
                $username = 'root';
                $password = 'alepam2020#r';
            } else {
                // Configuración para SERVIDOR
                $dsn = 'mysql:host=localhost;dbname=menu';
                $username = 'root';
                $password = '2022ALPA#alpa';
            }          


            // Llamar al constructor de PDO con los argumentos correctos
            parent::__construct($dsn, $username, $password);
            
            //------------------------------------------------------------
            
            
            parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $ex) {
            echo $ex . '<br>';
            die('Error al conectar a la base de datos.');
        }
    }
}
?>