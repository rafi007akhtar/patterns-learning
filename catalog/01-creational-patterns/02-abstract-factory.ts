// Original code: https://refactoring.guru/design-patterns/abstract-factory/typescript/example

/** PART 1: ABSTRACT */
// Let's follow the bottom-top approach, starting with the abstract product interfaces
interface AbstractProductA {
  usefulFunctionA(): string;
}
interface AbstractProductB {
  usefulFunctionB(): string;
  // collaborate with product of the same family
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

// With these two abstract interfaces, let's create the abstract factory
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

/** PART 2: CONCRETE */
// Abstractions done!
// Now let's move on to concrete products which will implement the above abstract products
class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA(): string {
    return "The result of the product A1.";
  }
}
class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA(): string {
    return "The result of the product A2.";
  }
}
class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB(): string {
    return "The result of the product B1";
  }
  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 colloborating with ${result}`;
  }
}
class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB(): string {
    return "The result of the product B2";
  }
  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with ${result}`;
  }
}

// With these concrete products, let's create the concrete factories
class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }
  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}
class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }
  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/** PART 3: CLIENT CODE */
// Our factories and interfaces are ready!
// Let's run them on the client side
// The client code will work only with the abstract types
function clientCodeAbstractFactory(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();
  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}
// We pass concrete classes to client code
console.log("CLIENT: with first CONCRETE FACTORY");
clientCodeAbstractFactory(new ConcreteFactory1());
console.log();
console.log("CLIENT: with second CONCRETE FACTORY");
clientCodeAbstractFactory(new ConcreteFactory2());
