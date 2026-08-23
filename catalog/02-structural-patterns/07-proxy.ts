// Original code: https://refactoring.guru/design-patterns/proxy/typescript/example

/**
 * Declare the interface for the core ("Service") class, which perhaps performs a request.
 * Define the core class, with a sample request implementation.
 * Define the proxy class, which implements the core interface.
 * * It inits a core object.
 * * It has methods for access check and logging.
 * * It overrides the core request method by first checking if access is there and then performing the request, with log.
 * For the client code, create objects of core as well as proxy, and call the request method in both.
 */

// NOTE: in the code, I shall refrain from reusing terms from the original code like Service or Subject.
// This is done to avoid any confusion / clash with Angular terms, which I normally use in my Angular project.

interface ICore {
  request(): void;
}

class Core implements ICore {
  request(): void {
    console.log("... performing access-sensitive request ...");
  }
}

class MyProxy implements ICore {
  private core: Core;

  constructor(core: Core) {
    this.core = core;
  }

  hasAccess(): boolean {
    console.log("Checking if user has access to fire request ...");
    // For simpilicity, this method always returns true
    return true;
  }

  log(): void {
    console.log("LOG: request performed");
  }

  request(): void {
    if (this.hasAccess()) {
      this.core.request();
      this.log();
    }
  }
}

// CLIENT CODE
function clientCodeProxy(core: Core) {
  core.request();
}

const core = new Core();
console.log("Executing core operation");
clientCodeProxy(core);

console.log();

const proxy = new MyProxy(core);
console.log("Executing proxied core operation");
clientCodeProxy(proxy);

/* OUTPUT:
Executing core operation
... performing access-sensitive request ...

Executing proxied core operation
Checking if user has access to fire request ...
... performing access-sensitive request ...
LOG: request performed
*/
