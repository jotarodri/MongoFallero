
//import { create } from "../app/controllers/puntuacion.controller";

let arraySecciones = new Set;
let tipoFalla;
let seccion;
let todas;
let anyoDesde;
let anyoHasta;
let ipFalla;

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
    
    console.log(myJson);
    
        const filtro = myJson.features.filter(filtrarFalla);
 
    filtro.forEach(falla => {
        
        let nombreFalla = falla.properties.nombre;
        
        let div = document.createElement("div");
        div.classList.add("falla");
        let imagen = document.createElement("img");
    
        let imagenFalla;
        let anyoFalla;
        ipFalla = falla.properties.id;

        let boton = document.createElement("button");

             imagenFalla = falla.properties.boceto;
             anyoFalla = falla.properties.anyo_fundacion;
             console.log(anyoFalla);
        
        if (anyoDesde<=anyoFalla  && anyoHasta >= anyoFalla) {
            
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            div.dataset.idFalla = falla.properties.id;
            imagen.src = imagenFalla;
            
            let divValoracion = document.createElement("div");
            let formulario = document.createElement("form");
            let p = document.createElement("p");
            p.classList.add("clasificacion");
    
            for (let i = 0; i < 5; i++) {

            let input = document.createElement("input");
            input.setAttribute("id","radio"+i);
            input.setAttribute("type","radio");
            input.setAttribute("name","estrellas");
            input.setAttribute("value", i.toString());
            
            let estrella = document.createElement("label");
            estrella.innerHTML = "★";
            estrella.setAttribute("for","radio"+i);
            
              input.appendChild(estrella);
              p.appendChild(input);
            }

            formulario.appendChild(p);
            divValoracion.appendChild(formulario);

            div.appendChild(imagen);
            div.appendChild(boton);
            resultado.appendChild(div);
        }
            

        if ((anyoDesde === undefined || anyoHasta === undefined)||(anyoDesde == "" || anyoHasta === "")) {
               
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            div.dataset.idFalla = falla.properties.id;
            imagen.src = imagenFalla;
                
    let boton = document.createElement("button");
        
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
    
    }
           
    });
 
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
        
            
        if (anyoFallaInfantil >= anyoDesde && anyoFallaInfantil <= anyoHasta) {
            
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            imagen.src = imagenFalla;
            
            let divEstrellas = document.createElement("div");
            divEstrellas.classList.add("valoracion");
    
            for (let i = 5; i < 0; i--) {

                let estrella = document.createElement("button");
                let star = document.createElement("i");
                star.innerHTML = "★";
                star.value = i;
                star.addEventListener("click",establecerPuntuacion);
                estrella.appendChild(star);
                divEstrellas.appendChild(estrella);
                
            }
         
            div.appendChild(imagen);
            div.appendChild(divEstrellas);
            resultado.appendChild(div);
        }
    });
 

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


function establecerPuntuacion() {
    
this.classList.toggle("pulsado");
let fallaPadre = this.parentElement.parentElement.parentElement;
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
    .then(response => console.log('Success:', response));

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

   //buscarResultados();

   document.querySelector('.mongo').addEventListener("click",cogerTodoMongo);
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

window.onload = init;