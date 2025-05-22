

//---[CARGA DE REACT ]-----------------------------------------------------
 import React from "react";
 import ReactDOM from 'react-dom/client'; 

 //---[CARGA DE REDUX ] -----------------------------------------------------
  import { Provider } from "react-redux";
  import { store } from "./app/redux/store";

//---[CARGA DE APLICACIONES ]-----------------------------------------------
//import reportWebVitals from './reportWebVitals/reportWebVitals';
  import App from './app/App';


//---[CARGA DE CSS ]-------------------------------------------------
  import "bootstrap/dist/css/bootstrap.min.css";  
  import "./app/css/App.css";
  import "./app/css/Areatrabajo.css";
  import "./app/css/index.css";
  import "./app/css/Login.css";
  import "./app/css/MenuEmpresa.css";
  import "./app/css/principal.css";
  import "./app/css/TablasReportes.css";
  import "./app/css/Tabs.css";

/*
const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
deleteCookie("PHPSESSID");
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
