# Creational Patterns

These patterns provide various object-creation mechanisms, which increase flexibility and reuse of existing code.

## 1. Factory Method / Virtual Constructor

A factory method (also called virtual constructor) is a pattern that provides an interface to create objects in a superclass, but allows the subclasses to alter the type of objects that will be created.

### To break this down:

- we have a class, say class A;
- we can create objects of this class using its constructor in conjunction with the `new` keyword, but we won't do that;
- instead, we will have define a method in class A, something like `makeA`, which will return an instance of A.

### But why tho?

- using a constructor will always create a new object with every attribute with its defaults;
- if we instead use a factory method like `makeA`, we can decide if we want to return a new object (like `new A()`), or see if we have a cached object that will do the task, or if we want to want the create object logic to be defined in the base class instead - which can be done by making `makeA` an abstract class or an interface.

### Code

Find it in [this file](./01-factory-method.ts).

### More

Check out the source [here](https://refactoring.guru/design-patterns/factory-method).
