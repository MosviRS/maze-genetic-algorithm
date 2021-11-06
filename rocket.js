// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// Constructor function
function Rocket(dna) {
  // Physics of rocket at current instance
  this.pos = createVector(width/2, height);
  this.vel = createVector();
  this.acc = createVector();
  // Checkes rocket has reached target
  this.completed = false;
  // Checks if rocket had crashed
  this.crashed = false;
  //
  this.auxforce;
  this.auxX=0;
  this.auxY=0;
  this.auxcrashed;
  this.move=true;
  // Gives a rocket dna
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  // Object can recieve force and add to acceleration
  this.applyForce = function(force) {
    this.acc.add(force);
  };
  // Calulates fitness of rocket
  this.calcFitness = function(rockets) {
    // Takes distance to target
    var distances=0;
    var countRockets=0;
    for(var i=0;i<rockets.length;i++){
     if(rockets[i].pos.x > (this.pos.x-10) && rockets[i].pos.x < (this.pos.x+10)
         && rockets[i].pos.y > (this.pos.y-10) && rockets[i].pos.y < (this.pos.y+10)){
          
          countRockets++;
          
       } 
       var d = dist(this.pos.x, this.pos.y, rockets[i].pos.x,rockets[i].pos.y);
       distances=distances+d;  
     
    }
  
    // average distances range of fitness
    //console.log('pormedio de rockets '+countRockets);
    this.fitness = distances/countRockets;
    //console.log(this.fitness);
    // If rocket gets to target increase fitness of rocket
    if (this.completed) {
      this.fitness *= 10;
    }
    // If rocket does not get to target decrease fitness
    if (this.crashed) {
      this.fitness /= 10;
    }
  };
  // Updates state of rocket
  this.update = function() {
    // Checks distance from rocket to target
  var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // If distance less than 10 pixels, then it has reached target
  if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

  // Rocket hit the barrier
  for(var i=0;i<matrixBarriers.length;i++){
    if (
        this.pos.x > matrixBarriers[i][0] &&
        this.pos.x < matrixBarriers[i][0] + matrixBarriers[i][2] &&
        this.pos.y > matrixBarriers[i][1] &&
        this.pos.y < matrixBarriers[i][1] + matrixBarriers[i][3]
      ) {
          this.crashed = true;
          this.move=false;
        }
  }
        
    // Rocket has hit left or right of window
    if (this.pos.x > width || this.pos.x < 0) {
          this.crashed = true;
          this.move=false;   
    }
    // Rocket has hit top or bottom of window
    if (this.pos.y > height || this.pos.y < 0) {
          this.crashed = true;
          this.move=false;
    }
    //applies the random vectors defined in dna to consecutive frames of rocket
    this.applyForce(this.dna.genes[count]);
    //console.log(this.dna.genes[count]);
    // if rocket has not got to goal and not crashed then update physics engine
    if(!this.crashed && !this.completed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);  
    }
    
  };
  // displays rocket to window
  this.show = async function() {


    // push and pop allow's rotating and translation not to affect other objects
    push();
    //color customization of rockets
    //noStroke();
    fill('rgba(100%,0%,100%,1.5)');
    //translate to the postion of rocket
    translate(this.pos.x, this.pos.y);
    //rotatates to the angle the rocket is pointing
    rotate(this.vel.heading());
    //creates a rectangle shape for rocket
    rectMode(CENTER);
    ellipse(0,0, 5, 5);
    pop();




  };
  
}
