const Imprimir = (datos) => {

    const qz = window.qz; // Accede a la variable global qz
  
    // Función para cargar imágenes como base64
    function loadImageAsBase64(url) {
        return fetch(url)
            .then((response) => response.blob())
            .then(
            (blob) =>
                new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result;
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
                })
            );
    } 
    
    // 1. Cargar certificado público 
    qz.security.setCertificatePromise(function(resolve, reject) {
    fetch("/menu/backend/prv/firmas/qzpos80imp.txt", {cache: "no-store", headers: {"Content-Type": "text/plain"}})
        .then(function(data) { data.ok ? resolve(data.text()) : reject(data.text()); });
    });    

    // 2. Firma digital del comando 
    qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1

    qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
        fetch("/menu/backend/prv/firmas/mensajefirmado.php?request=" + toSign, 
            {cache: "no-store", headers: { "Content-Type": "text/plain" } })
            .then(function (data) {data.ok ? resolve(data.text()) : reject(data.text());});
    };
    });
  
    // Función para conectar a QZ Tray
    function connectQZ() {
      if (!qz.websocket.isActive()) {
        return qz.websocket.connect();
      }
      return Promise.resolve();
    }
  
    // Función para imprimir
    function print() {
      if (!datos) {
        console.error("No hay datos disponibles para imprimir.");
        return;
      }
  
      connectQZ()
        .then(() => qz.printers.find("POS-80")) // Cambia "POS-80" por el nombre exacto de tu impresora
        .then((printer) => {
          const config = qz.configs.create(printer, {
            size: { width: 150, height: 80 }, // Tamaño en píxeles
            density: 300, // Resolución en DPI
          });

        // Opciones de impresión
        const options = {
            language: "ESCPOS", // Cambia según el lenguaje de tu impresora
            dotDensity: "single", // Densidad de puntos
            alignment: "center",
            x: 0, // Coordenada X
            y: 0, // Coordenada Y
        };
  
          return loadImageAsBase64("./img/logos/CafeGarzan_175x80.jpg").then((base64Image) => {
            const data = [
                '\x1B\x40',         // init
                '\x1B\x74\x10',     // Configurar conjunto de caracteres a CP1252
                '\x1B\x61\x31',     // center align                    
                { type: 'raw', format: 'image', flavor: 'base64', data: base64Image, options },
                '\x0A',
                'Ticket de Compra', 
                '\x0A',
                `CÓDIGO: ${datos.codigo}`,
                '\x0A',
                'CAFÉ GARZÁN' + '\x0A',
                'FECHA:' + new Date().toLocaleString() + '\x0A',
                '\x1B\x61\x30', // left align
                '\x0A',         // Salto de línea
                '\x1B\x4D\x31', // small text
                `${'Nombre'.padEnd(20)}` +  `${'Cant'.padStart(6)}` + 
                `${'Pre'.padStart(8)}` + `${'Des'.padStart(8)}` +  `${'SubT'.padStart(10)}`+ '\x0A', 
                ...datos.productos.map((p) =>
                    `${p.nombre.substring(0, 20).padEnd(20)} ${String(p.cantidad).padStart(4)} ${`${p.precio.toFixed(2)}`.padStart(8)} ${`${p.descuento.toFixed(2)}`.padStart(8)} ${`${p.subtotal.toFixed(2)}`.padStart(8)}\x0A`
                ),
                '-------------------------------------------------------' + '\x0A',
                '\x1B\x4D\x30', // normal text
                `TOTAL                              $${parseFloat(datos.total).toFixed(2)}` + '\x0A', 
                '\x0A',                   // Salto de línea
                '\x1B\x64\x05',           // Alimentar 5 líneas
                '\x1D\x56\x01'            // Cortar papel
                ];
  
            return qz.print(config, data); // Enviar los datos a la impresora
          });
        })
        .then(() => {
          console.log("Impresión de imagen enviada correctamente");
        })
        .catch((err) => {
          console.error("Error al imprimir la imagen:", err);
        });
    }

    //puerto 8182 inseguro

    // Inicializar QZ Tray
    const iniciarQZTray = () => {
        qz.websocket.connectConfig = {
            host: "localhost",
            port: 8181,
            secure: true,
        };
    }; 
    iniciarQZTray();
  
    // Retorna la función print para que pueda ser llamada externamente
    return { print };
  };
  
  export default Imprimir;