var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
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
            /*Aquí deben procesar el archivo y cargar la información en el contenedor especificado*/
            console.log(http_request.statusText);
            let lista = "";
            var xmldoc = http_request.responseXML;
            console.log(xmldoc);
            var root_node = xmldoc.getElementsByTagName('cancion');
            console.log(root_node);
            for (let i = 0; i < root_node.length; i++) {
                console.log(root_node[i]);
                lista += "<li>" + root_node[i].getAttribute("titulo")+"</li>";
            }
            document.getElementById("lista-canciones").innerHTML = lista;
            
            
        } else {
            console.log(http_request.statusText);
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.xml');
    }
}
