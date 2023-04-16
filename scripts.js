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

    while (currentNode) {}
  }
}

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr1);

tree.buildTree();
tree.printTree();
