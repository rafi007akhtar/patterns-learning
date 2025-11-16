// Original code: https://refactoring.guru/design-patterns/singleton/typescript/example

class Singleton {
  private static instance: Singleton;
  public id: string;

  private constructor() {
    this.id = Math.random().toString();
  }

  static getOrCreateInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

function clientCodeSingleton() {
  const s1 = Singleton.getOrCreateInstance();
  const s2 = Singleton.getOrCreateInstance();

  s1.id === s2.id
    ? console.log(`Both instances have the same id: ${s1.id}`)
    : console.log(`Both instances have different ids: ${s1.id} and ${s2.id}`);
}
clientCodeSingleton();
clientCodeSingleton();
