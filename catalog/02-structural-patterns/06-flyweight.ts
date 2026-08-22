// Original code: https://refactoring.guru/design-patterns/flyweight/typescript/example

/**
 * Create a flyweight class that instantiates shared state, and performs operation to show shared (instrinsic) and unique (extrinsic) states.
 * Next, create a factory that manages the flyweights.
 *  * the constructor takes an array of array for initial flyweights, and uses each of those arrays to create a map from key to flyweight
 *  * the key is a hashed value of the elements in the array; the value is the flyweight object of the array
 *  * the factory also supports list and get operations
 *  * the list operation prints the number of flyweights, followed by the hashed keys
 *  * the get operation takes a shared state array, converts it into a hashed key, and returns its corresponding flyweight
 *    * if it doesn't exist, it adds it to the map of flyweights first.
 * The client code declared an array of array and created a flyweight factory out of it, and performs the list operation on it.
 * Then, it creates a method that:
 *  * inputs the flyweight factory, the intrinsic data, and extrinsic data
 *  * performs get operation to the flyweight factory with the intrinsic data and gets a new flyweight
 *  * performs show operation with the new flyweight and the extrinsic data.
 */

class Flyweight {
  private sharedData: unknown;

  constructor(sharedData: unknown) {
    this.sharedData = sharedData;
  }

  displayWithExtrinsic(uniqueData: unknown) {
    console.log(`
      Flyweight full state
      --------------------
      Shared data: ${JSON.stringify(this.sharedData)} \n
      Unique data: ${JSON.stringify(uniqueData)}
    `);
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  constructor(initialFlyweights: string[][]) {
    for (const flyweightState of initialFlyweights) {
      const hashedKey = this.generateKey(flyweightState);
      this.flyweights[hashedKey] = new Flyweight(flyweightState);
    }
  }

  generateKey(flyweightState: string[]) {
    return flyweightState.join("_");
  }

  listFlyweightHashes() {
    const hashes = Object.keys(this.flyweights);
    console.log(
      `The Flyweight factory has ${hashes.length} flyweights, accessible from the following keys:`,
    );
    for (const hash of hashes) {
      console.log(hash);
    }
  }

  getFlyweight(sharedState: string[]) {
    const key = this.generateKey(sharedState);
    if (!(key in this.flyweights)) {
      this.flyweights[key] = new Flyweight(sharedState);
    }
    return this.flyweights[key];
  }
}

// CLIENT CODE
function updateFactoryDB(
  factory: FlyweightFactory,
  intrinsicData: string[],
  extrinsicData: string[],
) {
  const newlyAddedFlyweight = factory.getFlyweight(intrinsicData);
  newlyAddedFlyweight.displayWithExtrinsic(extrinsicData);
}

function clientCodeFlyweight() {
  const factory = new FlyweightFactory([
    ["gone", "gone", "the"],
    ["form", "of", "man"],
    ["rise", "the", "demon"],
    ["Etrigan", "!", "!"],
  ]);
  factory.listFlyweightHashes();

  const dataForNewFlyweight = ["Jason", "'Etrigan'", "Blood"];
  const extrinsicData = ["Merlin", "Spell", "Bind"];
  updateFactoryDB(factory, dataForNewFlyweight, extrinsicData);
}
clientCodeFlyweight();

/* OUTPUT:
The Flyweight factory has 4 flyweights, accessible from the following keys:
gone_gone_the
form_of_man
rise_the_demon
Etrigan_!_!

      Flyweight full state
      --------------------
      Shared data: ["Jason","'Etrigan'","Blood"] 

      Unique data: ["Merlin","Spell","Bind"]
*/
