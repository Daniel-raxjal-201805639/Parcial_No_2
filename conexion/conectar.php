<?php

    $conectar = mysqli_connect('localhost','root','','parcial2');

    if (!$conectar) {
        die("fallo la conexion");
    } else {
        return $conectar->set_charset("utf8");
    }

    ?>
    