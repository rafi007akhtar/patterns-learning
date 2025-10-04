// NOTE: This example was very much lifted from:
// https://refactoring.guru/design-patterns/factory-method/typescript/example

// IMPLEMENTATION OF FACTORY METHOD PATTERN
abstract class Creator {
  public abstract factoryMethod(): Product;

  public someOperation(): string {
    const product = this.factoryMethod();
    return `CREATOR: init product with ${product.operation()}`;
  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  operation(): string {
    return "ConcreteProduct1";
  }
}

class ConcreteProduct2 implements Product {
  operation(): string {
    return "ConcreteProduct2";
  }
}

function clientCodeFactory(creator: Creator, where?: number) {
  let announcement = "CLIENT: inside client code";
  if (where) {
    announcement += ` at ConcreteCreator${where}`;
  }
  console.log(announcement);
  console.log(creator.someOperation());
}

// USING THE FACTORY METHOD PATTERN
const cc1 = new ConcreteCreator1(); // instead of doing `new Creator`, we are doing `new ConcreteCreator`
clientCodeFactory(cc1, 1);
const cc2 = new ConcreteCreator2();
clientCodeFactory(cc2, 2);
