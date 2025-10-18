// Original code: https://refactoring.guru/design-patterns/builder/typescript/example

/** The following approach will be followed in implementing this pattern:
 * We will start with a Product which we want to build. This product will have several parts, stored in an array and a method to list them all
 * Then, we go to the implementing the Builder pattern.
 * First, a Builder interface will be declared to outline its shape.
 * Then, a concrete class will implement a Builder with the above interface.
 *  * This class will use a Product instance, and will have three methods to build its parts separately.
 *  * It will also have a method to reset (create a new product).
 *  * And it will have a method to get the product, after resetting.
 * Then, we will create a first client code, where the above builder will be instantiated and its methods called to build the product and list its parts.
 * After that, we will create a Director class which will have pre-defined steps to build the product which the client can directly use.
 */

// DEFINE THE PRODUCT
class MyProduct {
  public parts: string[] = [];

  public listParts() {
    const partsStr = this.parts.join(", ");
    console.log(`Product parts: ${partsStr}`);
  }
}

// DELCARE THE BUILDER
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

// IMPLEMENT THE BUILDER
// the design can have multiple builders, but as in the original code, I will implement only one
class ConcreteBuilder1 implements Builder {
  private product = new MyProduct();

  constructor() {
    this.reset();
  }

  reset() {
    this.product = new MyProduct();
  }

  addPartToProduct(part: string) {
    this.product.parts.push(part);
  }

  producePartA(): void {
    this.addPartToProduct("PartA");
  }
  producePartB(): void {
    this.addPartToProduct("PartB");
  }
  producePartC(): void {
    this.addPartToProduct("PartC");
  }

  getProduct(): MyProduct {
    const result = this.product;
    this.reset();
    return result;
  }
}

// INDEPENDENT CLIENT CODE
function clientCodeBuilderWithoutDirector() {
  const builder = new ConcreteBuilder1();
  builder.producePartA();
  builder.producePartB();
  builder.producePartC();
  console.log("Listing parts without Director:");
  builder.getProduct().listParts();
}
clientCodeBuilderWithoutDirector();
console.log();

// IMPLEMENT THE DIRECTOR
class Director {
  private builder!: Builder;

  // builder is defined in a set method and not a constructor
  // so that the client may change the builder if they want in the middle of the build process
  public setBuilder(builder: Builder) {
    this.builder = builder;
  }

  public buildMVP() {
    this.builder.producePartA();
  }

  public buildFullProduct() {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

// CLIENT CODE USIGN ABOVE DIRECTOR
function clientCodeBuilderWithDirector() {
  const builder = new ConcreteBuilder1();
  const director = new Director();
  director.setBuilder(builder);

  console.log("Listing MVP with Director:");
  director.buildMVP();
  builder.getProduct().listParts();

  console.log("Listing full product with Director:");
  director.buildFullProduct();
  builder.getProduct().listParts();
}
clientCodeBuilderWithDirector();
