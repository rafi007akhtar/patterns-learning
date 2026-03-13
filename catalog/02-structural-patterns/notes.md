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
