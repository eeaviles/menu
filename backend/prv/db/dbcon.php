<?php
class Database extends PDO{
    public function __construct() {
        try{
            parent::__construct('mysql:host=localhost;dbname=gpa','root','alepam2020#r');  //---[ PASO 4]-local
            //parent::__construct('mysql:host=localhost;dbname=servifaco','root','2022ALPA#alpa'); //---[ PASO 4 ]-DigitalOcea
            parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $ex) {
            echo $ex . '<br>';
            die('Error al conectar a la base de datos.');
        }
    }
}
?>