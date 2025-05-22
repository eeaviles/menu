import { Fragment, useEffect, useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../css/Login.css";

//-----[REDUX]-------------------------------------------------------------
import { useSelector } from "react-redux";
import { loginSelector } from "../redux/slices/LoginSlice";
import { useAuthLoginMutation } from "../redux/servicio/apiLogin";
//-------------------------------------------------------------------------

const Login = () => {
  console.log("Desde Login");  

  //---[CONSTANTES]----------------------------------------------------------
  const [registrodatos, setRegistrodatos] = useState();
  let temp4 = "";

  //-----[ RTK QUERY ]---------------------------------------------------------
  const [enviardata, {data}] = useAuthLoginMutation();
  const { login, logout} = useSelector(loginSelector);
  //-----------------------------------------------------------------------

  const useractivo = JSON.parse(sessionStorage.getItem("SESIONUSER")) || null;  

  const navigate = useNavigate();
  const [usuarionovalido, setUsuarionovalido] = useState(false);
  const [passwordnovalido, setPasswordnovalido] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.sesionUser) {
        sessionStorage.setItem("SESIONUSER", JSON.stringify(data.sesionUser));
        setUsuarionovalido(false);
        setPasswordnovalido(false);
        navigate("/areatrabajo");
      }

      if (data.nouser) {
        //console.log(data.nouser);
        setUsuarionovalido(true);
        setPasswordnovalido(false);
        setRegistrodatos((prev) => ({
          ...prev,
          passwd: "", // Limpiar el campo passwd
        }));
      }

      if (data.nopass) {
        //console.log(data.nopass);
        setUsuarionovalido(false);
        setPasswordnovalido(true);
        setRegistrodatos((prev) => ({
          ...prev,
          passwd: "", // Limpiar el campo passwd
        }));
      }

      if (data.salir) {
        sessionStorage.removeItem("SESIONUSER");
        navigate(0);
      }
    }
  }, [navigate, data]);
  
  //--[ FUNCIONES ]

  function salir(){
    let enviardataApi = {
      controller: logout.controller,
      accion: logout.accion,
    };
    enviardata(enviardataApi);
    sessionStorage.removeItem("SESIONUSER"); // Agregado Elimina la sesión al salir
  }

    function continuar(){
      navigate("/areatrabajo");
    }  

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    registrodatos["passwd"] = CryptoJS.SHA256(registrodatos.passwd).toString(CryptoJS.enc.Hex);
    let enviardataApi = {
      controller: login.controller,
      accion: login.accion,
      ...registrodatos,
    };
    e.target.reset();
    enviardata(enviardataApi);
    //toast.remove();
  };

    const inputvalue = (v) => {
      let temp5 = "";
      temp5 = registrodatos?.[v] ? registrodatos?.[v] : "";
      return temp5;
    };

    function cambiosForm(e) {
      setRegistrodatos({
        ...registrodatos,
        [e.target.name]: e.target.value,
      });
    }


  //---

  return (
    <Fragment>
      {!useractivo ? (
        <div className="d-flex justify-content-center align-items-center w-500 DivContentLogin">
          <Card
            className="cardlogin"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src={process.env.PUBLIC_URL + "/img/logos/Menu_512x512.png"}
              width="128"
              height="128"
              roundedCircle
              alt="Logo GPA"
            />
            <hr className="hrLogin" />

            <Card.Body>
              <Card.Title className="mx-auto">Introduzca sus datos</Card.Title>
              <Form onSubmit={handleSubmit} method="POST">
                <Form.Label style={{ fontSize: "0.8rem" }}>Login:</Form.Label>
                {usuarionovalido && (
                  <div className="labelerror">{data?.nouser}</div>
                )}
                <div className="input-group mb-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Digite su login"
                    className="formlogin "
                    name="login"
                    value={(() => {
                      temp4 = inputvalue("login");
                      return temp4;
                    })()}
                    onChange={(e) => {
                      cambiosForm(e);
                    }}
                  />
                  <span className="input-group-text iconologin"></span>
                </div>

                <Form.Label style={{ fontSize: "0.8rem" }}>
                  Password:
                </Form.Label>
                {passwordnovalido && (
                  <div className="labelerror">{data?.nopass}</div>
                )}
                <div className="input-group mb-3">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Digite su password"
                    className="formlogin"
                    name="passwd"
                    value={(() => {
                      temp4 = inputvalue("passwd");
                      return temp4;
                    })()}
                    onChange={(e) => {
                      cambiosForm(e);
                    }}
                  />
                  <span className="input-group-text iconopasswd"></span>
                </div>

                <br />
                <Button variant="flat" size="xxl" type="submit">
                  Enviar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center DivContentLogin">
          <Card
            className="cardlogin"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src={process.env.PUBLIC_URL + "/img/logos/Menu_512x512.png"}
              width="128"
              height="128"
              roundedCircle
              alt="Logo GPA"
            />
            <hr className="hrLogin" />
            <Card.Body>
              <Card.Title className="mx-auto text-center">
                {" "}
                Usted accedió al sistema como:
              </Card.Title>
              <Card.Img
                variant="top"
                src={process.env.PUBLIC_URL + "/img/fotos/" + useractivo.FOTO}
                className="rounded-circle mx-auto d-block perfilImage"
                alt="Imagen Perfil"
              />
              <Card.Text className="mx-auto text-center">
                {useractivo.USERNAME}
              </Card.Text>

              <div
                className="d-grid gap-2"
                style={{ margin: "auto", width: "75%" }}
              >
                <Button
                  variant="flat"
                  size="xxl"
                  className="botones"
                  type="button"
                  onClick={() => salir()}
                >
                  Salir
                </Button>
                <Button
                  variant="flat"
                  size="xxl"
                  className="botones"
                  type="button"
                  onClick={() => continuar()}
                >
                  Continuar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </Fragment>
  );

};

export default Login;
