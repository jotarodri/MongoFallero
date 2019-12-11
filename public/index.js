let arraySecciones = new Set;
let tipoFalla;

function buscarResultados() {
    
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";


fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    
   // console.log(myJson);
 
    myJson.features.forEach(falla => {
        
        
        let nombreFalla = falla.properties.nombre;
        
        

        let div = document.createElement("div");
        let imagen = document.createElement("img");
        
        let imagenFalla;

        if (tipoFalla == "Principal") {
             imagenFalla = falla.properties.boceto;
        }else if(tipoFalla == "Infantil"){
             
        }else{
            imagenFalla = falla.properties.boceto;
        }

        imagen.src = imagenFalla;
        
        div.innerHTML = nombreFalla;
        div.appendChild(imagen);
        
        resultado.appendChild(div);
        
    
    
    });
 
tipoFalla = "";

console.log(arraySecciones);
});

}

function asignarFalla() {
    
tipoFalla=this.value;
console.log(tipoFalla);

}

function anyadirSecciones() {

    fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
     
        myJson.features.forEach(falla => {
            
            arraySecciones.add(falla.properties.seccion);

            let from = document.querySelector("busqueda");
            let select = document.createElement("select");            
            
            select.appendChild(from);

            for (let i = 0; i < arraySecciones.length; i++) {
                let option = document.createElement("option");
                option.innerHTML=arraySecciones[i];
                select.appendChild(option);                
            }
        });   
    });
}

function init() {
    anyadirSecciones();
    document.querySelector('input[type="button"]').addEventListener("click",buscarResultados);
    let radios = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("click",asignarFalla);
    }
    
    

}

window.onload = init;