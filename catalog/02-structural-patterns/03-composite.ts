// Original code: https://refactoring.guru/design-patterns/composite/typescript/example

/**
 * In this pattern, we have three types of classes: Component, Leaf and Composite.
 * A Component reprsents a node, and it may contain another Component or a Leaf.
 * This relationship can be established by setting a parent attribute of Component to Component,
 * and by extended Leaf to a Component.
 *
 * The Composite class represents a tree, or a branch of a tree.
 * It will have operations that delegate to the Component children, as well as methods to help build the tree.
 * The client code needs to interact with this Composite and Leaf classes.
 */

/**
 * The Component is an abstract class.
 * It will have parent to another component, or null (if so, root).
 * It will have setters and getters to get the parents.
 * It will have empty methods to add or remove components to itself.
 * It will have an abstract operation method which will be delegated to a Leaf.
 */
abstract class Component {
  private _parent!: Component | null;

  set parent(component: Component | null) {
    this._parent = component;
  }

  get parent() {
    return this._parent;
  }

  public add(component: Component): void {}
  public remove(component: Component): void {}

  public isCompsite() {
    return false;
  }

  public abstract operation(): string;
}

/**
 * The Leaf class is where the Component, or the node, will delegate its work, or operation, to.
 * In this example, it's just a string which says it's a leaf.
 */
class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}

/**
 * The Composite class represents the complex elements in the tree that may have children.
 * It would delegate its operation down to its children.
 * And it will have implementations of methods of modifying the tree or the branch.
 */
class Composite extends Component {
  protected children: Component[] = [];

  public add(component: Component) {
    this.children.push(component);
    component.parent = this;
  }

  public remove(component: Component) {
    const ind = this.children.indexOf(component);
    if (ind === -1) {
      console.error(
        `ERR: Component ${component.operation()} not present in tree to remove`,
      );
      return;
    }
    this.children.splice(ind, 1);
  }

  public isCompsite(): boolean {
    return true;
  }

  public operation(): string {
    const results = this.children.map((child) => child.operation());
    const compositeOperation = results.join("+");
    return `Branch(${compositeOperation})`;
  }
}

// CLIENT CODES
function clientCodeComposite(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

console.log("Operating on leaf level");
const leaf = new Leaf();
clientCodeComposite(leaf);
console.log();

console.log("Operating on tree level with two branches");
const tree = new Composite();
const branch1 = new Composite();
let branch2 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
clientCodeComposite(tree);
console.log();

function extendBranchOrTree(
  branch: Component,
  extension: Component,
): Composite {
  if (branch.isCompsite()) {
    branch.add(extension);
  } else console.error(`ERR: Component ${branch} is not a composite`);
  return branch as Composite;
}
console.log("Extending tree with a leaf");
const extendedTree = extendBranchOrTree(tree, leaf);
clientCodeComposite(extendedTree);
console.log();

console.log("Extending second branch with a leaf");
tree.remove(branch2);
tree.remove(leaf);
branch2 = extendBranchOrTree(branch2, leaf);
tree.add(branch2);
tree.add(leaf);
clientCodeComposite(tree);

/* OUTPUT:
Operating on leaf level
RESULT: Leaf

Operating on tree level with two branches
RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf))

Extending tree with a leaf
RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf)+Leaf)

Extending second branch with a leaf
RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf+Leaf)+Leaf)
*/
