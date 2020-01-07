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
        
        if (anyoDesde<=anyoFalla  && anyoHasta >= anyoFalla) {
            
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            imagen.src = imagenFalla;
            
            let divEstrellas = document.createElement("div");
            divEstrellas.classList.add("valoracion");
    
            for (let i = 0; i < 5; i++) {
                let estrella = document.createElement("input");
                
                
                let star = document.createElement("label");
                star.innerHTML = "★";
                star.classList.add("i");
                console.log(star);
        
                estrella.appendChild(star);
                divEstrellas.appendChild(estrella);
                
            }
         
            div.appendChild(imagen);
            div.appendChild(divEstrellas);
            div.appendChild(boton);
            resultado.appendChild(div);
        }
            

        if (anyoDesde === undefined || anyoHasta === undefined) {
                div.innerHTML = nombreFalla;
                div.classList.add("falla");
                imagen.src = imagenFalla;
                
        let boton = document.createElement("button");
        
        boton.innerText="Mostrar Ubicación";
        
                let divEstrellas = document.createElement("form");
                let p = document.createElement("p");
                p.classList.add("clasificacion");

                for (let i = 0; i < 5; i++) {

                 let input = document.createElement("input");
                 input.classList.add("valoracion");
                 input.type = "radio";
                 input.value = i ;
                 
                 let label = document.createElement("label");
                 label.innerHTML = "★";
                  
                 input.appendChild(label);
                 p.appendChild(input);
                 divEstrellas.appendChild(p);
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
        
            
        if (anyoFallaInfantil >= anyoDesde && anyoFallaInfantil <= anyoHasta) {
            
            div.innerHTML = nombreFalla;
            div.classList.add("falla");
            imagen.src = imagenFalla;
            
            let divEstrellas = document.createElement("div");
            divEstrellas.classList.add("valoracion");
    
            for (let i = 5; i < 0; i--) {
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
    
//let puntuancion = this.classList;
this.classList.add("pulsado");
this.disabled = true;
console.log(this.classList.value);

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

   //document.querySelector('input[type="button"]').addEventListener("click",buscarResultados);
}

window.onload = init;