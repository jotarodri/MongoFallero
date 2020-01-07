let arraySecciones = new Set;
let tipoFalla;
let seccion;
let todas;
let anyoDesde;
let anyoHasta;

function filtrarFalla(cadena) {
    let valorTexto = document.querySelector('select').value;
    return cadena.properties.seccion.toUpperCase().startsWith(valorTexto);
}

function filtrarFallaInfantil(cadena) {
    let valorTexto = document.querySelector('select').value;
    console.log(valorTexto);
    return cadena.properties.seccion_i.startsWith(valorTexto);
}

function buscarResultadosPrincipales() {
    
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";


fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    
    console.log(myJson);
    
        const filtro = myJson.features.filter(filtrarFalla);
 
    filtro.forEach(falla => {
        
        let nombreFalla = falla.properties.nombre;
        
        let div = document.createElement("div");
        div.classList.add("falla");
        let imagen = document.createElement("img");
    
        let imagenFalla;
        let anyoFalla;

        let boton = document.createElement("button");

             imagenFalla = falla.properties.boceto;
             anyoFalla = falla.properties.anyo_fundacion;

        console.log(anyoFalla);
        
        if (anyoFalla >= anyoDesde && anyoFalla <= anyoHasta) {
            
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            imagen.src = imagenFalla;
            
            let divEstrellas = document.createElement("div");
            divEstrellas.classList.add("valoracion");
    
            for (let i = 0; i < 5; i++) {
                let estrella = document.createElement("button");
                let i = document.createElement("i");
                i.innerHTML = "★";
                estrella.appendChild(i);
                divEstrellas.appendChild(estrella);
                
            }
         
            div.appendChild(imagen);
            div.appendChild(divEstrellas);
            div.appendChild(boton);
            resultado.appendChild(div);
        }
            if (anyoDesde == "" && anyoHasta == "") {
                div.innerHTML = nombreFalla;
                div.classList.add("falla");
                imagen.src = imagenFalla;
                
        let boton = document.createElement("button");
        boton.coordenadas= element.geometry.coordinates;
        boton.addEventListener("click", crearCoordenadas);
        boton.innerText="Mostrar Ubicación";
        
                let divEstrellas = document.createElement("div");
                divEstrellas.classList.add("valoracion");
        
                for (let i = 0; i < 5; i++) {
                    let estrella = document.createElement("button");
                    let i = document.createElement("i");
                    i.innerHTML = "★";
                    estrella.appendChild(i);
                    divEstrellas.appendChild(estrella);
                    
                }
             
                div.appendChild(imagen);
                div.appendChild(divEstrellas);
                div.appendChild(boton);
                resultado.appendChild(div);
            }
           
        

    });
 
//tipoFalla = "";

//console.log(arraySecciones);
});

}

function mostrarUbicacion() {
   //  let coordenadas = convertirCoordenada(this.value);

   let divMapa = document.createElement('div');
   divMapa.setAttribute('id', 'map');
   document.querySelector('body').appendChild(divMapa);

   let altura = 600;
   let anchura = 500;
   console.log(window.screen.height);
   console.log(window.screen.width);
   let y = parseInt((window.screen.height / 2) - (altura / 2));
   let x = parseInt((window.screen.width / 2) - (anchura / 2));

   divMapa.style.left = x + 'px';
   divMapa.style.top = y + 'px';


   var map = L.map('map').
       setView([41.66, -4.72],
           14);

   L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
       maxZoom: 18
   }).addTo(map);

   L.control.scale().addTo(map);


}

function buscarResultadosInfantiles() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";


fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    
    console.log(myJson);
    
        const filtro = myJson.features.filter(filtrarFallaInfantil);
 
    filtro.forEach(falla => {
        
        let nombreFalla = falla.properties.nombre;
        
        let div = document.createElement("div");
        div.classList.add("falla");
        let imagen = document.createElement("img");
    
        let imagenFalla;
        let anyoFallaInfantil;

             imagenFalla = falla.properties.boceto_i;
             anyoFallaInfantil = falla.properties.anyo_fundacion_i;
        //console.log(imagenFalla);
        console.log(anyoFallaInfantil);
            
        if (anyoFallaInfantil >= anyoDesde && anyoFallaInfantil <= anyoHasta) {
            
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            imagen.src = imagenFalla;
            
            let divEstrellas = document.createElement("div");
            divEstrellas.classList.add("valoracion");
    
            for (let i = 0; i < 5; i++) {
                let estrella = document.createElement("button");
                let i = document.createElement("i");
                i.innerHTML = "★";
                estrella.appendChild(i);
                divEstrellas.appendChild(estrella);
                
            }
         
            div.appendChild(imagen);
            div.appendChild(divEstrellas);
            resultado.appendChild(div);
        }/*else{
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            imagen.src = imagenFalla;
            
            let divEstrellas = document.createElement("div");
            divEstrellas.classList.add("valoracion");
    
            for (let i = 0; i < 5; i++) {
                let estrella = document.createElement("button");
                let i = document.createElement("i");
                i.innerHTML = "★";
                estrella.appendChild(i);
                divEstrellas.appendChild(estrella);
                
            }
         
            div.appendChild(imagen);
            div.appendChild(divEstrellas);
            resultado.appendChild(div);
        }
*/
    
    });
 
//tipoFalla = "";

//console.log(arraySecciones);
});
}

function asignarFalla() {
    
tipoFalla=this.value;
console.log(tipoFalla);
if (tipoFalla == "Principal") {
    anyadirSeccionesPrincipales();    
}else{
    anyadirSeccionesInfantiles();    
}

}

function asignarSeccion() {
    
    seccion=this.value;
    console.log(seccion);
    if (tipoFalla == "Principal") {
        buscarResultadosPrincipales();
    }else{
        buscarResultadosInfantiles();

    }
    
}

function anyadirSeccionesPrincipales() {

    let select = document.getElementsByClassName("seccionFalla")[0];

    fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
     
    
        
        select.innerHTML = "";
        arraySecciones.clear();
        myJson.features.forEach(falla => {
           
            arraySecciones.add(falla.properties.seccion);

        });    
 
    let arraySeccionesOrdenadas = [];
    arraySecciones.forEach(seccion => {
    
    arraySeccionesOrdenadas.push(seccion);
    
    });
    

arraySeccionesOrdenadas.sort();
arraySeccionesOrdenadas.unshift("Elige una sección: ")
//console.log(arraySeccionesOrdenadas);
     
        arraySeccionesOrdenadas.forEach(seccion => {
            let option = document.createElement("option");
            option.text= seccion;
            select.add(option);
        });
    
    });
}

function anyadirSeccionesInfantiles() {
    let select = document.getElementsByClassName("seccionFalla")[0];

    fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {


        select.innerHTML = "";
        arraySecciones.clear();
        myJson.features.forEach(falla => {
           
            arraySecciones.add(falla.properties.seccion_i);

        });   
     
     
    let arraySeccionesOrdenadas = [];
    arraySecciones.forEach(seccion => {
    
    arraySeccionesOrdenadas.push(seccion);
    
    });
    
    let arraySeccionesOrdenadasInfantiles = [];
    arraySeccionesOrdenadasInfantiles = arraySeccionesOrdenadas.sort(comparar);
arraySeccionesOrdenadasInfantiles.unshift("Elige una sección: ")
//console.log(arraySeccionesOrdenadas);
     
        arraySeccionesOrdenadasInfantiles.forEach(seccion => {
            let option = document.createElement("option");
            option.text= seccion;
            select.add(option);
        });
    
    });
}

function comparar(a,b){return a - b}

var mapa, marker;

function crearMapa() {
    mapa = L.map('mapa').setView([0, 0], 1);
    marker = L.marker([0, 0]).addTo(mapa);

    L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=NVlvBbTlvbFWP7KKrFmF', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    }).addTo(mapa);


}

function coordenadas(coordenadas) {
    let primero = "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs";
    let segundo = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

    coordenadas = proj4(primero, segundo, coordenadas);
    coordenadas = [coordenadas[1], coordenadas[0]];
    mapa.setView(coordenadas, 16);

    if (marker) {
        mapa.removeLayer(marker);
    }
    marker = L.marker(coordenadas).addTo(mapa);
}

function crearCoordenadas() {
    coordenadas(this.coordenadas);
    document.getElementById("taparTodo").style.display = "block";
    //   document.getElementById("mapa").style.display="block";
    document.getElementById("mapa").style.opacity = 1;
    document.getElementById("mapa").style.zIndex = 2;
    document.querySelector("body").style.overflow = "hidden";
}

function salirMapa() {
    document.getElementById("taparTodo").style.display = "none";
    // document.getElementById("mapa").style.display="none";
    document.getElementById("mapa").style.zIndex = -2;
    document.getElementById("mapa").style.opacity = 0;
    document.querySelector("body").style.overflow = "scroll";
}



function init() {
    //anyadirSeccionesPrincipales();
   crearMapa();
    let radios = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("click",asignarFalla);
    }
    
    let seleccion = document.getElementsByClassName("seccionFalla")[0];
    seleccion.addEventListener("click",asignarSeccion);

    let desde = document.getElementById("desde");
    desde.addEventListener("input", function() {
        
        anyoDesde = desde.value;
       
        if ((anyoDesde > anyoHasta && anyoHasta !="" && anyoDesde!="")) {
            document.querySelector("alerta").classList.add("visible");
        }else{document.querySelector("alerta").classList.remove("visible");}

        if (tipoFalla == "Principal") {
            buscarResultadosPrincipales();
        }else{
            buscarResultadosInfantiles();
        }
    })

    let hasta = document.getElementById("hasta");
    hasta.addEventListener("input", function() {
        
        anyoHasta = hasta.value;
        
        if (anyoDesde > anyoHasta && anyoHasta !="" && anyoDesde!="") {
            document.querySelector("alerta").classList.add("visible");
        }else{document.querySelector("alerta").classList.remove("visible");}

        if (tipoFalla == "Principal") {
            buscarResultadosPrincipales();
        }else{
            buscarResultadosInfantiles();
        }

    })

    
    

   //buscarResultados();

   //document.querySelector('input[type="button"]').addEventListener("click",buscarResultados);
}

window.onload = init;