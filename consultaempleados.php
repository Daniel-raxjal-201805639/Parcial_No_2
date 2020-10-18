<?php

    require_once('conexion/conectar.php');

            $sql = "SELECT * FROM empleados";

            $resultado = mysqli_query($conectar,$sql);

            while ($row = mysqli_fetch_array($resultado)) {
                
                $json["data"][] = $row; 
            }
            echo json_encode($json);
?>