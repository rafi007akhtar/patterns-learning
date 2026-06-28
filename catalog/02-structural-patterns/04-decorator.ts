// Original code: https://refactoring.guru/design-patterns/decorator/typescript/example#example-0

/**
 * In this pattern, we follow this approach:
 * * Define the interface for the concrete, undecorated class
 * * Define the concrete class that implements this interface
 *
 * Then:
 * * Define a base decorate that implements the above interface
 * * Define two concrete decorators that extend from the base
 *
 * Followed by the client using the concrete class undecorated, as well as stacked with decorators
 */

interface IDecoratorExample {
  myOperation(): string;
}

class ConcreteComponent implements IDecoratorExample {
  myOperation(): string {
    return "ConcreteComponent";
  }
}

class BaseDecorator implements IDecoratorExample {
  public component!: ConcreteComponent;

  constructor(component: IDecoratorExample) {
    this.component = component;
  }

  myOperation(): string {
    return this.component.myOperation();
  }
}

class ConcreteDecoratorA extends BaseDecorator {
  myOperation(): string {
    return `DECORATOR-A[ ${super.myOperation()} ]`;
  }
}

class ConcreteDecoratorB extends BaseDecorator {
  myOperation(): string {
    return `DECORATOR-B[ ${super.myOperation()} ]`;
  }
}

// CLIENT CODE
function printMyOperation(component: ConcreteComponent) {
  console.log(component.myOperation());
}

const undecorated = new ConcreteComponent();
printMyOperation(undecorated);

const decoratedStack = new ConcreteDecoratorB(
  new ConcreteDecoratorA(undecorated),
);
printMyOperation(decoratedStack);

/* OUTPUT:
ConcreteComponent
DECORATOR-B[ DECORATOR-A[ ConcreteComponent ] ]
 */
