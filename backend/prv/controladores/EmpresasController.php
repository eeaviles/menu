<?php
class EmpresasController{
	private $objempresa;

	public function __construct($db){		
        $this->objempresa = new Empresas($db);         
        $this->objEmpresaContactoscontroller = new EmpresasContactosController($db);
        $this->objSucursalesController = new SucursalesController($db);
        $this->objCat019Controller = new Cat019Controller($db); 	
        $this->objEmpCat019Controller= new EmpCat019Controller($db);
        /*
        $this->objempresascontactos = new EmpresasContactos();	
        $this->objProveedores = new Proveedores();
        $this->objClientes = new Clientes();	

        
        */
    }

    public function accion($data){        
       
        switch ($data['accion']) {   
            case "agregar";
                return $this->AgregarEmpresa($data);
            break;
            case "LIXXID";
                return $this->ListarEmpresaxid($data);
            break;
            case "actualizar";
                return $this->ActualizarEmpresa($data);
            break;
    /*                 
            case "listar";
                return $this->ListarEmpresas($data);
            break;   
  
            case "LIPRINC";
                return $this->ListarEmpresaxid($data);
            break;
         

            case "LXIDEXN"; //Lista de proveedores, pero la empresa del ID pasado no dedeberá ser incluida en el resultado
                return $this->ListarEmpresasXIDEXN($data);
            break;                
            case "LXIDUSER";
                return $this->ListarEmpresasXIDUSER($data); //LISTAR EMPRESAR CON ID USER
            break;    
            case "LIFS";
                return $this->ListarForSelect($data);
            break;
    */           
            default:
                echo "NO EXISTE LA ACCIÓN SOLICITADA";
        }
    }

    private function ListarEmpresaxid($d){
        $this->objempresa->setId_empresa( $d['ID']);
        return $this->objempresa->listarempresaxid();
    }//FUNCIONAL PARA VistaPrincipalEmpresa.js  
  
    private function AgregarEmpresa($data){
        $ReturnMjeobjProveedores='';
        $ReturnMjeobjClientes='';
        $codproveedor='';
        $codcliente='';
        $primaria='';
        $secundaria='';
        $terciaria='';
        $proveclien = '';
        $c_empreprincipal = '';
        $IDCAT9='2';//SUCURSAL SOLO PARA EMPRESA PRINCIPAL
        $proveclien= 'E';
        $c_empreprincipal = 'S';
       
        //---[ LLENADO DE CAMPOS DE LATABLA EMPRESA ]-----
        $temp=rand(100000,1000000);
        $temp=substr($temp,0,6);
        $codproveedorcliente=$proveclien.'-'.date("Ymd").'-000'.$temp;
        $this->objempresa->setVc_codempresa($codproveedorcliente);
        $this->objempresa->setC_empreprincipal($c_empreprincipal);   
        $this->objempresa->setC_proveclien($proveclien);  
        $this->objempresa->setVc_tipo($data['TIPOEMPRESA']);
        $this->objempresa->setVc_razonsocial($data['RAZSOC']);
        $this->objempresa->setVc_nombre($data['NEMPRE']);  
        $this->objempresa->setVc_logo('empresaimagen256.png');
        $this->objempresa->setVc_girocomercio($data['GIRO']);
        $this->objempresa->setVc_nit($data['NIT']);
        $this->objempresa->setVc_nrc($data['NRC']);
        $this->objempresa->setC_clascontribuyente('P'); //---[ Clase de Contibuyente Todos pequeños dato fijo ]
        $this->objempresa->setVc_pais(''); //---[ ESTE REGISTRO SE ESTA ALMACENANDO EN SUCURSAL ]
        $this->objempresa->setVc_correo($data['EMAIL']);
        $this->objempresa->setVc_webpage($data['WEBP']);    
        $this->objempresa->setT_dirprincipal($data['UBI']);
        $this->objempresa->setT_dirfactura($data['UBI']);
        $this->objempresa->setT_dircobro($data['UBI']);
        $this->objempresa->setVc_codpostalpago('1101');//---[OJO]--> Revisar este valor
        $this->objempresa->setVc_empresatel($data['TEL']);   
        $this->objempresa->setT_descripcion($data['COMEADIC']);
        /* CREADOS POR SISTEMA */
        $this->objempresa->setD_registro(date("Y-m-d"));
        $this->objempresa->setC_activo('S');

        $ultimoidagrearempresas = $this->objempresa->agregarempresa();       

        if($ultimoidagrearempresas){            
            //---[ LLENADO DE CAMPOS DE LA TABLA CONTACTO EMPRESA ]-----$ArrayTag = array( );
                $fecha=date("Y-m-d");

                $ArrayTag = array( 
                    'accion'=> 'AG',
                    'IDEMPRESA'=>$ultimoidagrearempresas,
                    'CPRINC'=>$data['CPRINC'],
                    'CDUI'=>$data['CDUI'],                
                    'CEMAIL'=>$data['CEMAIL'],
                    'CTEL'=>$data['CTEL'],
                    'CCARGO'=>$data['CCARGO'],
                    'CAREA'=>$data['CAREA'],                
                    'CDESCRIP'=>$data['CDESCRIP'],
                    'FREG'=>date("Y-m-d"),
                    'CACT'=>'S'
                );
                $RespText_objEmpresaContactoscontroller = $this->objEmpresaContactoscontroller->accion($ArrayTag );//"EmpresasContactos"
            //----------------
        
            //---[ LLENADO DE CAMPOS DE LA TABLA SUCURSAL ]-----
                $ArrayTag = array(
                    'accion'=> 'AG',
                    'IDEMP'=>$ultimoidagrearempresas,
                    'IDCAT9'=>$IDCAT9, //Tipo de establecimeinto es Casa Matriz por defecto cuando se registra por primera ves
                    'IDCAT13'=>$data["IDCAT13"],
                    'IDCAT12'=>$data["IDCAT12"],
                    'IDCAT20'=>$data["IDCAT20"],
                    'CODSUC'=>$data["CODSUC"],
                    'NOMBRE'=>$data['NOMBRE'],
                    'UBI'=>$data["UBI"],
                    'TEL'=>$data["TEL"],
                );
                $RespText_objSucursalesController=$this->objSucursalesController->accion($ArrayTag);//"Sucursales"
            //----------------

            // DATOS PARA AGREGAR ACTIVIDADEDES ECONOMICAS DE LA EMPRESA            
                if (strpos($data['primaria'], ':') !== false) {
                    list($primariaCode, $primariaValor)=explode(":",$data['primaria']);
                    $ArrayTag = array('accion'=> 'listXCODE','CODE'=>$primariaCode);
                    $IDacteco_primaria = $this->objCat019Controller->accion($ArrayTag);
                    $ArrayTag = array(
                    'accion'=> 'AG',
                    'IDEMP'=>$ultimoidagrearempresas, 
                    'IDCAT019'=>$IDacteco_primaria['IDCAT019'], 
                    'NOMBRE'=>'primaria'
                    );
                    $Resptemp = $this->objEmpCat019Controller->accion($ArrayTag);
                }
            
                if (strpos($data['secundaria'], ':') !== false) { 
                    list($secundariaCode, $secundariaValor)=explode(":",$data['secundaria']);            
                    $ArrayTag = array('accion'=> 'listXCODE','CODE'=>$secundariaCode);

                    $IDacteco_secundaria = $this->objCat019Controller->accion($ArrayTag);
                    $ArrayTag = array('accion'=> 'AG','IDEMP'=>$ultimoidagrearempresas, 
                    'IDCAT019'=>$IDacteco_secundaria['IDCAT019'], 'NOMBRE'=>'secundaria' );
                    $Resptemp = $this->objEmpCat019Controller->accion($ArrayTag);            
                }

                if (strpos($data['terciaria'], ':') !== false) {
                    list($terciariaCode, $terciariaValor)=explode(":",$data['terciaria']);
                    $ArrayTag = array('accion'=> 'listXCODE','CODE'=>$terciariaCode);
                    $IDacteco_terciaria = $this->objCat019Controller->accion($ArrayTag);
                    $ArrayTag = array('accion'=> 'AG','IDEMP'=>$ultimoidagrearempresas, 
                    'IDCAT019'=>$IDacteco_terciaria['IDCAT019'], 'NOMBRE'=>'terciaria' );
                    $Resptemp = $this->objEmpCat019Controller->accion($ArrayTag);
                }
            
        }
        
        $mensaje = ['E'=>'DATOS AGREGADOS CORRECTAMENTE'];
        return $mensaje;
        
    }//FUNCIONAL PARA EditarEmpresas.js
    
    private function ActualizarEmpresa($data){
        $ReturnMjeobjProveedores='';
        $ReturnMjeobjClientes='';
        $codproveedor='';
        $codcliente='';
        $primaria='';
        $secundaria='';
        $terciaria='';
        $proveclien = '';
        $c_empreprincipal = '';
        $IDCAT9='2';

        //---[ LLENADO DE CAMPOS DE LATABLA EMPRESA ]-----
        $this->objempresa->setId_empresa($data['IDEMPRE']);
        $this->objempresa->setVc_tipo($data['TIPOEMPRESA']);
        $this->objempresa->setVc_razonsocial($data['RAZSOC']);
        $this->objempresa->setVc_nombre($data['NEMPRE']);  
        $this->objempresa->setVc_girocomercio($data['GIRO']);
        $this->objempresa->setVc_nit($data['NIT']);
        $this->objempresa->setVc_nrc($data['NRC']);
        $this->objempresa->setC_clascontribuyente('P'); //---[ Clase de Contibuyente Todos pequeños dato fijo ]
        $this->objempresa->setVc_pais(''); //---[ ESTE REGISTRO SE ESTA ALMACENANDO EN SUCURSAL ]
        $this->objempresa->setVc_correo($data['EMAIL']);
        $this->objempresa->setVc_webpage($data['WEBP']);    
        $this->objempresa->setT_dirprincipal($data['UBI']);
        $this->objempresa->setT_dirfactura($data['UBI']);
        $this->objempresa->setT_dircobro($data['UBI']); 
        $this->objempresa->setVc_codpostalpago('1101');//---[OJO]--> Revisar este valor
        $this->objempresa->setVc_empresatel($data['TEL']);   
        $this->objempresa->setT_descripcion($data['COMEADIC']);
        /* CREADOS POR SISTEMA */
        $this->objempresa->setD_actualizacion(date("Y-m-d"));
        $temp_Actualizado = $this->objempresa->actualizarempresa();        
        
        if($temp_Actualizado){            
        //---[ LLENADO DE CAMPOS DE LA TABLA CONTACTO EMPRESA ]
            $ArrayTag = array( 
                'accion'=> 'AC',
                'CIDEMPRESA'=>$data['CIDEMPRESA'], 
                'IDEMPRESA'=>$data['IDEMPRE'],
                'CPRINC'=>$data['CPRINC'],
                'CDUI'=>$data['CDUI'],
                'CEMAIL'=>$data['CEMAIL'],
                'CTEL'=>$data['CTEL'],
                'CCARGO'=>$data['CCARGO'],
                'CAREA'=>$data['CAREA'],                
                'CDESCRIP'=>$data['CDESCRIP'],
                'FACT'=>date("Y-m-d"),
                'CACT'=>'S'
            );
            $RespText_objEmpresaContactoscontrolle = $this->objEmpresaContactoscontroller->accion($ArrayTag );

        //------------

        //---[ LLENADO DE CAMPOS DE LA TABLA SUCURSAL ]-----            
            $ArrayTag = array(
                'accion'=> 'AC',
                'IDSUC'=>$data['IDSUC'],
                'IDEMPRE'=>$data['IDEMPRE'],
                'IDCAT9'=>$IDCAT9, //Tipo de establecimeinto es Casa Matriz por defecto cuando se registra por primera ves
                'IDCAT13'=>$data["IDCAT13"],
                'IDCAT20'=>$data["IDCAT20"],
                'CODSUC'=>$data["CODSUC"],
                'NOMBRE'=>$data['NOMBRE'],
                'UBI'=>$data["UBI"],
                'TEL'=>$data["TEL"],
            );
            $tempOteSucursal=$this->objSucursalesController->accion($ArrayTag);

        //----------------            

        // DATOS PARA AGREGAR ACTIVIDADEDES ECONOMICAS DE LA EMPRESA 
            //CREADAS POR POST            
            if (strpos($data['primaria'], ':') !== false) {
                list($primariaCode, $primariaValor)=explode(":",$data['primaria']);

                $ArrayTag = array(
                    'accion'=> 'listXCODE',
                    'CODE'=>$primariaCode
                );
                $IDCAT019_primaria = $this->objCat019Controller->accion($ArrayTag);
                
                $ArrayTag = array(
                    'accion'=> 'AC',
                    'IDEMP'=>$data['IDEMPRE'], 
                    'IDCAT019'=>$IDCAT019_primaria['IDCAT019'], 
                    'NOMBRE'=>'primaria' 
                );
                $Resptemp = $this->objEmpCat019Controller->accion($ArrayTag);
            }
     
            if (strpos($data['secundaria'], ':') !== false) { 
                list($secundariaCode, $secundariaValor)=explode(":",$data['secundaria']);

                $ArrayTag = array(
                    'accion'=> 'listXCODE',
                    'CODE'=>$secundariaCode
                );
                $IDCAT019_secundaria = $this->objCat019Controller->accion($ArrayTag);

                $ArrayTag = array(
                    'accion'=> 'AC',
                    'IDEMP'=>$data['IDEMPRE'], 
                    'IDCAT019'=>$IDCAT019_secundaria['IDCAT019'], 
                    'NOMBRE'=>'Secundaria' 
                );
                $Resptemp = $this->objEmpCat019Controller->accion($ArrayTag);            
            }
  
            if (strpos($data['terciaria'], ':') !== false) {
                list($terciariaCode, $terciariaValor)=explode(":",$data['terciaria']);
                $ArrayTag = array(
                    'accion'=> 'listXCODE',
                    'CODE'=>$terciariaCode
                );
                $IDCAT019_terciaria = $this->objCat019Controller->accion($ArrayTag);
                $ArrayTag = array(
                    'accion'=> 'AC',
                    'IDEMP'=>$data['IDEMPRE'], 
                    'IDCAT019'=>$IDCAT019_terciaria['IDCAT019'], 
                    'NOMBRE'=>'Terciaria' 
                );
                $Resptemp = $this->objEmpCat019Controller->accion($ArrayTag);
            }
       
        }
        
        $mensaje = ['E'=>'DATOS AGREGADOS CORRECTAMENTE'];
        return $mensaje;
        
    }//FUNCIONAL PARA EditarEmpresas.js







//-------------------------------------------------------------------
//-------------------------------------------------------------------



























    private function ActualizarEmpresa2($data){ 
        //----[  OJO CON LOS DATOS PARA GUARDAR EN TABLAS PROVEEDRO O CLIENTES ]
        //----[ EL CÓDIGO DE LA EMPRESA NO SE ESTA ACTUALIZANDO DESDE EL FORMULARIO? ]  
        /*CREADOS POR _POST*/
            $this->objempresa->c_proveclien = $data['PROVCLIEN'];
            $this->objempresa->vc_tipo = $data['TIPOEMPRESA'];
            $this->objempresa->id_empresa = $data['IDEMPRE'];
            $this->objempresa->vc_razonsocial = $data['RAZSOC'];
            $this->objempresa->vc_nombre = $data['NEMPRE'];        
            $this->objempresa->vc_girocomercio = $data['GIRO'];
            $this->objempresa->vc_nit = $data['NIT'];
            $this->objempresa->vc_nrc = $data['NRC'];
            //$this->objempresa->vc_pais = $data['PAIS']; 
            $this->objempresa->vc_correo = $data['EMAIL'];
            $this->objempresa->vc_webpage = $data['WEBP'];
            //$this->objempresa->t_dirprincipal = $data['DIRPRI'];
            //$this->objempresa->vc_codpostalpago = $data['CODPOS'];
            //$this->objempresa->vc_empresatel = $data['TELEMP'];
            $this->objempresa->t_descripcion = $data['COMEADIC'];   
        /*CREADOS POR SISTEMA*/
            $this->objempresa->d_actualizacion = date("Y-m-d");
            $this->objempresa->c_activo = 'S';
        /* DATOS PAR ACTUALIZAR TABLA CONTACTOS EMPREAS */
            $this->objempresascontactos->id_empresacontacto=$data['CIDEMPRESA'];
            $this->objempresascontactos->id_empresa=$data['IDEMPRE'];
            $this->objempresascontactos->vc_nombre = $data['CPRINC'];
            $this->objempresascontactos->vc_dui = $data['CDUI'];
            $this->objempresascontactos->vc_correo = $data['CEMAIL'];
            $this->objempresascontactos->vc_puestotrabajo = $data['CCARGO'];
            $this->objempresascontactos->vc_area = $data['CAREA'];
            $this->objempresascontactos->vc_telefono = $data['CTEL'];
            $this->objempresascontactos->t_descripcion = $data['CDESCRIP'];
        /*CREADOS POR SISTEMA*/
            $this->objempresascontactos->d_actualizacion=date("Y-m-d");
            $this->objempresascontactos->c_activo='S';      
        /*SALIDA*/
            $Resptemp = $this->objempresascontactos->actualizar();
            $Resptemp = $this->objempresa->actualizarempresa();        

        /* DATOS PARA SALVAR SÍ ES PROVEEDOR O CLIENTE */
       /*
        if($data['PROVCLIEN']==='P'){           
            
            $this->objProveedores->id_proveedor=$data['IDPROVE'];       
            $this->objProveedores->id_empresa=$data['IDEMPRE'];
            $this->objProveedores->vc_tipo=$data['TIPOEMPRESA'];   
            $this->objProveedores->t_descripcion=$data['COMEADIC'];
                 
            $this->objProveedores->d_actualizacion=date("Y-m-d");
            $this->objProveedores->c_activo='S'; 
            $ReturnMjeobjProveedores=$this->objProveedores->actualizarproveedores(); // OJO POR CA  DEGUIMOS ACTUALIZAR PROVEEDORES Y CLIENTES
        }else{

            $this->objClientes->id_cliente=$data['IDCLI']; 
            $this->objClientes->id_empresa=$data['IDEMPRE'];            
            $this->objClientes->vc_tipo=$data['TIPOEMPRESA']; 
            $this->objClientes->t_descripcion=$data['COMEADIC'];   
   
            $this->objClientes->d_actualizacion=date("Y-m-d");
            $this->objClientes->c_activo='S';             
            $ReturnMjeobjClientes=$this->objClientes->actualizarclientes();
    
        }
        */  
        echo json_encode($Resptemp);

    }//FUNCIONAL PARA EditarEmpresas.js

    private function ListarEmpresas($data){
        $Resptemp = $this->objempresa->listarempresas();
        echo json_encode($Resptemp);
    }//FUNCIONAL PARA ListarEmpresas.js

    private function ListarEmpresasXIDEXN($d){    
        $nombretable='';  
        $Resptemp = $this->objempresa->listarempresasxidexn($d['S']);
        echo json_encode($Resptemp);
    }//FUNCIONAL PARA ListarEmpresas.js

    private function ListarEmpresasXIDUSER($d){ // verificar esta función
        $this->objempresa->id_usuario=$d['ID'];
        $this->objempresa->c_activo='S';
        $Resptemp = $this->objempresa->listarempresasxiduser();
        //print_r(json_encode($Resptemp));
        echo json_encode($Resptemp);
    }//FUNCIONAL DESDE DetallesComprasPDF.js

    private function ListarForSelect($d){
        $Resptemp = $this->objempresa->listarforselect();
        echo json_encode($Resptemp);
    }//FUNCIONAL PARA AccionesProveedores.js
}

?>