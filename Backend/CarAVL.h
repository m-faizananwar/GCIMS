#pragma once
#include <iostream>
#include "Cars.h"
#include <functional>

using namespace std;

template <typename T>
class CarAVL {
 private:
  // Definition of the tree node
  struct Node {
    T key;
    Car* car;
    int height;
    Node* left;
    Node* right;

    Node(T k, Car* c) : key(k), car(c), height(1), left(nullptr), right(nullptr) {}  };

public:
  // Pointer to the root node of the tree
  Node* root;

  // Helper function to compute the height of a given node
  int height(Node* node) {
    return node ? node->height : 0;
  }

  // Helper function to calculate the balance factor of a given node
  int balanceFactor(Node* node) {
    return height(node->right) - height(node->left);
  }

  // Helper function to fix the height of a given node after an insertion or deletion
  void fixHeight(Node* node) {
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    node->height = (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
  }

  // Helper function to perform a left rotation on a given node
  Node* rotateLeft(Node* node) {
    Node* rightChild = node->right;
    node->right = rightChild->left;
    rightChild->left = node;
    fixHeight(node);
    fixHeight(rightChild);
    return rightChild;
  }

  // Helper function to perform a right rotation on a given node
  Node* rotateRight(Node* node) {
    Node* leftChild = node->left;
    node->left = leftChild->right;
    leftChild->right = node;
    fixHeight(node);
    fixHeight(leftChild);
    return leftChild;
  }

  // Helper function to balance the tree at a given node
  Node* balance(Node* node) {
    fixHeight(node);
    if (balanceFactor(node) == 2) {
      if (balanceFactor(node->right) < 0) {
        node->right = rotateRight(node->right);
      }
      return rotateLeft(node);
    }
    if (balanceFactor(node) == -2) {
      if (balanceFactor(node->left) > 0) {
        node->left = rotateLeft(node->left);
      }
      return rotateRight(node);
    }
    return node;
  }

  // Helper function to insert a new value into the tree
  Node* insert(Node* node, T value, Car* car) {
    if (!node) {
      return new Node(value, car);
    }
    if (value < node->key) {
      node->left = insert(node->left, value, car);
    } else {
      node->right = insert(node->right, value, car);
    }
    return balance(node);
  }

      // Helper function to find the minimum value in the tree
  Node* minValueNode(Node* node) {
    while (node->left) {
      node = node->left;
    }
    return node;
  }

  // Helper function to remove a node from the tree
  Node* remove(Node* node, T value) {
    if (!node) {
      return nullptr;
    }
    if (value < node->key) {
      node->left = remove(node->left, value);
    } else if (value > node->key) {
      node->right = remove(node->right, value);
    } else {
      if (!node->left && !node->right) {
        delete node;
        return nullptr;
      } else if (!node->left) {
        Node* rightChild = node->right;
        delete node;
        return rightChild;
      } else if (!node->right) {
        Node* leftChild = node->left;
        delete node;
        return leftChild;
      } else {
        Node* minNode = minValueNode(node->right);
        node->key = minNode->key;
        node->right = remove(node->right, minNode->key);
      }
    }
    return balance(node);
  }

  // Helper function to free the memory used by the tree
  void clear(Node* node) {
    if (!node) {
      return;
    }
    clear(node->left);
    clear(node->right);
    delete node;
  }

  // Insert a new value into the tree
  void insert(T value, Car* car) {
    root = insert(root, value, car);
  }

  // Remove a value from the tree
  void remove(T value) {
    root = remove(root, value);
  }

    // Check if the tree contains a given value
    bool contains(T value) {
        Node* node = root;
        while (node) {
            if (value < node->key) {
                node = node->left;
            } else if (value > node->key) {
                node = node->right;
            } else {
                return true;
            }
        }
        return false;
    }

    Node* search (T value) {
        Node* node = root;
        while (node) {
            if (value < node->key) {
                node = node->left;
            } else if (value > node->key) {
                node = node->right;
            } else {
                return node;
            }
        }
        return nullptr;
    }

    // Helper function to print the tree in order

        void printInOrder(Node* node) {
            if (node) {
                printInOrder(node->left);
                cout << *node->car;
                
                printInOrder(node->right);
            }
        }

    void printInOrder(Node* node, const std::function<void(Car*)>& func) {
        if (node) {
            printInOrder(node->left, func);
            func(node->car);
            printInOrder(node->right, func);
        }
    }

    void printInOrder(const std::function<void(Car*)>& func) {
        printInOrder(root, func);
    }

    // Print the tree in order
    void printInOrder() {
        printInOrder(root);
        cout << endl;
    }

    // Helper function to print the tree in reverse order
    void printInReverseOrder(Node* node) {
        if (node) {
            printInReverseOrder(node->right);
            cout << *node->car;
            printInReverseOrder(node->left);
        }
    }

    void printInReverseOrder(Node* node, const std::function<void(Car*)>& func) {
        if (node) {
            printInReverseOrder(node->right, func);
            func(node->car);
            printInReverseOrder(node->left, func);
        }
    }

    void printInReverseOrder(const std::function<void(Car*)>& func) {
        printInReverseOrder(root, func);
    }

    // Print the tree in reverse order
    void printInReverseOrder() {
        printInReverseOrder(root);
        cout << endl;
    }

    // Helper function to print the tree with a date range
    void printInRange(Node* node, Date start, Date end, int& count) {
        Node *temp = search(start);
        if (node) {
            printInRange(node->left, start, end, count);
            if (node->car->purchase_date >= start && node->car->purchase_date <= end) {
                cout << *node->car;
                count++;
            }
            printInRange(node->right, start, end, count);
        }
    }

    // Print the nodes in the tree with a date range
    void printInRange(Date start, Date end) {
      int count = 0;
        printInRange(root, start, end, count);
        cout << endl;
        cout << "Number of cars in range: " << count << endl;
    }

    // Helper function to print all cars with a given make and model
    void printMakeModel(Node* node, string make, string model, int& count) {
        if (node) {
            printMakeModel(node->left, make, model, count);
            if (node->car->make == make && node->car->model == model) {
                cout << *node->car;
                count++;
            }
            printMakeModel(node->right, make, model, count);
        }
    }

    // Print all cars with a given make and model
    void printMakeModel(string make, string model) {
        int count = 0;
        printMakeModel(root, make, model, count);
        cout << endl;
        cout << "Number of cars with make and model: " << count << endl;
    }
    
};
