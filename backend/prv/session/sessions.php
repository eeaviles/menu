<?php
class Sessions {
    public function __construct() { }

    // Iniciar la sesión
    public function init() {
        session_start();
    }

    // Establecer una variable de sesión
    public function set($varname, $value) {
        $_SESSION[$varname] = $value;
    }

    // Destruir la sesión
    public function destroy() {
        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(), '', 0, '/');
        $mensaje = ["salir"=>true];
        return $mensaje;
    }

    // Obtener datos de la sesión
    public function getdataSesion() {
        $gds = [
            'IDUSER' => $_SESSION["IDUSER"],
            'USERNAME' => $_SESSION["USERNAME"],
            'ROL' => $_SESSION["ROL"],
            'IDROL' => $_SESSION["IDROL"],
            'NOMBRE' => $_SESSION["NOMBRE"],
            'FOTO' => $_SESSION["FOTO"],
            'IDP' => $_SESSION["IDP"],
        ];
        return $gds;
    }
}
?>