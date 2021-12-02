

function DNA(genes) {
  // Recve los genees y crear un objeto de tipo DNA
  if (genes) {
    this.genes = genes;
  }
  // si los genes no han sido creados crea un feneotipo aleatorio
  else {
    this.genes = [];
    for (var i = 0; i < espaciovida; i++) {
      // da vectores aleatorios
      this.genes[i] = p5.Vector.random2D();
      //define la maxmia fuerza para ser aplicada al individuo
      this.genes[i].setMag(maxfuerza);
    }
  }
  // cruza a laos individuos con el padrea a y b
  this.crossover = function(pareja,mid1,mid2) {
    var nuevosgenes = [];
    var valores=[];
    // cruza los padres en dos puntos aleatorios
    for (var i = 0; i < this.genes.length; i++) {
      //si es menor o igual al cruce 1 toma los genes del padre A sino los del B
      if (i <= mid1) {
        nuevosgenes[i]=this.genes[i];
     
      }else if(i>mid1 && i <= mid2){
        nuevosgenes[i]=pareja.genes[i];
         
      } else {
        nuevosgenes[i]=this.genes[i];
 
      }
    }
    // crea un nuevo DNA con la cruza generada
    return new DNA(nuevosgenes);
  };

  // agraga un amutacion alatoria para dar variedad
  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      //si un numero aletorio es menor a 0.01, un nuevo gen es generado aletoriamente
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxfuerza);
      }
    }
  };
}
