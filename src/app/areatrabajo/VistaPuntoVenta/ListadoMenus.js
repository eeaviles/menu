import { React, useMemo, useState, useEffect } from "react";
//-----[REDUX TOOLKIT]-----
import { useLazyObtmenusQuery, useMenusMutation } from "../../redux/servicio/GenericApi";

//-----[ REPORTES ]-----
import { Table as BTable, Container, Row, Col, Image, Button, Modal, Form } from "react-bootstrap";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { FiltroGlobal } from "../componentes/FiltroGlobal";
import MenuActualizar from "./MenuActualizar.js";
import toast, { Toaster } from "react-hot-toast";

//---[ TABLA SUCURSALES HELPERS ]-------------------------
  const columnHelper = createColumnHelper();

  const formatearFecha = (fecha) => {
    if (!fecha) return "Fecha no válida"; // Validar si la fecha es nula o indefinida  
    const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
  
    // Crear la fecha como local
    const [anio, mes, dia] = fecha.split("-");
    const date = new Date(anio, mes - 1, dia); // Meses comienzan en 0  
    if (isNaN(date)) return "Fecha no válida"; // Validar si la fecha es inválida  
    const diaSemana = diasSemana[date.getDay()]; 
    return `${diaSemana} ${dia}-${mes}-${anio}`;
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

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses comienzan en 0
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  };

//---[COMPONENTE PRINCIPALES]----------------------------------------------------------
  const ListadoMenus = () => {
      const [fechaInicio, setFechaInicio] = useState(obtenerFechaActual());
      const [fechaFin, setFechaFin] = useState(obtenerFechaActual());
      const [menus, setMenus] = useState([]); // Varibale de estado Menu para controlar el cambio de Activar / desactivar
           
      
  //---[ QUERY: OBTENER MENUS]----------------------------------
      const enviarDatos = () => {
        if (fechaInicio && fechaFin) {
          trigger({
            controller: "MenuController",
            accion: "LIXF",
            FI:fechaInicio,
            FF:fechaFin,
          });
        } else {
          console.error("Las fechas no son válidas");
        }
      };

      const [trigger, { data: ListaMenus, isSuccess: isListaMenus }] = useLazyObtmenusQuery();

      useEffect(() => {
        if (isListaMenus) {
          setMenus(ListaMenus); // Actualizar el estado local con la respuesta de la query
        }
      }, [ListaMenus, isListaMenus]);
    //-----------------------------------------------------------


    //---[ CAM PARA GUARDAR MENUS ]------------------------------
      const [enviardata, { data: Resp, isSuccess:isResp }] = useMenusMutation();
      const [menuscam, setMenuscam] = useState(null); // Estado para las órdenes

      useEffect(() => {  
        setMenuscam({
            controller: "MenuController",
            accion: "ACEST",
          });
      }, []);

      //---[ MENSAJE DE MUTACIÓN PARA INFORMACIOÓN DEL MENÚ ]---
      useEffect(() => {
        if (isResp) {
          if (Resp) {
            toast(Resp.E, {
              duration: 4000,
              position: "top-center",
              className: "toaststyle",
            });
          }
        }
      }, [isResp, Resp]);  

    //-----------------------------------------------------------


      //---[ MANEJANDO EL CAMBIO DE ESTADO ]
      const handleEstadoChange = (nuevoEstado, idRegistro) => {
        // Actualizar el estado del registro en la lista de menús
        const nuevaListaMenus = menus.map((menu) =>
          menu.IDMENU === idRegistro ? { ...menu, ACTI: nuevoEstado } : menu
        );
      
        // Actualizar el estado local
        setMenus(nuevaListaMenus);
      
        let enviardataApi = {
          ...menuscam,
          IDMENU: idRegistro,
          ACTI: nuevoEstado,
        };
        enviardata(enviardataApi);

      };

      const COL_MENU= [
        columnHelper.accessor("NF", {
          header: () => alineacion("text", "center", "No."),
          cell: (info) => alineacion("text", "center", info.row.index + 1), //NOMBRE
        }),
        columnHelper.accessor("NMENU", {
          header: () => alineacion("text", "left", "NOMBRE DEL MENÚ"),
          cell: (info) => alineacion("text", "left", info.renderValue()),
        }),
        columnHelper.accessor("COMENT", {
          header: () => alineacion("text", "left", "COMENTARIO"),
          cell: (info) => alineacion("text", "left", info.renderValue()),
        }),
        columnHelper.accessor("FPROGR", {
          header: () => alineacion("text", "center", "FECHA DE PROGRAMACIÓN"),
          cell: (info) => {
            const valor = info.renderValue();
            return alineacion("text", "Left", valor ? formatearFecha(valor) : "Sin fecha");
          },

        }),
        columnHelper.accessor("ACTI", {
          header: () => alineacion("text", "center", "ACTUALIZAR ESTADO"),
          cell: (info) => {
            const estadoActual = info.getValue(); // Obtener el valor actual del estado
            const idRegistro = info.row.original.IDMENU; // Obtener el ID del registro        
            return (
              <select
                value={estadoActual}
                onChange={(e) => handleEstadoChange(e.target.value, idRegistro)}
                style={{ width: "50%", textAlign: "center" }}
              >
                <option value="S">Activado</option>
                <option value="N">Desactivado</option>
              </select>
            );
          },
        }),
        columnHelper.accessor("ACT", {
          header: () => alineacion("text", "center", "ACTUALIZAR MENU"),
          cell: (info) => alineacion("ACT", "center", info.renderValue()),
        }),
      ];

      return (
        <>

            <div className="container mx-auto contenedor contenedorcentral">
            <div name="Titulo2" className="Titulo2" >LISTA DE MENÚS</div>

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
                {isListaMenus && (
                  <TablaReporte
                    IDEMPRE={'1'}
                    Filas={menus}
                    TIPOCOLUMNA={COL_MENU}
                    ETIQUETA="ORDENES"
                    COMPONENTE={MenuActualizar}
                  />
                )}
              </div>

            </div>

        </>
      );

  };

//---[COMPONENTE TABLA]----------------------------------------------------------
  const TablaReporte = ({IDEMPRE, Filas, TIPOCOLUMNA, ETIQUETA, COMPONENTE}) => {
    //---[CONTANTES]
    //const dispatch = useDispatch();
    //const useractivo = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;
    const [show, setShow] = useState(false); //-----[ PARA EL MODAL]
    const [numfila, setNumfila] = useState(null);
    const [NMENU, setNMENU] = useState(null); //-----[ PARA EL MODAL]
    const [FPROGR, setFPROGR] = useState(null); //-----[ PARA EL MODAL]
    const [COMENT, setCOMENT] = useState(null); //-----[ PARA EL MODAL]
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
      globalFilterFn: (row, columnId, filterValue) => {
        if (columnId === "FECREA") {
          const valorOriginal = row.getValue(columnId);
          const valorFormateado = formatearFecha(valorOriginal).toLowerCase();
          return valorFormateado.includes(filterValue.toLowerCase());
        }
        return String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase());
      },
    });

    const ObtModlal = (e, ROWID, NMENU, FPROGR, COMENT ) => {
      setNumfila(ROWID); //Fijar la fila de datos seleccionada. ACTUALIZAR
      setNMENU(NMENU) //Fijar el nomnre del menú de datos seleccionada.
      setFPROGR(FPROGR) //Fijar la fecha de datos seleccionada.
      setCOMENT(COMENT) //Fijar el comentario de datos seleccionada.
      setShow(true);
    };

    const closeModal = () => {
      setShow(false);
    };

    return (
      <div name="caja1" className="container mx-auto">
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
              <COMPONENTE
                IDMENU={numfila}              
                closeModal={closeModal}
                NOMBREMENU={NMENU}
                FECHAPROGRAMADA={FPROGR}   
                COMENTARIO={COMENT}             
              />
          </Modal.Body>
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
                            <td key={cell.id}
                              onClick={(e) => {
                                const IDMENU = row.original.IDMENU; // Accede a IDORD desde la fila actual
                                const NMENU = row.original.NMENU; // Accede a NMENU desde la fila actual
                                const FPROGR = row.original.FPROGR; // Accede a FPROGR desde la fila actual
                                const COMENT = row.original.COMENT; // Accede a FPROGR desde la fila actual
                                ObtModlal(e, IDMENU, NMENU, FPROGR, COMENT ); // Pasa el valor de IDORD a la función
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
        <Toaster />
      </div>
    );
  };

export default ListadoMenus;

