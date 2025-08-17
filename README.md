# Design Patterns Notes

> **Note:** All these notes, code examples and learnings that I'm doing are from this website: https://refactoring.guru/design-patterns.

A design pattern is a "blueprint" for solving commonly-occuring problems.

It differs from an algorithm in the sense that an algorithm has a well-defined set of actions to achieve the goal, whereas the implementation would vary in a design pattern from problem to problem.

A pattern usually consists of:

- an **intent** which briefly defines the problem and the solution,
- a **movitation** to further explain the problem and its solution,
- a **structure** that shows how different parts of the problem are related,
- an **implementation** containing code.

## Classification of patterns

Based on their _levels_, there are _two_ kinds of patterns:

- **idioms**, which are basic and low-level patterns, and often apply to a single programming language;
- **architectural patterns**, which are high-level, universal patterns that are used to design the architecture of the entire application in pretty much any programming language.

Based on their _intent_, there are _three_ kinds of patterns, which will be discussed in this tutorial.

1. **Creational patterns**, that delve into object creation.
2. **Structural patterns**, that explain how to group these objects and their classes into larger, flexible and efficient structures.
3. **Behavioral patterns**, that take care of the assignment of responsibilities for the objects, and the communication between different objects.

Details on these patterns will be provided in their respective folders.

### Running the code

All the code examples I've recreated (or will recreate) will be in TypeScript.

I intend to run all the TS code in my Terminal. For that, the command I would use is:

```
npx tsx <filename>
```

For example:

```sh
npx tsx ./01-factory-method.ts
```

This uses `tsx` package. Running this command the first time will ask for permission to install the `tsx` package. Once that is done, it will run automatically from the next time.

---
