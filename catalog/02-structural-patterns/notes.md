# Structural Patterns

These patterns explain how to assemble objects and classes into larger structures, while keeping the structure efficient and flexible.

## 1. Adapter

### What?

An adapter acts like a middle-man between objects that need to communicate but have incompatible interfaces.

### Why?

For example, if you have Service A which takes in data in JSON format and processes it and returns the processed-JSON, and you have Service B which prepares report using XML data, then the data processed from Service A cannot be fed to Service B, as both services work with different formats.

In this case, we conjoin both the services using an adapter, which would be a JSON-to-XML converter. This adapter takes in the processed JSON data from Service A, converts it to XML, and feeds it to Service B to prepare reports.

### Types of adapters

**1. Object adapters.** These can be implemented across most languages. It uses the objct composition principle:

- implement the interface of one of the objects,
- wrap the other object.

**2. Class adapters.** Inherit interfaces from both objects at the same time. This is less popular, and can only be implemented in languages supporting multiple inheritance, like C++. As I don't work with these languages, I shall be skipping these adapters.

### How?

- Define a target that the client code can work with.
- Define an adaptee whose methods are not supported by the client.
- Define an adapter that:
  - extends over the target,
  - override the target method, and in it, fixes the adaptee behaviour so that it becomes compatible.
- Now, the client can use target (default) or the adapter which has target's method overrideen (supported by the client) where the adaptee is made compataible (can be used by the client).

### Code

Find it in [this file](./01-adapter.ts).

### More

Check out the source [here](https://refactoring.guru/design-patterns/adapter).

## 2. Bridge

### What?

- Bridge is a pattern that splits the functionality into two parts:
  - Abstraction
  - Implementation

### Why?

- Inheritance has its limitations.
- As the different types of use-cases come up, creating classes for each use-case in the inheritance chain becomes exponentially more complex.
- For example, if B1 and B2 inherit from A, and we have two new types of classes: C1 and C2, both of which need functionality of B1 and B2, then the chain goes from:
  ```
  A -> B1, B2
  ```
  to:
  ```
  A -> B1C1, B1C2, B2C1, B2C2
  ```
- This happened when only two new classes got added. If more get added, the complexity will rise exponentially and the maintainability will be just as complex.

### How?

- Define a base abstraction class.
- Define an interface which declares what needs to be implemented.
- Have a _reference_ to a variable with the interface type in the abstraction class.
- Define concrete implementation classes.
- Delegate the implementation work in the abstraction class to these concrete implementation classes through the implementation reference variable.
- If new features need to be added to the base class, extended classes can be created.
- The client will need to define an implementation instance from one of the concrete implementation classes, and use it to define an abstraction or extended abstraction instance.
- Through this instance, they can call implementation methods declare in the interface.
- This way, the abstraction class works as a "control", and the implementation classes perform those controlled operations.

### Code

Find it in [this file](./02-bridge.ts).

### More

Check out the source [here](https://refactoring.guru/design-patterns/bridge).
