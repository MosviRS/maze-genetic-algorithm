
function Population() {
  // Array de inidivudos
  this.individuos = [];
  // poblacion de individuos
  this.popsize = 20;
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
    sumaPromedio=suma/this.individuos.length;
    if(maxAptitud > this.optimoGlobal){
       this.optimoGlobal=maxAptitud;
    }
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
   
    this.optimos.push(maxAptitud);
    this.promedios.push(sumaPromedio);
    //Imprime el promedio por generacion
    //print(generacion,',',sumaPromedio);
    //Imprime el Optimo Global de las generaciones
    //print(generacion,',',this.optimoGlobal);
  };
  // Selecccion los padres apropiados por la aptitud
  this.selection = function() {
    var newIndividuos = [];
     
        for (var i = 0; i < this.individuos.length; i++) {
          // selecciona dos padres de manera aleatoria
          var parentA = random(this.matingpool).dna;
          var parentB = random(this.matingpool).dna;
          
          // Crea un hijo con la funcion de cruza en dos puntos
          var child = parentA.crossover(parentB);
          //child.mutation();
          // Crea un nuevo hijo ya con la cruza y mutacion
          newIndividuos[i] = new Rocket(child);
        }
        // ahora los individuos son los nuevos individuos
        this.individuos = newIndividuos;
      
  
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
