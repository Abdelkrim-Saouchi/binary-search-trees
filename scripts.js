class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = null;
  }

  buildTree() {
    const uniqueArr = this.removeDuplicates();
    const uniqueSortedArr = this.mergeSort(uniqueArr);
    console.log(uniqueSortedArr);

    if (uniqueSortedArr.length === 0) return null;

    const middle = Math.floor(uniqueSortedArr.length / 2);
    this.root = new Node(uniqueSortedArr[middle]);

    const q = [
      [this.root, [0, middle - 1]],
      [this.root, [middle + 1, uniqueSortedArr.length - 1]],
    ];

    while (q.length > 0) {
      const [parent, [left, right]] = q.shift();

      if (left <= right && parent != null) {
        const middle = Math.floor((left + right) / 2);
        const child = new Node(uniqueSortedArr[middle]);

        if (child.data < parent.data) {
          parent.left = child;
        } else {
          parent.right = child;
        }

        q.push([child, [left, middle - 1]]);
        q.push([child, [middle + 1, right]]);
      }
    }
    return this.root;
  }

  removeDuplicates() {
    return [...new Set(this.arr)];
  }

  merge(array1, array2) {
    let i = 0;
    let j = 0;
    let k = 0;
    const resultArray = [];

    while (i < array1.length && j < array2.length) {
      if (array1[i] < array2[j]) {
        resultArray[k] = array1[i];
        i++;
        k++;
      } else {
        resultArray[k] = array2[j];
        j++;
        k++;
      }
    }

    for (; i < array1.length; i++) {
      resultArray[k] = array1[i];
      k++;
    }
    for (; j < array2.length; j++) {
      resultArray[k] = array2[j];
      k++;
    }
    return resultArray;
  }

  mergeSort(array) {
    //base case
    if (array.length < 2) {
      return array;
      // recursive case
    } else {
      // find middle
      let middle = Math.floor((0 + array.length - 1) / 2);
      // left side
      let leftArray = array.slice(0, middle + 1);
      // right side
      let rightArray = array.slice(middle + 1, array.length);

      return this.merge(this.mergeSort(leftArray), this.mergeSort(rightArray));
    }
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  printTree() {
    this.prettyPrint(this.root);
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let prevNode = null;
    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.data > value) {
        prevNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        prevNode = currentNode;
        currentNode = currentNode.right;
      }
    }
    if (prevNode.data > value) {
      prevNode.left = node;
    } else {
      prevNode.right = node;
    }
  }

  delete(value) {
    let currentNode = this.root;
    let prevNode = null;

    if (currentNode == null) {
      return;
    }

    while (currentNode && currentNode.data !== value) {
      if (currentNode.data > value) {
        prevNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        prevNode = currentNode;
        currentNode = currentNode.right;
      }
    }
    if (currentNode == null) return;

    if (currentNode.left == null) {
      prevNode.right = currentNode.right;
      return;
    } else if (currentNode.right == null) {
      prevNode.right = currentNode.left;
      return;
    } else {
      let successorParent = currentNode;
      let successor = successorParent.right;

      while (successor.left != null) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent != currentNode)
        successorParent.left = successor.right;
      else successorParent.right = successor.right;

      currentNode.data = successor.data;
      return;
    }
  }

  find(value) {
    let currentNode = this.root;
    if (currentNode == null) {
      return currentNode;
    }

    while (currentNode) {
      if (currentNode.data === value) return currentNode;
      else {
        if (currentNode.data > value) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return null;
  }

  levelOrder(fn) {
    if (this.root == null) return;
    const q = [];
    let levelOrderNodes = [];
    q.push(this.root);

    while (q.length !== 0) {
      const currentNode = q.shift();
      levelOrderNodes.push(currentNode);
      if (currentNode.left != null) q.push(currentNode.left);
      if (currentNode.right != null) q.push(currentNode.right);
    }

    levelOrderNodes.forEach((node) => {
      if (fn != null) {
        fn(node);
        return;
      }
    });
    levelOrderNodes = levelOrderNodes.map((node) => node.data);

    return levelOrderNodes;
  }

  preOrder(fn, root = this.root) {
    const nodes = [];
    function traverse(currentNode) {
      if (currentNode == null) return;
      if (fn != null) {
        fn(currentNode);
      } else {
        nodes.push(currentNode.data);
      }
      traverse(currentNode.left);
      traverse(currentNode.right);
    }

    traverse(root);

    return nodes;
  }

  inOrder(fn, root = this.root) {
    const nodes = [];
    function traverse(currentNode) {
      if (currentNode == null) return;

      traverse(currentNode.left);
      if (fn != null) {
        fn(currentNode);
      } else {
        nodes.push(currentNode.data);
      }
      traverse(currentNode.right);
    }

    traverse(root);

    return nodes;
  }

  postOrder(fn, root = this.root) {
    const nodes = [];
    function traverse(currentNode) {
      if (currentNode == null) return;

      traverse(currentNode.left);
      traverse(currentNode.right);
      if (fn != null) {
        fn(currentNode);
      } else {
        nodes.push(currentNode.data);
      }
    }

    traverse(root);

    return nodes;
  }

  height(node) {
    if (node == null) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }

  depth(node) {
    let currentNode = this.root;
    let counter = 0;
    while (currentNode.data !== node.data) {
      if (currentNode.data > node.data) {
        counter++;
        currentNode = currentNode.left;
      } else if (currentNode.data < node.data) {
        counter++;
        currentNode = currentNode.right;
      }
    }
    return counter;
  }

  isBalanced(root = this.root) {
    if (root == null) return true;

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    let difference = Math.abs(leftHeight - rightHeight);

    if (
      difference <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    ) {
      return true;
    }

    return false;
  }
}

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr1);

tree.buildTree();
tree.insert(2);
// console.log(tree.find(0));
tree.printTree();
// console.log(tree.preOrder());
// console.log(tree.inOrder());
// console.log(tree.postOrder());
// const node = tree.find(8);
// console.log(tree.height(node));
// console.log(tree.depth(node));
console.log(tree.isBalanced());
// tree.preOrder(console.log);
// tree.levelOrder(console.log);
// console.log(tree.levelOrder());
