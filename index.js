//https://www.youtube.com/watch?v=W3KcalhYkaM

var app = angular.module("shop", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "cajero.html",
            controller: "controlador"
        })
        .when("/productos", {
            templateUrl: "productos.html",
            controller: "controlador"
        });
})

app.controller("controlador", function ($scope) {
    idPdct = 2;
    idCrrt = 1;

    $scope.productos = [{
            id: 1,
            nombre: "Agua",
            precio: 12.00
        },
        {
            id: 2,
            nombre: "Cafe",
            precio: 5.00
        }
    ];

    $scope.carrito = [];

    $scope.addProducto = function () {


        var nombre = $scope.nombre;
        var precio = $scope.precio;
        //Control de parametros
        if (nombre != "" && precio != "") {
            console.log("los nombres son validos");
            idPdct++;
            $scope.productos.push({
                id: idPdct,
                nombre: nombre,
                precio: precio
            });
        } else {
            console.log("los nombres no son váliudos");
        }
    }

    $scope.addCarrito = function () {

        var id = $scope.productoSeleccionado;
        //Con esto lo que hacemos es cuando el usuario ha seleccionado un opcion del select en el value hay un id que hemos puesto
        //Entonces lo que recibiremos en la variable id sera el id en cuestio que le usuario ha elegido y lo que ahremos despues será
        //buscar el JSON de productos el objeto en cuestión que contenga el id que le usuario ha seleccionado.
        //Por ejemplo si el usuario ha elegidso cafe tendra de value 2 y lo que hara será buscar y devolver todo el objeto que contenga el id = 2.
        //Y nos guardaremos toso el resultado en la variable producto
        var producto = $scope.productos.find(function (obj) {
            return obj.id == id;
        });
        var cantidad = $scope.cantidad;

        //Control de parametros

        if (producto != undefined && cantidad > 0) {
            console.log("los nombres son validos");
            idCrrt++;
            $scope.carrito.push({
                id: idCrrt,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: $scope.cantidad,
                total: producto.precio * cantidad
            });
        } else {
            console.log("los nombres no son válidos");
        }
    }

    //Nos devuelve la suma del parametro total del JSON carrito
    $scope.getTotalCarrito = function () {
        var total = 0;
        $scope.carrito.forEach(x => {
            total += x.total;
        });

        return total;
    }
});