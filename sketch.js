
var poblacion;
// Each individuo esta puede vicir en  700 frames
var espaciovida = 700;
// imprime el contador de vida
var lifeP;
// contador qeu sirve para actualizar el boceto por frame
var count = 0;
// objetivo del individuo
var objetivo;
// Maxima fierza paliuzada para cada individuo
var maxfuerza = 0.7;
//numbero de generacion
var generation = 1;
//tamaño de casillas del laberinto
t=30;
var pixel=30;

// Dimensions of barriers

var matrixBarriers=[]; 
var laberinto=[];
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;


function setup() {
  createCanvas(700, 600);
  noStroke();
 
  poblacion = new Population();
  lifeP = createP();
  generationP=createP();
  objetivo = createVector(60, 25);

  //Crear laberinto
  for(let i=0;i<pixel;i++){
    laberinto[i]=[];
    for(let j=0;j<pixel;j++){
      laberinto[i][j]=0;
    }
  }
  //definir el laberinto
  for(let i=0;i<pixel;i+=2){
    for(let j=0;j<pixel;j+=2){
      let vecinos=[];
      laberinto[i][j]=1;
      if(i<pixel){vecinos.push({i:i+1,j:j});}
      if(j<pixel){vecinos.push({i:i,j:j+1});}
      if(vecinos.length>0){
        let ve=vecinos[int(random(2))];
        laberinto[ve.i][ve.j]=1;
      }
    }
  }
  //for(let i=0;i<pixel;i++){
  //  for(let j=0;j<pixel;j++){
  //    let vecinos=int(random(7));
  //      if(vecinos==3){
  //        laberinto[i][j]=1;
  //      }
  //  }
    
  //}

  for(let i=0;i<pixel;i++){
    for(let j=0;j<pixel;j++){
      if(laberinto[i][j]==1){  
         matrixBarriers.push([i*t,j*t,t,t]);
      }
     // console.log(i*t,j*t,t,t);
    }
  }
  
  //let metax=int(random(lifespan/2))*2;
  //let metay=int(random(lifespan/2))*2;
  //target={x:metax,y:metay};
}

function draw() {

  //crea la pobalcion y comienza a simular el individuo
  poblacion.run();
  // Imprime el contador de frame en la pantallla
  lifeP.html(count);
  generationP.html('Generacion: '+generation);

  count++;
  if (count == espaciovida) {
    poblacion.evaluate(generation);
    poblacion.selection();
    // Poplacion = new Population();
    count = 0;
    generation++;
    background(255); 
    
  }
  if(generation==40){
    console.log('promedio');
    for(var i=0;i<this.poblacion.promedios.length;i++){
      console.log(this.poblacion.promedios[i]);
    }
    console.log('optimos');
    for(var i=0;i<this.poblacion.optimos.length;i++){
      console.log(this.poblacion.optimos[i]);
    }
  }
  //Dibuja el laberinto
 for(var i=0;i<matrixBarriers.length;i++){
        // Pinta las berrears del laberinto
        fill(0);
        rect(matrixBarriers[i][0], matrixBarriers[i][1],matrixBarriers[i][2],matrixBarriers[i][3]);    
  } 

  // Pinta el objetivo
  fill(51,255,122);
  ellipse(objetivo.x, objetivo.y, 16, 16);
}
