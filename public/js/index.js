//import { create } from "../app/controllers/puntuacion.controller";

let arraySecciones = new Set;
let tipoFalla;
let seccion;
let todas;
let nombreFalla;
let ubicacionFalla;
let imagenFalla;
let anyoFundacion;
let anyoDesde;
let anyoHasta;
let ipFalla;
let datos;
let todoMongo;

        let anyoFalla;

function filtrarFalla(cadena) {
    let valorTexto = document.querySelector('select').value;
    return cadena.properties.seccion.toUpperCase().startsWith(valorTexto);
}

function filtrarFallaInfantil(cadena) {
    let valorTexto = document.querySelector('select').value;
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
    
    datos = myJson;
    console.log(datos)
        const filtro = myJson.features.filter(filtrarFalla);
 
   filtro.forEach(falla => {
    nombreFalla = falla.properties.nombre;
    ipFalla = falla.properties.id;

    if (tipoFalla=="Infantil") {
        imagenFalla = falla.properties.boceto_i;
        anyoFalla = falla.properties.anyo_fundacion_i;
    }else{
        imagenFalla = falla.properties.boceto;
        anyoFalla = falla.properties.anyo_fundacion;
    }
       
       

        let div = document.createElement("div");
        div.classList.add("falla");
        let imagen = document.createElement("img");
        let boton = document.createElement("button");

            
             console.log(anyoFalla);
        
       

        if ((anyoDesde === undefined || anyoHasta === undefined)||(anyoDesde == "" || anyoHasta === "")) {
               
            div.classList.add("falla");
            div.innerHTML = nombreFalla;
            div.dataset.idFalla = falla.properties.id;
            div.dataset.vecesVotada = 0;
            imagen.src = imagenFalla;

            boton.addEventListener("click",mostrarUbicacion);
            boton.innerText="Mostrar Ubicación";
        
            let formulario = document.createElement("form");
             formulario.method = "POST";
    

            let p = document.createElement("p");
            p.classList.add("clasificacion");

            let inputHidden = document.createElement("input");
            inputHidden.setAttribute('type', 'radio');

            for (let i = 5; i >= 1; i--) {

            let labelEstrella = document.createElement("label");
            labelEstrella.innerHTML = "★";
            labelEstrella.addEventListener("click",establecerPuntuacion);
            labelEstrella.value = i;
            formulario.appendChild(labelEstrella);

            }

            p.appendChild(formulario);

            div.appendChild(imagen);
            div.appendChild(p);
            div.appendChild(boton);
            resultado.appendChild(div);

            establecerMedias(div);
    }if (anyoDesde<=anyoFalla  && anyoHasta >= anyoFalla){
        div.classList.add("falla");
        div.innerHTML = nombreFalla;
        div.dataset.idFalla = falla.properties.id;
        imagen.src = imagenFalla;

        boton.addEventListener("click",mostrarUbicacion);
        boton.innerText="Mostrar Ubicación";
    
        let formulario = document.createElement("form");
         formulario.method = "POST";


        let p = document.createElement("p");
        p.classList.add("clasificacion");

        let inputHidden = document.createElement("input");
        inputHidden.setAttribute('type', 'radio');

        for (let i = 5; i >= 1; i--) {

        let labelEstrella = document.createElement("label");
        labelEstrella.innerHTML = "★";
        labelEstrella.addEventListener("click",establecerPuntuacion);
        labelEstrella.value = i;
        formulario.appendChild(labelEstrella);

        
        

        }

        p.appendChild(formulario);

        div.appendChild(imagen);
        div.appendChild(p);
        div.appendChild(boton);
        resultado.appendChild(div);

        establecerMedias(div);
 

    }
           
  
})
});

}

function mostrarUbicacion() {
    console.log(this);
    let coordenadas;
    let padre = this.parentElement;
    let id = padre.dataset.idFalla;
    for (let i = 0; i < datos.features.length; i++) {
        
        if (id == datos.features[i].properties.id) {
        coordenadas  = datos.features[i].geometry.coordinates;
        nombreFalla = datos.features[i].properties.nombre;
        imagenFalla = datos.features[i].properties.boceto;
        }
    }

    let longitud = parseFloat(coordenadas[0]);
    let latitud = parseFloat(coordenadas[1]);
  
   
  let firstProjection = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';

let secondProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

let iarCoordinate = [longitud, latitud];

coordenadas = proj4(firstProjection, secondProjection, iarCoordinate);

    let contenedorMapa = document.createElement("div");
    contenedorMapa.setAttribute('id', 'fullScreen');
    

    let divMapa = document.createElement('div');
    divMapa.setAttribute('id', 'map');

    contenedorMapa.appendChild(divMapa);

    let divCerrar = document.createElement("div");
    divCerrar.classList.add("cerrarMapa");

    divCerrar.addEventListener("click", cerraMapa);

    contenedorMapa.appendChild(divCerrar);
    document.querySelector('body').appendChild(contenedorMapa);

    document.getElementsByTagName("html")[0].style.overflow = "hidden";

    let mapa = L.map('map').setView([coordenadas[1], coordenadas[0]], 17);

    let tilerMapUrl = 'https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=FeZF25xvZUuP463NS59g';
  
    L.tileLayer(tilerMapUrl, {
      attribution: 'MAGIA',
    }).addTo(mapa);
  
    L.marker(coordenadas).addTo(mapa);
  
 var punto = new L.Marker([coordenadas[1], coordenadas[0]]);
punto.addTo(mapa);
punto.bindPopup(nombreFalla).openPopup();

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
    
    
        buscarResultadosPrincipales();

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


function establecerPuntuacion() {
    
this.classList.toggle("pulsado");
let fallaPadre = this.parentElement.parentElement.parentElement;
fallaPadre.dataset.vecesVotada++;
let idFallaMongo = fallaPadre.dataset.idFalla;


var url = '/puntuaciones';
var data = {idFalla: idFallaMongo, ip: '',puntuacion: this.value};
//cogerTodoMongo();
fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

establecerMedias();
}
function cogerTodoMongo() {
   
 var url = '/puntuaciones';
   
    fetch(url, {
      method: 'GET', // or 'PUT'
      
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => todoMongo = response);

}


function enseñarMenu() {
    let menu = document.getElementById('filtrosFalla');
    menu.classList.toggle("escondido")
}

function init() {
    //anyadirSeccionesPrincipales();
   //crearMapa();
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

   let menuHamburguesa = document.getElementById("hamburguesa");

   menuHamburguesa.addEventListener("click", enseñarMenu)
   
   window.addEventListener('scroll', headerFixed);
   cogerTodoMongo(); 
}

function headerFixed() {
    
    if (screen.width > 1500) {

        // Get the header
        var header = document.querySelector('header');

        // Get the offset position of the navbar
        var sticky = header.offsetTop;

        if (window.pageYOffset > sticky) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }

    }
}

function borrarTodo() {
    var url = '/puntuaciones';
   
    fetch(url, {
      method: 'GET', // or 'PUT'
      
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

}

function cerraMapa() {
    let div = document.getElementById("fullScreen");
    let body = document.querySelector("body");

    body.removeChild(div);

    //Permite scroll tras cerrar ventana emergente
    document.getElementsByTagName("html")[0].style.overflow = "auto";
}

function establecerMedias(div) {
let divFalla = document.querySelector(".falla");
let id = divFalla.dataset.idFalla;
let vecesVotada = divFalla.dataset.vecesVotada;
let puntuacion;
let totalPuntuaciones = 0;
let media;
for (let i = 0; i < todoMongo.length; i++) {
    
    if (id == todoMongo[i].idFalla) {
        if (puntuacion == undefined) {puntuacion = 0}
    puntuacion = todoMongo[i].puntuacion;
    totalPuntuaciones = totalPuntuaciones + puntuacion;
    
    media = totalPuntuaciones / vecesVotada;

    }
    
        
}

console.log(media);


}

window.onload = init;