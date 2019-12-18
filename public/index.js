let arraySecciones = new Set;
let tipoFalla;
let seccion;
let todas;

function filtrarFalla(cadena) {
    let valorTexto = document.querySelector('select').value;
    return cadena.properties.seccion.toUpperCase().startsWith(valorTexto);
}

function buscarResultados() {
    
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

        if (tipoFalla == "Principal") {
             imagenFalla = falla.properties.boceto;
        }else if(tipoFalla == "Infantil"){
            imagenFalla = falla.properties.boceto_i; 
        }else{
            imagenFalla = falla.properties.boceto;
        }
            
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

    
    });
 
tipoFalla = "";

//console.log(arraySecciones);
});

}

function asignarFalla() {
    
tipoFalla=this.value;
//console.log(tipoFalla);
anyadirSeccionesPrincipales();
buscarResultados();

}

function asignarSeccion() {
    
    seccion=this.value;
    //console.log(seccion);
    buscarResultados();
}

function anyadirSeccionesPrincipales() {

    let select = document.getElementsByClassName("seccionFalla")[0];

    fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
     
        if (tipoFalla == "Principal") {
        
        select.innerHTML = "";
        arraySecciones.clear();
        myJson.features.forEach(falla => {
           
            arraySecciones.add(falla.properties.seccion);

        });    

        } else if (tipoFalla == "Infantil") {

        select.innerHTML = "";
        arraySecciones.clear();
        myJson.features.forEach(falla => {
           
            arraySecciones.add(falla.properties.seccion_i);

        });   
     }
     
     /*else{
        myJson.features.forEach(falla => {
            
            arraySecciones.add(falla.properties.seccion);

        });   
     }*/
        

    let arraySeccionesOrdenadas = [];
    arraySecciones.forEach(seccion => {
    
    arraySeccionesOrdenadas.push(seccion);
    
    });

arraySeccionesOrdenadas.sort();
//console.log(arraySeccionesOrdenadas);
     
        arraySeccionesOrdenadas.forEach(seccion => {
            let option = document.createElement("option");
            option.text= seccion;
            select.add(option);
        });
    
    });
}

function init() {
    //anyadirSeccionesPrincipales();
   
    let radios = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("click",asignarFalla);
    }
    
    let seleccion = document.getElementsByClassName("seccionFalla")[0];
    seleccion.addEventListener("click",asignarSeccion);

   //buscarResultados();

   //document.querySelector('input[type="button"]').addEventListener("click",buscarResultados);
}

window.onload = init;