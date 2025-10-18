// Original code: https://refactoring.guru/design-patterns/prototype/typescript/example

// PROTOTYPE CLASS THAT SUPPORTS CLONING
class Prototype {
  public primitive: any;
  public component!: object;

  // We will also take into account cloing when there is a CIRCULAR REFERENCE
  // Its class will be defined below
  public circularReference!: ComponentWithBackRef;

  public clone(): this {
    // Regular cloning done using Typescript's built-in Object.create method
    const clonedObj: this = Object.create(this);
    clonedObj.component = Object.create(this.component);

    // HANDLING CIRCULAR REFERENCE WHILE CLONE
    // This requires assigning the attribute to clone an object of its own class
    // And in the constructor, the current object should be passed
    clonedObj.circularReference = new ComponentWithBackRef(clonedObj);

    return clonedObj;
  }
}

// This class is defined to provide for a special case - when the object to clone has a back reference
class ComponentWithBackRef {
  public prototype: Prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

function clientCodePrototype() {
  const p1 = new Prototype();
  p1.primitive = 456;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackRef(p1);

  const p2 = p1.clone();

  // The following has been copied from the original code:
  if (p1.primitive === p2.primitive) {
    console.log(
      "Primitive field values have been carried over to a clone. Yay!"
    );
  } else {
    console.log("Primitive field values have not been copied. Booo!");
  }
  if (p1.component === p2.component) {
    console.log("Simple component has not been cloned. Booo!");
  } else {
    console.log("Simple component has been cloned. Yay!");
  }
  if (p1.circularReference === p2.circularReference) {
    console.log("Component with back reference has not been cloned. Booo!");
  } else {
    console.log("Component with back reference has been cloned. Yay!");
  }
  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log(
      "Component with back reference is linked to original object. Booo!"
    );
  } else {
    console.log("Component with back reference is linked to the clone. Yay!");
  }
}
clientCodePrototype();
