# Creational Patterns

These patterns provide various object-creation mechanisms, which increase flexibility and reuse of existing code.

## 1. Factory Method / Virtual Constructor

A factory method (also called virtual constructor) is a pattern that provides an interface to create objects in a superclass, but allows the subclasses to alter the type of objects that will be created.

### To break this down:

- we have a class, say class A;
- we can create objects of this class using its constructor in conjunction with the `new` keyword, but we won't do that;
- instead, we will have to define a method in class A, something like `makeA`, which will return an instance of A.

### But why tho?

- using a constructor will always create a new object with every attribute with its defaults;
- if we instead use a factory method like `makeA`, we can decide if we want to return a new object (like `new A()`), or see if we have a cached object that will do the task, or if we want to want the create object logic to be defined in the base class instead - which can be done by making `makeA` an abstract class or an interface.

### Code

Find it in [this file](./01-factory-method.ts).

### More

Check out the source [here](https://refactoring.guru/design-patterns/factory-method).

## 2. Absolute Factory

The abstract factory is a creational design pattern that allows to produce families of related objects without specifying their concrete class.

### Setup

For example, a family of related products can be Sofa, Chair, Coffee Table, etc. Each of those is a related product in a family of furniture. By family, it means matching _variant_. Each of the products can have a different variant, for example, modern, victorian or art deco.

**Tasks:**

- **Each family of products should have the same variant**. For example, a family having a victorian chair may add a sofa to itself, but that sofa should also be victorian.
- This setup should be done in the way that new products can be added to a family without changing the existing code.

To solve this problem, we divided the solution into two parts: one for the products, and one for the variants

### Solution => products

- Declare an interface for each of the products. Example, chairs should have the interface `Chair`, sofas should have the interface `Sofa`, etc.
- Make all the variants of those products follow those interfaces (that is, implement them).
- Then, declare an **abstract factory**, which is an interface that will have the list of creation methods for all products that are part of the product family. For example, `createChair`, `createSofa` etc.
- These methods must return **abstract products** types represented by the interfaces. So, `createChair` returns `Chair`, `createSofa` returns `Sofa` and so on.

### Solution => variants

- For each variant of the product family, create a separate **factory class** based on the `AbstractFactory` interface created above.
  - A factory a type of class that can return product of its particular type only. For example, `ModernFurnitureFactory` can return `ModernSofa`, `ModernChair` objects, but not `VictorianSofa`.
- The client code then uses the `AbstractFactory` to work with both factories and products. It does not care about the concrete class of the factory it works with.
- As the client is exposed to only abstract interfaces, the concrete factory is created by the application during the initialization stage.
- The right factory type to create the concrete factory is selected before the init stage depending on the config or the env settings.

### Abstract v/s Concrete Factories.

**Abstract factory.** The abstract factory interface declares a set of methods that return different abstract products.
These products are called a **family** and are related by a high-level theme or concept.
Products of one family are usually able to collaborate among themselves.
A family of products may have several variants, but the products of one variant are incompatible with the products of another variant.

**Concrete factory.** Concrete factories produce a family of products that belong to a single variant.
The factory guarantees that the resulting products are compatible. Signatures of the concrete factory's methods return an abstract product, while inside the method a concrete product is instantiated. Furthermore:

- Each concrete factory has a corresponding product variant.
- Each distinct product of a product family should have a base
  interface. All variants of the product must implement this
  interface.
- Concrete products are created by corresponding concrete
  factories.

### Code

Find it in [this file](./02-absolute-factory.ts).

### More

Check out the source [here](https://refactoring.guru/design-patterns/abstract-factory).

## 3. Builder

Builder is a creational design pattern that lets you construct different types of complex products without inflating the classes created.

### Setup

Imagine there is a base class, say `House`. It is required to create many different types of houses, like a house with a garden, a house with a pool, a house with a garage etc. One apporach is to create a subclass for each of the types, like `HouseGarden`, `HouseWithPool`, `HouseWithGarage` etc., but this approach will soon get out of hand as new types of house requirements show up.

**Issue:**

- if we follow the above approach, the `House` constructor will get inflated with all the unncessary attributes of the combined subclasses
- to create a new `House` object, we will need to call the `House` constructor, and most of the time most of the fields will be `null`.

### Solution

- Extract away the **build steps** into their own methods (like buildWalls, buildDoors etc.).
- Put the steps into **builder objects**, which will have different implementations for the same steps. The builder doesn't allow other objects to access the product while the product is being built.
- Create a **Director** class that will decide which builder objects to be called when, based on the client requirements
- The client may provide the Director class with the requirenents so the Director can execute the builders, or the client can provide the Director with its own builder with its own implementations, but the order of builder executions is still decided by the client.

### Code

Find it in [this file](./03-builder.ts).

### More

Check out the source [here](https://refactoring.guru/design-patterns/builder).

## 3. Prototype

Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes, and making sure the private fields are also copied.

### Solution

- Delegate the cloning process to the original class, by adding a `clone` method to it.
- This method will use the language's built-in way to create a new object and put the attributes of the current object in it.
- This will also take care of private vars as the class will be able to access its own private vars.

An object supporting cloning is called a prototype.

### Code

Find it in [this file](./04-prototype.ts).

### More

Check out the source [here](https://refactoring.guru/design-patterns/prototype).
