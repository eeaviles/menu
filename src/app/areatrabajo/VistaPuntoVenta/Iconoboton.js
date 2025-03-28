import { React} from "react";
import {Image,  } from "react-bootstrap";

const Iconoboton = ({ nombreimagen }) => { 
  return (
    <>
      <div className="d-flex justify-content-center">
        <Image
          width="50"
          height="50"
          className="fotoperfil"
          roundedCircle
          alt="Platos Fuertes"
          src={process.env.PUBLIC_URL + "/img/iconos/" + nombreimagen}
        />
      </div>
    </>
  );
};

export default Iconoboton;
