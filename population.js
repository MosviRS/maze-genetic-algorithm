// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population() {
  // Array of rockets
  this.rockets = [];
  // Amount of rockets
  this.popsize = 30;
  // Amount parent rocket partners
  this.matingpool = [];
  this.optimoGlobal=0;
  this.promedios=[];
  this.optimos=[];

  // Associates a rocket to an array index
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function(generacion) {
    var maxfit = 0;
    var suma=0;
    var sumaPromedio=0;
    // Iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.popsize; i++) {
      // Calculates fitness
      this.rockets[i].calcFitness(this.rockets);
      // If current fitness is greater than max, then make max equal to current
      suma=suma+this.rockets[i].fitness;
      sumaPromedio=suma/this.rockets.length;
      
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
   
    }
    if(maxfit > this.optimoGlobal){
       this.optimoGlobal=maxfit;
    }
    // Normalises fitnesses
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    // Take rockets fitness make in to scale of 1 to 100
    // A rocket with high fitness will highly likely will be in the mating pool
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
    this.optimos.push(this.optimoGlobal);
    this.promedios.push(sumaPromedio);
    //Imprime el promedio por generacion
    //print(generacion,',',sumaPromedio);
    //Imprime el Optimo Global de las generaciones
    //print(generacion,',',this.optimoGlobal);
  };
  // Selects appropriate genes for child
  this.selection = function() {
    var newRockets = [];
     
        for (var i = 0; i < this.rockets.length; i++) {
          // Picks random dna
          var parentA = random(this.matingpool).dna;
          var parentB = random(this.matingpool).dna;
          
          // Creates child by using crossover function
          var child = parentA.crossover(parentB);
          child.mutation();
          // Creates new rocket with child dna
          newRockets[i] = new Rocket(child);
        }
        // This instance of rockets are the new rockets
        this.rockets = newRockets;
      
  
  };

  // Calls for update and show functions
  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      // Displays rockets to screen
      this.rockets[i].show();
    }
  };
}
