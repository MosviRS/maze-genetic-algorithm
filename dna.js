// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function DNA(genes) {
  // Recieves genes and create a dna object
  if (genes) {
    this.genes = genes;
  }
  // If no genes just create random dna
  else {
    this.genes = [];
    for (var i = 0; i < espaciovida; i++) {
      // Gives random vectors
      this.genes[i] = p5.Vector.random2D();
      // Sets maximum force of vector to be applied to a rocket
      this.genes[i].setMag(maxforce);
    }
  }
  // Performs a crossover with another member of the species
  this.crossover = function(pareja) {
    var nuevosgenes = [];
    // Picks random midpoint
    var mid1 = floor(random(this.genes.length));
    var mid2 = floor(random(mid1+1,this.genes.length));

    for (var i = 0; i < this.genes.length; i++) {
      // If i is greater than mid the new gene should come from this partner
      if (i <=mid1) {
        nuevosgenes[i] = this.genes[i]; 
      }else if(i > mid1 && i<=mid2){
        nuevosgenes[i] = pareja.genes[i];
      }else {
        nuevosgenes[i] = this.genes[i];
      }
    }
 
    // Gives DNA object an array
    return new DNA(nuevosgenes);
  };

  // Adds random mutation to the genes to add variance.
  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      // if random number less than 0.01, new gene is then random vector
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  };
}
