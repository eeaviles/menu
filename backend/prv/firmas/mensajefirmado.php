<?php

// Detectar si estamos en localhost o en el servidor
$isLocalhost = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1']);

// Configuración del archivo P12

$p12_file = $isLocalhost 
    ? 'D:/Apache24/conf/ssl/server/qzpos80imp.p12' // Ruta para LOCALHOST ruta valida solo en desarrollo
    : '/var/www/secure/qzpos80imp.p12';  // Ruta para SERVIDOR
$p12_password = 'pos80menu';

// Leer el cuerpo del POST
$input = json_decode(file_get_contents('php://input'), true);
//$dataToSign = $input['data'] ?? null;
$dataToSign = isset($_GET['request']) ? $_GET['request'] : '';

if (!$dataToSign) {
    http_response_code(400);
    echo "No hay datos para firmar";
    exit;
}

// Cargar el certificado y clave desde el .p12
if (!file_exists($p12_file)) {
    http_response_code(500);
    echo "Archivo .p12 no encontrado";
    exit;
}

$certs = [];
if (!openssl_pkcs12_read(file_get_contents($p12_file), $certs, $p12_password)) {
    http_response_code(500);
    echo "Error al leer el archivo .p12";
    exit;
}

// Firmar los datos
$privateKey = openssl_pkey_get_private($certs['pkey']);
if (!$privateKey) {
    http_response_code(500);
    echo "No se pudo obtener la clave privada";
    exit;
}

$signature = '';
if (!openssl_sign($dataToSign, $signature, $privateKey, OPENSSL_ALGO_SHA512)) {
    http_response_code(500);
    echo "Error al firmar los datos";
    exit;
}

// Devolver la firma en base64
echo base64_encode($signature);
