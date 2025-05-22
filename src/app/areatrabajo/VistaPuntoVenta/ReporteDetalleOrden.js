import { React, useMemo, useState, useEffect } from "react";
//-----[REDUX TOOLKIT]-----
import { useObtdetallesordenesQuery } from "../../redux/servicio/GenericApi";

//-----[ REPORTES ]-----
import { Table as BTable, Container, Row, Col, Image, Button, Table } from "react-bootstrap";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { FiltroGlobal } from "../componentes/FiltroGlobal";

//---[ TABLA SUCURSALES HELPERS ]-------------------------
    const columnHelper = createColumnHelper();

    const calcularTotales = (filas) => {
      return filas.reduce(
        (totales, fila) => {
          totales.TAPGAR += parseFloat(fila.TAPGAR) || 0;
          totales.PREFIN += parseFloat(fila.PREFIN) || 0;
          totales.PRECDES += parseFloat(fila.PRECDES) || 0;
          return totales;
        },
        { TAPGAR: 0, PREFIN: 0, PRECDES: 0 }
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
        case "ACT":
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
        default:
        salida = (<span style={style_a}>{val}</span>);
      }
      return salida;
    };

    const COL_ORDENES = [
      columnHelper.accessor("NF", {
        header: () => alineacion("text", "center", "No."),
        cell: (info) => alineacion("text", "center", info.row.index + 1),
      }),
      columnHelper.accessor("NOMPRD", {
        header: () => alineacion("text", "center", "PRODUCTO"),
        cell: (info) => alineacion("text", "left", info.renderValue()),
      }),
      columnHelper.accessor("PRECIO", {
        header: () => alineacion("text", "center", "PRECIO UNIDAD"),
        cell: (info) => alineacion("money", "center", info.renderValue()),        
      }),

      columnHelper.accessor("CANT", {
        header: () => alineacion("text", "center", "CANTIDAD"),
        cell: (info) => alineacion("text", "center", info.renderValue()),
      }),

      columnHelper.accessor("PREFIN", {
        header: () => alineacion("text", "center", "TOTAL"),
        cell: (info) => alineacion("text", "center", info.renderValue()),
      }),

      columnHelper.accessor("PRECDES", {
        header: () => alineacion("text", "center", "DESCUENTO"),
        cell: (info) => alineacion("money", "center", info.renderValue()),
      }),
      columnHelper.accessor("TAPGAR", {
        header: () => alineacion("text", "center", "TOTAL PAGADO"),
        cell: (info) => alineacion("money", "center", info.renderValue()),
      }),

    ];

//---[COMPONENTE PRINCIPALES]----------------------------------------------------------
  const ReporteDetalleOrden = ({NUMFILA, CODOR, modalTipo}) => {
    //---[ QUERY: OBTENER ORDENES]----
    const [OBtcam, setOBtcam] = useState(null);
    useEffect(() => {
      setOBtcam({
        controller: "DetalleOrdenesController",
        accion: "LI",
        ID: NUMFILA
      });
    }, [NUMFILA]);
    const { data: DetalleOrdenes, isSuccess:  isDetalleOrdenes } = useObtdetallesordenesQuery(OBtcam,{ skip: !OBtcam }); 

    return (
      <>
        {isDetalleOrdenes !== false && (
          <>
            {modalTipo === "DETALLE" ? (           
              <div className="container mx-auto contenedor contenedorcentral">
                <div className="Titulo">DETALLE DE LA ORDEN: <span style={{color:"#0074b3"}} >{CODOR}</span></div>
                {isDetalleOrdenes && (
                  <TablaReporte
                    IDEMPRE={'1'}
                    Filas={DetalleOrdenes}
                    TIPOCOLUMNA={COL_ORDENES}
                    ETIQUETA="ORDENES"
                    COMPONENTE={''}
                  />
                )}
              </div>         
            ) : modalTipo === "IMPRIMIR" ? (
              <div className="ticket">
                <h5 className="text-center">Ticket de Compra</h5>
                <p className="text-center" style={{ fontSize: "12px", margin: "0" }}>
                  Fecha: {new Date().toLocaleString()}
                </p>
                <p className="text-center" style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}>
                  Código: {CODOR}
                </p>
                <hr />
                <Table bordered className="tabla-redondeada">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DetalleOrdenes.map((detalle, index) => (
                      <tr key={index}>
                        <td>{detalle.NOMPRD}</td>
                        <td>{detalle.CANT}</td>
                        <td>${parseFloat(detalle.PRECIO).toFixed(2)}</td>
                        <td>${(detalle.CANT * detalle.PRECIO).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
          ) : null}
        </>
        )}
      </>
    );
  };

//---[COMPONENTE TABLA]----------------------------------------------------------
  const TablaReporte = ({Filas, TIPOCOLUMNA}) => {
    //---[CONTANTES]
    const columns = TIPOCOLUMNA;
    const data = useMemo(() => Filas, [Filas]);
    const [globalFilter, setGlobalFilter] = useState(""); //FILTRO PARA TODA LA TABLA
    const [columnFilters, setColumnFilters] = useState([]); //FILTRO PARA COLUMNAS
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
    });

    const totales = calcularTotales(Filas);



    return (
      <div name="caja1" className="container mx-auto">

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
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
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
                        case "ACT":
                          return (
                            <td
                              key={cell.id}
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
                <td colSpan={4} style={{ fontWeight: "bold", textAlign: "center" }}>Totales</td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>{`$ `+totales.PREFIN.toFixed(2)}</td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>{`$ `+totales.PRECDES.toFixed(2)}</td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>{`$ `+totales.TAPGAR.toFixed(2)}</td>             
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

export default ReporteDetalleOrden;