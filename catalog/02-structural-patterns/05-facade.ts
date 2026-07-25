// Original code: https://refactoring.guru/design-patterns/facade/typescript/example

/**
 * Approach:
 * * Create two subsystem classes, each having a few operation methods.
 * * Then create a Facade class with these two subsystem attributes.
 *  * It can initialize with a given subsystem, or a new one.
 *  * It performs operation involving a subset of the subsystem's methods.
 *  * It returns the result of that operation.
 * The client code will take a Facade and log its operation.
 * Create instance of the subsystem classes, use them to instantiate a facade, and call the client code with it.
 */

class Subsystem1 {
  operation1(): string {
    return "Subsystem: 01; Operation: 1";
  }
  operation2(): string {
    return "Subsystem: 01; Operation: 2";
  }
}

class Subsystem2 {
  operation1(): string {
    return "Subsystem: 02; Operation: 1";
  }
  operation2(): string {
    return "Subsystem: 02; Operation: 2";
  }
}

// NOTE: This is the one client does not need, so the Facade will not reference this.
class Subsystem3 {
  operation1(): string {
    return "Subsystem: 03; Operation: 1";
  }
  operation2(): string {
    return "Subsystem: 03; Operation: 2";
  }
}

class Facade {
  protected sub1: Subsystem1;
  protected sub2: Subsystem2;

  constructor(sub1?: Subsystem1, sub2?: Subsystem2) {
    this.sub1 = sub1 ?? new Subsystem1();
    this.sub2 = sub2 ?? new Subsystem2();
  }

  operation(): string {
    const ops = [
      this.sub1.operation1(),
      this.sub1.operation2(),
      this.sub2.operation1(),
      this.sub2.operation2(),
    ];
    return ops.join("\n");
  }
}

// CLIENT CODE
function clientCodeFacade(facade: Facade) {
  console.log(facade.operation());
}
const sub1 = new Subsystem1();
const sub2 = new Subsystem2();
const facade = new Facade(sub1, sub2);
clientCodeFacade(facade);

/* OUTPUT:
TODO: Add output here
*/
