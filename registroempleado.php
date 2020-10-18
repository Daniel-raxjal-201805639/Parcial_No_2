<?php

   
$fun = $_POST['funcion'];

switch ($fun){
    case 'funedit': editar();
        break;
    case 'funregistrar': crear();
        break;
    case 'funeliminar':  eliminar();
        break;
}

function crear(){
    
    include_once('conexion/conectar.php');

    $codempleado = $_POST['codempleado'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $telmovil = $_POST['telmovil'];
    $puesto =$_POST['puesto'];
    $contrasenia = $_POST['contrasenia'];
    $direccion = $_POST['direccion'];
    $correo = $_POST['correo'];
    var_dump($_POST);

    $sql = "INSERT INTO empleados (codempleado,nombre,apellido,telmovil,puesto,contrasenia,direccion,correo) VALUES ('$codempleado','$nombre','$apellido','$telmovil','$puesto','$contrasenia','$direccion','$correo')";
    $resultado = mysqli_query($conectar,$sql);
        if ($resultado) {
            echo "<p class='text-success'>Se creo registro</p>";
        }else{
            echo "<p class='text-success'>No se ha podido registro</p>";
    }
}

function editar(){
    include_once("conexion/conectar.php");

    $codempleado = $_POST['codempleado'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $telmovil = $_POST['telmovil'];
    $puesto =$_POST['puesto'];
    $contrasenia = $_POST['contrasenia'];
    $direccion = $_POST['direccion'];
    $correo = $_POST['correo'];

$editar = $sqledit = "UPDATE empleados SET codempleado = '$codempleado',
                                                 nombre = '$nombre',
                                                 apellido = '$apellido',
                                                 telmovil = '$telmovil',
                                                 puesto = '$puesto',
                                                 contrasenia = '$contrasenia',
                                                 direccion = '$direccion',
                                                 correo = '$correo'
                                                WHERE codempleado = $codempleado ";
    mysqli_query($conectar,$sqledit);

if ($editar) {
    echo "<p class='text-success'>Se edito registro</p>";
}else{
    echo "<p class='text-danger'>No se edito registro</p>";
}
}

function eliminar(){
include_once('conexion/conectar.php');
$codempleado = $_POST['codempleado'];

$eliminar = $sqlelim = "DELETE FROM empleados WHERE codempleado = '$codempleado'";

mysqli_query($conectar,$sqlelim);

if ($eliminar) {
    echo("<p class='text-success'>Se elimino registro</p>");
}else{
    echo("<p class='text-danger'>No se elimino registro</p>");
}
}
?>