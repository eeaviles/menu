import { React, useMemo, useState } from "react";
import {Table as BTable, Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import COLS from "./Columnas2";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { FiltroGlobal } from "./FiltroGlobal";

const TablaAcciones = ({ID, Filas, TIPOCOLUMNA, ETIQUETA, COMPONENTE, COMPONENTE2, COMPONENTE3, BOTONAGREGAR, }) => {
  const [show, setShow] = useState(false); //-----[ PARA EL MODAL]
  const [accion, setAccion] = useState("");
  const [numfila, setNumfila] = useState(false);
  const columns = useMemo(() => COLS[TIPOCOLUMNA], [TIPOCOLUMNA]); //DEFINICIÓN DE COLUMNAS
  const data = useMemo(() => Filas, [Filas]); //DATOS
  const [globalFilter, setGlobalFilter] = useState(""); //FILTRO PARA TODA LA TABLA
  const [columnFilters, setColumnFilters] = useState([]); //FILTRO PARA COLUMNAS

  const useractivo = JSON.parse(localStorage.getItem("SESIONUSER")) || null;

  const table = useReactTable({
    columns,
    data,
    state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  //ObtModlal(e, "PDF", row.id);
  
  const ObtModlal = (e, agreact, ROWID) => {
    if (agreact === true) {
      setNumfila(""); // AGREGAR
    } else {
      setNumfila(Filas[ROWID]); //Fijar la fila de datos seleccionada. ACTUALIZAR
    }
    console.log(agreact);
    setAccion(agreact);
    setShow(true);
  };

  const closeModal = () => { setShow(false); };

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
              ID={ID}
              closeModal={closeModal}
              ETIQUETA={ETIQUETA}
              DIS={false}
              USERACTIVO={useractivo}
            />
          )}
          {accion === false && (
            <COMPONENTE
              DATOS={numfila}
              ID={ID}
              closeModal={closeModal}
              ETIQUETA={ETIQUETA}
              DIS={numfila?.["ESTADO"] !== "Elaborado" ? true : false}
            />
          )}
          {accion === "DET" && (
            <COMPONENTE2
              DATOS={numfila}
              ID={ID}
              closeModal={closeModal}
              ETIQUETA={ETIQUETA}
            />
          )}
          {accion === "PDF" && (
            <COMPONENTE3
              DATOS={numfila}
              ID={ID}
              closeModal={closeModal}
              ETIQUETA={ETIQUETA}
            />
          )}
        </Modal.Body>
      </Modal>

      {BOTONAGREGAR !== false && (
        <div className="ContBusquedaAgregar">
          <FiltroGlobal filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="BotonAgregar">
            <Button
              variant="flat NB_text"
              size="xxl"
              type="button"
              onClick={(e) => { ObtModlal(e, true); }}
            >
              <Image
                src={
                  process.env.PUBLIC_URL + "/img/iconos/add_box_black_24dp.svg"
                }
                width="22"
                height="22"
                alt=""
              />
              {" AGREGAR " + ETIQUETA}
            </Button>
          </div>
        </div>
      )}

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
                              onClick: header.column.getToggleSortingHandler(),
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
                  let temp = cell.id.substring(cell.id.lastIndexOf("_") + 1);
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
                    case "DET":
                      return (
                        <td
                          key={cell.id}
                          onClick={(e) => {
                            ObtModlal(e, "DET", row.id);
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    case "PDF":
                      return (
                        <td
                          key={cell.id}
                          onClick={(e) => {
                            ObtModlal(e, "PDF", row.id);
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    case "FFINAL":
                      return (
                        <td key={cell.id} width={100}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    case "FCANCL":
                      return (
                        <td key={cell.id} width={100}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    case "FENV":
                      return (
                        <td key={cell.id} width={100}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    case "FELABOR":
                      return (
                        <td key={cell.id} width={100}>
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
    </>
  );
};

export default TablaAcciones
