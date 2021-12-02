
// Constructor de la funcion
function Rocket(dna) {
  // fisicas del individuo en la isntancia actual
  this.pos = createVector(width/2, height-10);
  this.vel = createVector();
  this.acc = createVector();
  // Revisa si el individuo ha llegado al obejticvo
  this.completado = false;
  //  Revisa si el individuo chocado
  this.choco = false;
  
  // da el adn al individuo
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;
  this.fitnessaux=0;
  this.memory=[];
  // el individuos recibe una fuerza y un aceleracion
  this.aplicaFuerza = function(fuerza) {
    this.acc.add(fuerza);
  };
  // Calcula la aptitud del individuo
  this.calcFitness = function(individuos) {
    // Toma las dicsattnacias de el todos sus vecinos
    var distances=0;
    var countIndividuos=0;
    for(var i=0;i<individuos.length;i++){
     if(individuos[i].pos.x > (this.pos.x-10) && individuos[i].pos.x < (this.pos.x+10)
         && individuos[i].pos.y > (this.pos.y-10) && individuos[i].pos.y < (this.pos.y+10)){
          
          countIndividuos++;
       } 
       var d = dist(this.pos.x, this.pos.y, individuos[i].pos.x,individuos[i].pos.y);
       distances=distances+d;  
     
    }
  
    this.fitness =distances/countIndividuos;
    // si el individuo llega al objetico incrementa su aptitud
    if (this.completado) {
      this.fitness *= 10;
    }
    if(this.crashed){
      this.fitness/=10;
    }
    this.fitnessaux=this.fitness;
  };
  // Actuzaliza las fisicas del individuo
  this.update = function() {
    // revisa la distancia del indiviuso al objetivo
  var d = dist(this.pos.x, this.pos.y, objetivo.x, objetivo.y);
    // si la distanca es menos de 10 pixels ha llegado al obejtivo
  if (d < 10) {
      this.completado = true;
      this.pos = objetivo.copy();
    }

  // verifica si el individuo ha chocado con algun obstaculo
  for(var i=0;i<matrixBarriers.length;i++){
    if (
        this.pos.x > matrixBarriers[i][0] &&
        this.pos.x < matrixBarriers[i][0] + matrixBarriers[i][2] &&
        this.pos.y > matrixBarriers[i][1] &&
        this.pos.y < matrixBarriers[i][1] + matrixBarriers[i][3]
      ) {
          this.choco = true;
        }
  }
        
    // el indiivduo ha choacdo con las paredes izqu y der
    if (this.pos.x > width || this.pos.x < 0) {
          this.choco = true;   
    }
    // el indiivduo ha choacdo con las paredes arr y abj
    if (this.pos.y > height || this.pos.y < 0) {
          this.choco = true;
    }
    //aplica un vetor definido en le adn del indivduo
    this.aplicaFuerza(this.dna.genes[count]);
    //console.log(this.dna.genes[count]);
    //si el objtivo no ha chovcado con alguna paraed actualzaiza las fisicas del individuo
    if(!this.choco && !this.completado){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);  
    }
    
  };
  // pinta el individuo en ele obejtivo
  this.show = function() {

    // agrganos las traslaccion a la pila para no afeectar a los demas obejtos
    push();
    //color del individuo
    //noStroke();
    fill('rgba(100%,0%,100%,1.5)');
    //translada la posicion del individuo
    translate(this.pos.x, this.pos.y);
    //rota el individuo hacia dondoe el vector apunta
    rotate(this.vel.heading());
    //crea la forma del indidviduo que es un indivduo
    rectMode(CENTER);
    ellipse(0,0, 5, 5);
    pop();

  };
  
}
