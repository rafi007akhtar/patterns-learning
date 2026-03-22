// Original code: https://refactoring.guru/design-patterns/bridge/typescript/example

/**
 * Structure:
 * * The Abstraction class will have all the controls associated for the implementation.
 *  * It will maintain an Implementation object and delegate work to this object.
 * * The Impementation interface will declare what will be implemented.
 * * The concrete implementation classes will have the actual implementations.
 * * The extended implementation class demonstrated the open / closed principle:
 *  * New feature may be extended to the class without modifying its implementation.
 * * The client code works with either the Abstraction class or the extended abstraction class.
 */

class Abstraction {
  protected implementation: Impementation;

  constructor(implementation: Impementation) {
    this.implementation = implementation;
  }

  operation(): string {
    const result = this.implementation.operationImplementation();
    return `[ABSTRACTION] ${result}`;
  }
}

interface Impementation {
  operationImplementation(): string;
}

class ConcreteImplementationA implements Impementation {
  operationImplementation(): string {
    return "[CONCRETE_IMPLEMENTATION_A] Implementation";
  }
}

class ConcreteImplementationB implements Impementation {
  operationImplementation(): string {
    return `[CONCRETE_IMPLEMENTATION_B] Implementation`;
  }
}

class ExtendedAbstraction extends Abstraction {
  operation(): string {
    const result = this.implementation.operationImplementation();
    return `[EXTENDED_ABSTRACTION] ${result}`;
  }
}

function clientCodeBridge(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
let extendedAbs = new ExtendedAbstraction(implementation);
clientCodeBridge(abstraction);
clientCodeBridge(extendedAbs);

console.log();

implementation = new ConcreteImplementationB();
abstraction = new Abstraction(implementation);
extendedAbs = new ExtendedAbstraction(implementation);
clientCodeBridge(abstraction);
clientCodeBridge(extendedAbs);

/* OUTPUT:
[ABSTRACTION] [CONCRETE_IMPLEMENTATION_A] Implementation
[EXTENDED_ABSTRACTION] [CONCRETE_IMPLEMENTATION_A] Implementation

[ABSTRACTION] [CONCRETE_IMPLEMENTATION_B] Implementation
[EXTENDED_ABSTRACTION] [CONCRETE_IMPLEMENTATION_B] Implementation
*/
