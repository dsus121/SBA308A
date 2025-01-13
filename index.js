class Cat {
  constructor(moniker, age, furColor, furLength, isAlive) {
    this.moniker = moniker;
    this.age = age;
    this.isAlive = isAlive;
  }
  play() {
    if (this.isAlive) {
      console.log(`${this.moniker} chases the laser pointer!`);
    } else {
      console.log(
        `${this.moniker} can't chase anything because ${this.moniker} is dead. 💀`
      );
    }
  }

  speak() {
    if (this.isAlive) console.log(`"Meow!", says ${this.moniker}.`);
  }

  speakIfAlive() {
    if (this.isAlive) {
      this.speak();
    }
  }
}
const cat1 = new Cat("Bulleit", 2, "black", "short", false);
const cat2 = new Cat("Pluto", 8, "black", "long", true);
const cat3 = new Cat("Kerberos", 2, "black", "long", true);

console.log(cat1);
console.log(cat2);
console.log(cat3);

cat1.play();
cat2.play();
cat3.play();

const cats = [cat1, cat2, cat3];

cats.forEach(cat => cat.speakIfAlive());

// sleep() {
//   this.isAwake = false;
// }

// feed() {
//   this.isHungry = false;
// }

// cat1.sleep();
// cat1.feed();

// cat2.sleep();
// cat2.feed();

// catSpeak(){
//     console.log(`${this.moniker} says, "Meow!"`);
// }
// catBrush(){
//     console.log(`This ${this.furLength} fur needs a brushing.`);
// }

// console.log(cat1)
// console.log(cat2)

// catSpeak()
// catBrush()

// // invoke each method from both instances

// class Pirate {
//     constructor(

//     )
// }
// }

// // 3 properties that are set by the constructor
// // create 3 methods
// // instantiate 2 arrays of 3 pirates, name the arrays after
// // your favorite pirate ships, the jollyRoger and the blackPearl
// // loop over each array and print 3 properties of each pirate

// class  Pirate {
//     constructor(name, age, rank, hasEyePatch, isAtSea, isAwake) {
//       this.name = name;
//       this.age = age;
//       this.rank = rank;
//       this.hasEyePatch = hasEyePatch;
//       this.isAtSea = isAtSea;
//       this.isAwake = isAwake
//     }

//     setSail() {
//       this.isAtSea = true;
//     }

//     sleep() {
//       console.log(`ZzZzZz... ${this.name} is now asleep`)
//       this.isAwake = false;
//     }

//     speak () {
//       console.log(`${this.name} says "arrrrg!"`);
//     }
//   }

//   const jollyRoger = [
//     new Pirate('Roger', 44, 'Captain', true, true, true),
//     new Pirate('Steve', 29, 'Deck Hand', false, true, false),
//     new Pirate('Leonard', 37, 'First Mate', true, true, true),
//   ];

//   const blackPearl =[
//     new Pirate('Jack', 41, 'Captain', true, false, true),
//     new Pirate('Ragetti', 48, 'First Mate', false, false, true),
//     new Pirate('William', 28, 'Deck Hand', false, false, true),
//   ];

//   function logPirateInfo(crew, shipName="new ship") {
//     console.log(`Crew info for ${shipName}:`)
//     crew.forEach(pirate => console.log(`Name: ${pirate.name}, Age: ${pirate.age}, Has Eye Patch: ${pirate.hasEyePatch}`))
//   }

//   logPirateInfo(jollyRoger, "Jolly Roger");
//   logPirateInfo(blackPearl, "Black Pearl");
