import { useEffect } from "react";
import { Navbar, Button, Image } from "react-bootstrap";


//-----[REDUX]
import { useSelector } from "react-redux";
import { loginSelector} from "../redux/slices/LoginSlice";
import { useAuthLoginMutation } from "../redux/servicio/apiLogin";

//-----[ EACT-ROUTER-DOM ]
import { useNavigate } from "react-router-dom";

const Cabecera = () => {
  console.log("HOLA DESDE CABECERA");
   //const useractivo = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;
  //-----[ EACT-ROUTER-DOM ]
  const navigate = useNavigate();

  //-----[ REDUX ]
  const [enviardata, { data }] = useAuthLoginMutation();
  const { logout } = useSelector(loginSelector);

  //-----[ INICIO ]
    useEffect(() => {
      if (data) {
        if (data.salir) {
          sessionStorage.removeItem("SESIONUSER");
          navigate(0);
        }
      }
    }, [data, navigate]);

  //-----[ FUNCIONES ]
  function salir() {
    let enviardataApi = {
      controller: logout.controller,
      accion: logout.accion,
    };
    enviardata(enviardataApi);
  }

  const useractivo = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;
  console.log(useractivo);
  const foto = "/img/fotos/" + useractivo.FOTO;

  return (
    <Navbar collapseOnSelect expand="lg" className="NB_head">
      <Navbar.Brand className="me-auto" sm={6} md={6}></Navbar.Brand>
      <div sm={6} md={6}>
        <Image
          alt=""
          className="fotocabecera"
          src={process.env.PUBLIC_URL + foto}
          width="30"
          height="30"
          roundedCircle
        />
        <Button variant="cabecera NB_text" size="xxl" type="button">
          Usuario:{" " + useractivo.USERNAME}{" "}
        </Button>
        <Button variant="cabecera NB_text" size="xxl" type="button">
          Rol:{" " + useractivo.ROL}{" "}
        </Button>
        <Button
          variant="flat NB_text"
          size="xxl"
          type="button"
          onClick={() => salir()}
        >
          Salir
        </Button>
      </div>
    </Navbar>
  );
}

export default Cabecera

