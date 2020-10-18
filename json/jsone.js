$(document).ready(function() {
    var table = $('#empleado').DataTable({

        language: 
        {
            "sProcessing":     "Procesando...",
                        "sLengthMenu":     "Mostrar _MENU_ registros",
                        "sZeroRecords":    "No se encontraron resultados",
                        "sEmptyTable":     "Ningún dato disponible en esta tabla =(",
                        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix":    "",
                        "sSearch":         "Buscar:",
                        "sUrl":            "",
                        "sInfoThousands":  ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst":    "Primero",
                            "sLast":     "Último",
                            "sNext":     "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        },
                        "buttons": {
                            "copy": "Copiar",
                            "colvis": "Visibilidad"
                        }
        },

            "ajax": {
                "url": "consultaempleados.php",
                "method" : "GET"
            },
            "columns": [
                { "data": "codempleado" },
                { "data": "nombre" },
                { "data": "apellido" },
                { "data": "telmovil" },
                { "data": "puesto" },
                { "data": "contrasenia" },
                { "data": "direccion" },
                { "data": "correo" },
                { "defaultContent": "<button type='button' class='editar btn btn-warning' data-toggle='modal' data-target='#editar' data-whatever='@mdo'><i class='far fa-edit'></i></button>"
             },
                { "defaultContent": "<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#eliminar' data-whatever='@mdo'><i class='far fa-trash-alt'></i></button>" }


            ]
    });
    setInterval(function(){
        table.ajax.reload(null,false); //user paging is not reser on reload
    }, 3000);
    editar("#empleado tbody", table);
        eliminar("#empleado tbody",table);
} );

$("#frmregistrar").submit(function(e){
    e.preventDefault();
    var fun="funregistrar"
    var codempleado = $("#code").val();
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var telmovil = $("#tel").val();
    var puesto = $("#pues").val();
    var contrasenia = $("#pass").val();
    var direccion = $("#dire").val();
    var correo = $("#correo").val();

    if (codempleado == '') {

        $("#lbno").html("<span style='color: red;'> Complete el campo codempleado</span>");
        $("#code").focus();
        return false;
        
    }
    $.ajax({
        url: "registroempleado.php",
        method: "POST",

        data:{"funcion":fun,"codempleado":codempleado,"nombre":nombre,"apellido":apellido,"telmovil":telmovil,"puesto":puesto,"contrasenia":contrasenia,"direccion":direccion,"correo":correo},

        success:function(data){

            $("#registrar").modal('hide');
            
            $("#respuesta").html(data);

            $("#frmregistrar").trigger('reset');
        }
    })

});

 //aqui comienza el boton Editar

 var editar = function(tbody,table) {
    $(tbody).on("click","button.editar",function() {
        var data = table.row($(this).parents("tr")).data();
        var codempleado = $("#code2").val(data.codempleado),
            nombre = $("#nombre2").val(data.nombre),
            apellido = $("#apellido2").val(data.apellido),
            telmovil = $("#tel2").val(data.telmovil),
            puesto = $("#pues2").val(data.puesto),
            contrasenia = $("#pass2").val(data.contrasenia),
            direccion = $("#dire2").val(data.direccion),
            correo = $("#correo2").val(data.correo);
            console.table(data);

    });
}

$("#frmeditar").submit(function(e) {
    e.preventDefault();
    var fun = "funedit";
    var codempleado = $("#code2").val();
    var nombre = $("#nombre2").val();
    var apellido = $("#apellido2").val();
    var telmovil = $("#tel2").val();
    var puesto = $("#pues2").val();
    var contrasenia = $("#pass2").val();
    var direccion = $("#dire2").val();
    var correo = $("#correo2").val();
    $.ajax({
        url: "registroempleado.php",
        method: "POST",
        data: {"funcion":fun,"codempleado":codempleado,"nombre":nombre,"apellido":apellido,"telmovil":telmovil,"puesto":puesto,"contrasenia":contrasenia,"direccion":direccion,"correo":correo},

        success: function(data){
            $("#editar").modal('hide');

            setTimeout(function(){
                $("#resultadoedit").html(data).fadeOut(5000);
            }, 1000);
        }
    });
})

//aqui comienza el boton eliminar
var eliminar = function(tbody, table){
    $(tbody).on("click", "button.eliminar",function(){
        var data = table.row($(this).parents("tr")).data();
        var codempleado = $("#code3").val(data.codempleado);
      
            console.table(data);
    });
}

$("#frmeliminar").submit(function(e){
    e.preventDefault();
    var fun = "funeliminar";
    var codempleado = $("#code3").val();

    $.ajax({
        url: "registroempleado.php",
        method:"POST",
        data: {"funcion":fun,"codempleado": codempleado},
        
        success: function(data){
            $("#eliminar").modal('hide');

            setTimeout(function(){
             $("#resultadoelim").html(data).fadeOut(5000);
            }, 1000);
        }
    });
}); 