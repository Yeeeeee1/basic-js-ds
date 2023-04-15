const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootTie = null;
  }

  root() {
    return this.rootTie;
  }

  add(data) {
    this.rootTie = addDataInside(this.rootTie, data);

    function addDataInside(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        node.left = addDataInside(node.left, data);
      } else {
        node.right = addDataInside(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchInside(this.rootTie, data);

    function searchInside(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data > node.data
        ? searchInside(node.right, data)
        : searchInside(node.left, data);
    }
  }

  find(data) {
    return searchInside(this.rootTie, data);

    function searchInside(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data > node.data
        ? searchInside(node.right, data)
        : searchInside(node.left, data);
    }
  }

  remove(data) {
    this.rootTie = removeData(this.rootTie, data);

    function removeData(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeData(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootTie) {
      return;
    }
    let node = this.rootTie;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootTie) {
      return;
    }
    let node = this.rootTie;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
