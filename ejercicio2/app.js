var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML*/
            var jason = http_request.responseText;
            var lista = JSON.parse(jason);
            let arreglo = "";
            for (var i = 0; i < lista.length; i++) {
                console.log(lista[i].titulo);
                arreglo += "<li>" + lista[i].titulo + "</li>"

            }
            document.getElementById("lista-canciones").innerHTML = arreglo;
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.json');
    }
}
