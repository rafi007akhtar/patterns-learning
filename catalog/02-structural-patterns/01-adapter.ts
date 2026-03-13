// Original code: https://refactoring.guru/design-patterns/adapter/typescript/example

// Target class has the default method that the client can work with
class Target {
  request(): string {
    return "[TARGET] The default behaviour";
  }
}

// The adaptee is a class which the client cannot directly work with, because of its erratic behaviour
class Adaptee {
  specificRequest(): string {
    return "erratic is behaviour My";
  }
}

// The Adapter class does two things:
// 1. extends over the Target class so the client can use its methods
// 2. bridges Adaptee method so client can use its methods
class Adapter extends Target {
  adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request(): string {
    const erraticRequest = this.adaptee.specificRequest();
    const fixedRequest = erraticRequest.split(" ").reverse().join(" ");
    return `[ADAPTER]: ${fixedRequest}`;
  }
}

function clientCodeAdapter(target: Target) {
  console.log(target.request());
}

console.log("[CLIENT]: Working with Target objects");
const target = new Target();
clientCodeAdapter(target);
console.log();

console.log("[CLIENT] Cannot work with Adaptee objects");
const adaptee = new Adaptee();
console.log(`[ADAPTEE]: ${adaptee.specificRequest()}\n`);

console.log("[CLIENT]: Working with the Adapter objects");
const adapter = new Adapter(adaptee);
clientCodeAdapter(adapter);

/* OUTPUT 
[CLIENT]: Working with Target objects
[TARGET] The default behaviour

[CLIENT] Cannot work with Adaptee objects
[ADAPTEE]: erratic is behaviour My

[CLIENT]: Working with the Adapter objects
[ADAPTER]: My behaviour is erratic
*/
