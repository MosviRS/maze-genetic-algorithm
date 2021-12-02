
function Population() {
  // Array de inidivudos
  this.individuos = [];
  // poblacion de individuos
  this.popsize = 100;
  // Optimos
  this.matingpool = [];
  this.optimoGlobal=0;
  this.promedios=[];
  this.optimos=[];

  // generacion de la poblacion
  for (var i = 0; i < this.popsize; i++) {
    this.individuos[i] = new Rocket();
  }

  this.evaluate = function(generacion) {
    var maxAptitud = 0;
    var suma=0;
    var sumaPromedio=0;
    // Itera atravez de todos los individuos y calcula su fitness
    for (var i = 0; i < this.popsize; i++) {
      // Calcula el fitness
      this.individuos[i].calcFitness(this.individuos);
      // calcula el promedio de fitness por generacion
      suma=suma+this.individuos[i].fitness;
      // si el individuo actual es mayor a maxApitud
      //maxApitud es igual al actual individuo 
      if (this.individuos[i].fitness > maxAptitud) {
        maxAptitud = this.individuos[i].fitness;
      }
   
    }
    //promedio
    sumaPromedio=suma/this.popsize;
    this.optimos.push(maxAptitud);
    this.promedios.push(sumaPromedio)

    // Normaliza fitnesses
    for (var i = 0; i < this.popsize; i++) {
      this.individuos[i].fitness /= maxAptitud;
    }

    this.matingpool = [];
    // toma la aptitud y lo ajusta a una escala de 1 y 100 
    // los inidividuos con mas aptitud tendran mas probabilidad de ser elegidos en la ruleta 
    for (var i = 0; i < this.popsize; i++) {
      var n = this.individuos[i].fitness * 100;
      //console.log(this.rockets[i].fitness+" "+n);
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.individuos[i]);
      }
    }
 
  };
  // Selecccion los padres apropiados por la aptitud
  this.selection = function() {
    var newIndividuos = [];
    var selccionSize=this.popsize/2;
        for (var i = 0; i < selccionSize; i++) {
          // selecciona dos padres de manera aleatoria
          var parentA = random(this.matingpool).dna;
          var parentB = random(this.matingpool).dna;
          //Cruza puntos de cruce
          var mid1 = floor(random(1,espaciovida-2));
          var mid2 = floor(random(mid1+1,espaciovida-1));
          // Crea un hijo con la funcion de cruza en dos puntos
          var child1= parentA.crossover(parentB,mid1,mid2);
          var child2= parentB.crossover(parentA,mid1,mid2);
          child1.mutation();
          child2.mutation();
          // Crea un nuevo hijo ya con la cruza y mutacion
          newIndividuos.push(new Rocket(child1));
          newIndividuos.push(new Rocket(child2));
        }
        // ahora los individuos son los nuevos individuos
        this.individuos = newIndividuos;
        newIndividuos=[];
      
  
  };

  // llama a la funcion update y show para pintar los individuos
  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.individuos[i].update();
      // pinta los individuos en la pantalla
      this.individuos[i].show();
    }
  };
}
