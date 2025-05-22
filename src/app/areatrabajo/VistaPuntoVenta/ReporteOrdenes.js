import { React, useMemo, useState } from "react";
//-----[REDUX TOOLKIT]-----
import { useLazyObtordenesQuery } from "../../redux/servicio/GenericApi";

//-----[ REPORTES ]-----
import { Table as BTable, Container, Row, Col, Image, Button, Modal, Form } from "react-bootstrap";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { FiltroGlobal } from "../componentes/FiltroGlobal";
import ReporteDetalleOrden from "./ReporteDetalleOrden.js";

//---[ TABLA SUCURSALES HELPERS ]-------------------------

  const columnHelper = createColumnHelper();

  const formatearFecha = (fecha) => {
    const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
  
    const date = new Date(fecha);
    const diaSemana = diasSemana[date.getDay()];
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const anio = date.getFullYear();
    const hora = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");
  
    return `${diaSemana} ${dia}-${mes}-${anio} a las ${hora}:${minutos}:${segundos}`;
  };

  const traducirEstado = (estado) => {
    switch (estado) {
      case "P":
        return "Pagada";
      case "D":
        return "Pendiente";
      default:
        return "Desconocido"; // Por si llega un valor inesperado
    }
  };

  const calcularTotales = (filas) => {
    return filas.reduce(
      (totales, fila) => {
        totales.TPAGO += parseFloat(fila.TPAGO) || 0;
        totales.TFINAL += parseFloat(fila.TFINAL) || 0;
        totales.TDES += parseFloat(fila.TDES) || 0;
        return totales;
      },
      { TPAGO: 0, TFINAL: 0, TDES: 0 }
    );
  };

  const alineacion = (tipo, alinecion, val, fuente, color, titulo) => {
      let incluir = "";
      let salida = "";
    const style_a = {
      backgroundColor: "rgb(186, 186, 236) !important",
      display: "flex",
      justifyContent: alinecion,

      marginTop: "0.1rem",
      color: color,
    };
    const style_img = {
      width: "24px",
      height: "24px",
      borderRadius: "50% 50%",
      display: "flex",
      margin: "auto",
    };

    switch (tipo) {
      case "money":
        incluir = "$";
        salida = (
          <span style={style_a}>
            {incluir} {val}
          </span>
        );
        break;
      case "icono":
        salida = (        
          <img
            style={style_img}
            alt={titulo}
            title={titulo}
            src={process.env.PUBLIC_URL + fuente + val}
          />
        );
        break
      case "DET":
        salida = (
          <img
            style={style_img}
            className={"actualizar"}
            alt={"Actualizar"}
            title={"Actualizar"}
            src={process.env.PUBLIC_URL + "/img/iconos/update.svg"}
          />
        );
        break;
      case "IMP":
          salida = (
            <img
              style={style_img}
              className={"actualizar"}
              alt={"Imprimir"}
              title={"Imprimir"}
              src={process.env.PUBLIC_URL + "/img/iconos/print_24dp.svg"}
            />
          );
      break;      
      default:
      salida = (<span style={style_a}>{val}</span>);
    }
    return salida;
  };

  const filtroPorFechaFormateada = (row, columnId, filterValue) => {
    const valorOriginal = row.getValue(columnId); // Obtiene el valor original de la celda
    const valorFormateado = formatearFecha(valorOriginal).toLowerCase(); // Formatea la fecha
    return valorFormateado.includes(filterValue.toLowerCase()); // Compara con el filtro
  };

  const COL_ORDENES = [
    columnHelper.accessor("NF", {
      header: () => alineacion("text", "center", "No."),
      cell: (info) => alineacion("text", "center", info.row.index + 1), //NOMBRE
    }),
    columnHelper.accessor("CODOR", {
      header: () => alineacion("text", "left", "CÓDIGO"),
      cell: (info) => alineacion("text", "left", info.renderValue()),
    }),
    columnHelper.accessor("NOMBRE", {
      header: () => alineacion("text", "left", "NOMBRE USUARIO"),
      cell: (info) => alineacion("text", "left", info.renderValue()),
    }),
    columnHelper.accessor("FECREA", {
      header: () => alineacion("text", "left", "FECHA DE CREACIÓN"),
      cell: (info) => alineacion("text", "left   ", formatearFecha(info.renderValue())),
      filterFn: filtroPorFechaFormateada, // Filtro personalizado para fechas formateadas
    }),
    columnHelper.accessor("TPAGO", {
      header: () => alineacion("text", "center", "TOTAL A PAGAR"),
      cell: (info) => alineacion("money", "center", info.renderValue()),
    }),
    columnHelper.accessor("TDES", {
      header: () => alineacion("text", "center", "TOTAL DE DESCUENTO"),
      cell: (info) => alineacion("money", "center", info.renderValue()),
    }),
    columnHelper.accessor("TFINAL", {
      header: () => alineacion("text", "center", "TOTAL PAGADO"),
      cell: (info) => alineacion("money", "center", info.renderValue()),
    }),
    columnHelper.accessor("ESTADO", {
      header: () => alineacion("text", "center", "ESTADO"),
      cell: (info) => alineacion("text", "center", traducirEstado(info.renderValue())),
    }),
    columnHelper.accessor("DET", {
      header: () => alineacion("text", "center", "DETALLE"),
      cell: (info) => alineacion("DET", "left", info.renderValue()),
    }),
    columnHelper.accessor("IMP", {
      header: () => alineacion("text", "center", "IMPRIMIR"),
      cell: (info) => alineacion("IMP", "left", info.renderValue()),
    }),
  ];

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses comienzan en 0
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  };


//---[COMPONENTE PRINCIPALES]----------------------------------------------------------
  const ReporteOrdenes = () => {
    
    const [fechaInicio, setFechaInicio] = useState(obtenerFechaActual());
    const [fechaFin, setFechaFin] = useState(obtenerFechaActual());  

    //---[ QUERY: OBTENER ORDENES]----

    const enviarDatos = () => {
      if (fechaInicio && fechaFin) {
        trigger({
          controller: "OrdenesController",
          accion: "LIXF",
          FI:fechaInicio,
          FF:fechaFin,
        });
      } else {
        console.error("Las fechas no son válidas");
      }
    };
    const [trigger, { data: ListaOrdenes, isSuccess: isListaOrdenes }] = useLazyObtordenesQuery();

    return (
      <>
          <div name="ContenedorPrincipal" className="container mx-auto contenedor contenedorcentral">
            <div name="Titulo2" className="Titulo2" >LISTA DE ORDENES</div>

            <div name="Filtrosxfexha" className="Titulo d-flex align-items-center my-5">              
              <Form className="BusquedaPorFecha d-flex align-items-center gap-3">
                  <Form.Group controlId="fechaInicio" className="BuscarAncho me-3">
                    <Form.Label className="ATBJformLabel">Fecha Inicio:</Form.Label>
                    <Form.Control
                      type="date"
                      className="ATBJFormInput"        
                      value={fechaInicio}
                      onChange={(e) => {
                        const nuevaFechaInicio = e.target.value;
                        setFechaInicio(nuevaFechaInicio);
                  
                        // Si fechaInicio es mayor que fechaFin, actualiza fechaFin
                        if (nuevaFechaInicio > fechaFin) {
                          setFechaFin(nuevaFechaInicio);
                        }
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="fechaFin" className="BuscarAncho me-3">
                    <Form.Label className="ATBJformLabel">Fecha Fin:</Form.Label>
                    <Form.Control
                      type="date"
                      className="ATBJFormInput"
                      value={fechaFin}
                      min={fechaInicio} // Establecer la fecha mínima como la fecha de inicio
                      onChange={(e) => setFechaFin(e.target.value)} 
                    />
                  </Form.Group>

                  <Form.Group controlId="botonBuscar" className="BuscarAncho me-3">
                    <Form.Label className="ATBJformLabel d-block">Acción:</Form.Label>
                    <Button
                      variant="primary"
                      onClick={() => { enviarDatos() }}     
                    >
                      Buscar
                    </Button>
                  </Form.Group>
              </Form>
            </div>

            <div>
                {isListaOrdenes !== false && (
                  <div>
                    {isListaOrdenes && (
                      <TablaReporte
                        IDEMPRE={'1'}
                        Filas={ListaOrdenes}
                        TIPOCOLUMNA={COL_ORDENES}
                        ETIQUETA="ORDENES"
                        COMPONENTE={ReporteDetalleOrden}
                      />
                    )}
                  </div>
                  )
                }  
            </div> 

          </div>
      </>
    );
  };

//---[COMPONENTE TABLA]----------------------------------------------------------
  const TablaReporte = ({Filas, TIPOCOLUMNA, COMPONENTE}) => {
    //---[CONTANTES]
    //const dispatch = useDispatch();
   // const useractivo = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;
    const [show, setShow] = useState(false); //-----[ PARA EL MODAL]
    const [numfila, setNumfila] = useState(null);
    const columns = TIPOCOLUMNA;
    const data = useMemo(() => Filas, [Filas]);
    const [globalFilter, setGlobalFilter] = useState(""); //FILTRO PARA TODA LA TABLA
    const [columnFilters, setColumnFilters] = useState([]); //FILTRO PARA COLUMNAS
    const [codigoOrdenSeleccionado, setCodigoOrdenSeleccionado] = useState(null); 
    const [modalTipo, setModalTipo] = useState(""); // "DETALLE" o "IMPRIMIR"

    const table = useReactTable({
      columns,
      data,
      state: { globalFilter, columnFilters },
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      globalFilterFn: (row, columnId, filterValue) => {
        if (columnId === "FECREA") {
          const valorOriginal = row.getValue(columnId);
          const valorFormateado = formatearFecha(valorOriginal).toLowerCase();
          return valorFormateado.includes(filterValue.toLowerCase());
        }
        return String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase());
      },
    });

    const totales = calcularTotales(Filas);

    const ObtModlal = (e, ROWID, CODOR, tipo, datosFila) => {
      setNumfila(ROWID); // Fijar la fila de datos seleccionada
      setCodigoOrdenSeleccionado(CODOR); // Guardar el código de orden seleccionado
      setModalTipo(tipo); // Establecer el tipo de modal
      setShow(true); // Mostrar el modal
    };

    const handlePrintTicket = () => {
      const ticketContent = document.querySelector(".ticket").innerHTML; // Selecciona el contenido del ticket
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Ticket</title>
            <style>
              @media print {
                body {
                  font-family: 'Courier New', Courier, monospace;
                  font-size: 12px;
                  margin: 0;
                  padding: 0;
                  width: 80mm; /* Ancho del ticket térmico */
                }
                .ticket {
                  width: 100%;
                  text-align: left;
                }
                .ticket-header {
                  text-align: center;
                  margin-bottom: 10px;
                }
                .ticket-table {
                  width: 100%;
                  border-collapse: collapse;
                }
                .ticket-table th, .ticket-table td {
                  border: none;
                  padding: 5px 0;
                  text-align: left;
                }
                .ticket-total {
                  text-align: right;
                  margin-top: 10px;
                  font-weight: bold;
                }
              }
            </style>
          </head>
          <body>
            <div class="ticket">
              ${ticketContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };

    return (
      <div name="caja1" className="container mx-auto">
        
        <Modal name="mreporte"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName={modalTipo === "IMPRIMIR" ? "modal-ticket" : "modal-w90"}
          aria-labelledby="custommodal"
        >
          <Modal.Header closeButton> 
            {modalTipo === "IMPRIMIR" && (           
              <Modal.Title style={{ textAlign: "center", width: "100%" }}>Cafégarzan</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
              <COMPONENTE
                NUMFILA={numfila}
                CODOR={codigoOrdenSeleccionado}
                modalTipo={modalTipo} // Pasar el tipo de modal
              />
            </Modal.Body>
          <Modal.Footer style={{ borderTop: "none" }}>
            {modalTipo === "IMPRIMIR" && (
              <Button variant="warning" onClick={handlePrintTicket}>
                Imprimir Ticket
              </Button>
            )}
          </Modal.Footer>         
        </Modal>

        <div className="ContBusquedaAgregar">
          <FiltroGlobal filter={globalFilter} setFilter={setGlobalFilter} />
        </div>

        <div>
          <div className="RoundedTable">
            <BTable className="tablamodo_1" striped bordered hover responsive>
              <thead className="ColorTablahead_1">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <>
                              <div

                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : " ",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: " 🔼",
                                  desc: " 🔽",
                                }[header.column.getIsSorted()] ?? null}
                              </div>
                            </>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody className="FontTablaFila">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} style={{ cursor: "pointer" }}>
                    {row.getVisibleCells().map((cell) => {
                      let temp = cell.id.substring(
                        cell.id.lastIndexOf("_") + 1
                      );
                      switch (temp) {
                        case "DET":
                          return (
                            <td key={cell.id}
                              onClick={(e) => {
                                const idOrden = row.original.IDORD; // Accede a IDORD desde la fila actual
                                const codOrden = row.original.CODOR; // Accede a CODOR desde la fila actual
                                ObtModlal(e, idOrden, codOrden, "DETALLE"); // Pasa el tipo "DETALLE"
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        case "IMP":
                            return (
                              <td key={cell.id}
                                onClick={(e) => {
                                  const idOrden = row.original.IDORD; // Accede a IDORD desde la fila actual
                                  const codOrden = row.original.CODOR; // Accede a CODOR desde la fila actual
                                  const datosFila = row.original; // Obtén todos los datos de la fila
                                  ObtModlal(e, idOrden, codOrden, "IMPRIMIR", datosFila); // Pasa el tipo "IMPRIMIR"
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            );
                        default:
                          return (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                      }
                    })}
                  </tr>
                ))}
              <tr>
                <td colSpan={4} style={{ fontWeight: "bold", textAlign: "center" }}> Totales </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}> {`$ `+totales.TPAGO.toFixed(2)} </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}> {`$ `+totales.TDES.toFixed(2)} </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>  {`$ `+totales.TFINAL.toFixed(2)} </td>
                <td colSpan={3}></td>
              </tr>                
              </tbody>
            </BTable>

            <Container
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                backgroundColor: "#ccd8e6",
              }}
            >
              <Row>
                <Col>
                  <Button
                    variant="flat NB_text"
                    size="xxl"
                    type="button"
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        "/img/iconos/double_arrow_left_black_24dp.svg"
                      }
                      width="22"
                      height="22"
                      alt=""
                    />{" "}
                    Inicio
                  </Button>

                  <Button
                    variant="flat NB_text"
                    size="xxl"
                    type="button"
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        "/img/iconos/arrow_left_black_24dp.svg"
                      }
                      width="22"
                      height="22"
                      alt=""
                    />{" "}
                    Atrás
                  </Button>

                  <Button
                    variant="flat NB_text"
                    size="xxl"
                    type="button"
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {" "}
                    Adelante
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        "/img/iconos/arrow_right_black_24dp.svg"
                      }
                      width="22"
                      height="22"
                      alt=""
                    />
                  </Button>

                  <Button
                    variant="flat NB_text"
                    size="xxl"
                    type="button"
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    {" "}
                    Final
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        "/img/iconos/double_arrow_right_black_24dp.svg"
                      }
                      width="22"
                      height="22"
                      alt=""
                    />
                  </Button>
                </Col>
                <Col>
                  <span style={{ fontSize: "0.7rem" }}>
                    <span>Page</span>
                    <strong>
                      {table.getState().pagination.pageIndex + 1} de{" "}
                      {table.getPageCount()}
                    </strong>
                  </span>
                  <span style={{ fontSize: "0.7rem" }}>
                    {" "}
                    | Ir a Página:{" "}
                    <input
                      type="number"
                      size="10"
                      maxLength={10}
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        table.setPageIndex(page);
                      }}
                      className="border p-1 rounded w-16"
                    />
                  </span>{" "}
                  <select
                    style={{ fontSize: "0.7rem" }}
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Mostrar {pageSize}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  };

export default ReporteOrdenes;