import { React, useMemo, useState, useEffect } from "react";
//-----[REDUX TOOLKIT]-----
import { useObtproductosQuery } from "../../../../redux/servicio/GenericApi";

//-----[ REPORTES ]-----
import { Table as BTable, Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { FiltroGlobal } from "../../../componentes/FiltroGlobal";
import ProductosAcciones from "./ProductosAcciones";

//---[ TABLA PRODUCTOS HELPERS ]-------------------------
  const columnHelper = createColumnHelper();
  const alineacion = (tipo, alinecion, val, fuente, color, titulo) => {
      //let incluir = "";
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
      justifyContent: alinecion,
    };

    const style_img2 = {
      width: "48px",
      height: "48px",
      borderRadius: "50% 50%",
      display: "flex",
      margin: "auto",
      justifyContent: alinecion,
    };


    switch (tipo) {
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
        break
        case "IMG":
          salida = (
            <img
              style={style_img2}
              className={"actualizar"}
              alt={"Actualizar"}
              title={"Actualizar"}
              src={process.env.PUBLIC_URL + "/img/productos/"+val}
            />
          );
        break;
      default:
       salida = (<span style={style_a}>{val}</span>);
    }
    return salida;
  };

  const COL_PRODUCTOS= [
    columnHelper.accessor("NF", {
      header: () => alineacion("text", "left", "No."),
      cell: (info) => alineacion("text", "left", info.row.index + 1),
    }),
    columnHelper.accessor("NOMBRECAT", {
      header: () => alineacion("text", "left", "CATEGORÍA"),
      cell: (info) => alineacion("text", "left", info.renderValue()),
    }),
    columnHelper.accessor("PRODNOM", {
      header: () => alineacion("text", "left", "PRODUCTO"),
      cell: (info) => alineacion("text", "left", info.renderValue()),
    }),
    columnHelper.accessor("PRECIOG", {
      header: () => alineacion("text", "left", "PROCIO GRANDE"),
      cell: (info) => alineacion("text", "left", "$ "+info.renderValue()),
    }),
    columnHelper.accessor("PRECIOP", {
      header: () => alineacion("text", "left", "PROCIO PEQUEÑO"),
      cell: (info) => alineacion("text", "left", "$ "+info.renderValue()),
    }),
    columnHelper.accessor("PRODIMG", {
      header: () => alineacion("text", "center", "IMAGEN"),
      cell: (info) => alineacion("IMG", "left", info.renderValue()),
    }),
    columnHelper.accessor("DESCRIP", {
      header: () => alineacion("text", "left", "DESCRIPCIÓN"),
      cell: (info) => alineacion("text", "left", info.renderValue()),
    }),
    columnHelper.accessor("ACT", {
      header: () => alineacion("text", "center", "ACT"),
      cell: (info) => alineacion("ACT", "left", info.renderValue()),
    }),
  ];

//---[COMPONENTE PRINCIPALES]----------------------------------------------------------
  const Productos = ({ IDPEmpresaSelec }) => {
    //---[ QUERY: OBTENER CATEGORIAS]----
    const [OBtcam, setOBtcam] = useState(null);
    useEffect(() => {
      setOBtcam({
        ID: IDPEmpresaSelec,
        controller: "ProductosController",
        accion: "LI",
      });
    }, [IDPEmpresaSelec]);
    const { data: ListaProductos, isSuccess: isListaProductos } = useObtproductosQuery(OBtcam,{ skip: !OBtcam }); 
    return (
      <>
        {isListaProductos !== false && (
          <div className="container mx-auto contenedor">
            <div className="Titulo">LISTA DE PRODUCTOS</div>
            {ListaProductos && (
              <TablaReporte
                IDEMPRE={IDPEmpresaSelec}
                Filas={ListaProductos}
                TIPOCOLUMNA={COL_PRODUCTOS}
                ETIQUETA="PRODUCTOS"
                COMPONENTE={ProductosAcciones}
              />
            )}
          </div>
        )}
      </>
    );
  };

//---[COMPONENTE TABLA]----------------------------------------------------------
  const TablaReporte = ({IDEMPRE, Filas, TIPOCOLUMNA, ETIQUETA, COMPONENTE}) => {
    //---[CONTANTES]
    const [show, setShow] = useState(false); //-----[ PARA EL MODAL]
    const [accion, setAccion] = useState("");
    const [numfila, setNumfila] = useState(false);
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

    const ObtModlal = (e, agreact, ROWID) => {
      if (agreact === true) {
        setNumfila(""); // AGREGAR
      } else {
        setNumfila(Filas[ROWID]); //Fijar la fila de datos seleccionada. ACTUALIZAR
      }
      //console.log(agreact);
      setAccion(agreact);
      setShow(true);
    };

      const closeModal = () => {
        setShow(false);
      };

    return (
      <>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-w90"
          aria-labelledby="custommodal"
        >
          <Modal.Header closeButton className="Modalcolorbackground">
            <div style={{ textAlign: "center" }}></div>
          </Modal.Header>

          <Modal.Body>
            {accion === true && (
              <COMPONENTE
                DATOS=""
                IDEMPRE={IDEMPRE}
                closeModal={closeModal}
                ETIQUETA={ETIQUETA}
              />
            )}
            {accion === false && (
              <COMPONENTE
                DATOS={numfila}
                IDEMPRE={IDEMPRE}
                closeModal={closeModal}
                ETIQUETA={ETIQUETA}
              />
            )}
          </Modal.Body>
        </Modal>

        <div className="ContBusquedaAgregar">
          <FiltroGlobal filter={globalFilter} setFilter={setGlobalFilter} tex='p'/>
          <div className="BotonAgregar">
            <Button
              variant="flat NB_text"
              size="xxl"
              type="button"
              onClick={(e) => { ObtModlal(e, true); }}
            >
            <Image
              src={process.env.PUBLIC_URL + "/img/iconos/add_box_black_24dp.svg"}
              width="22" height="22" alt="" />
              {" AGREGAR "}
            </Button>
          </div>
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
                                style={{ cursor: "pointer"}}
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
                              onClick={(e) => {
                                ObtModlal(e, false, row.id);
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
      </>
    );
  };

export default Productos;