#pragma once
#include <iostream>
#include <vector>
#include <unordered_map>
#include "Cars.h"
template <typename V>
struct Node {
  V key;
  Car* car;
  Node* next = NULL;
  Node(V k, Car* v, Node* n) : key(k), car(v), next(n) {}
};

template <typename K>
class HashTable {
private:
  std::vector<Node<K>*> table;
  std::size_t size;
  std::size_t capacity;
  std::string type;

  std::size_t hash(K key, string type) {
    if (type == "age")
      return std::hash<K>{}(key) - 10;
    else if (type == "price") // if price ranges from 10000 to 100000
    {
      int key1=(key/1000)-10;
      return std::hash<int>{}(key1);
    }
    else 
      return std::hash<K>{}(key);
  }
public:

  HashTable(std::size_t capacity, std::string type)
  {
    this->capacity = capacity;
    this->type = type;
    table.resize(capacity, nullptr);
  }

  void insert(K key, Car* car) {
    std::size_t index = hash(key, type) % capacity;
    Node<K>* newNode = new Node<K>(key, car, table[index]);
    table[index] = newNode;
    ++size;
  }

  Car* search(K key) {
    std::size_t index = hash(key, type) % capacity;
    Node<K>* current = table[index];
    while (current && current->key != key) {
      current = current->next;
    }
    return current ? current->car : Car();
  }
  void remove(K key) {
    std::size_t index = hash(key, type) % capacity;
    Node<K>* current = table[index];
    if (current && current->key == key) {
      table[index] = current->next;
      delete current;
      --size;
      return;
    }
    while (current && current->next) {
      if (current->next->key == key) {
        Node<K>* temp = current->next;
        current->next = temp->next;
        delete temp;
        --size;
        return;
      }
      current = current->next;
    }
  }
  void remove(K key, Car* car) {
    std::size_t index = hash(key, type) % capacity;
    Node<K>* current = table[index];
    if (current && current->key == key && current->car == car) {
      table[index] = current->next;
      delete current;
      --size;
      return;
    }
    while (current && current->next) {
      if (current->next->key == key && current->next->car == car) {
        Node<K>* temp = current->next;
        current->next = temp->next;
        delete temp;
        --size;
        return;
      }
      current = current->next;
    }
  }
  std::size_t getSize() {
    return size;
  }
  std::size_t getCapacity() {
    return capacity;
  }
  void sortedPrint() {
    // Collect all car pointers
    vector<Car*> allCars;
    for (auto head : table) {
      Node<K>* current = head;
      while (current) {
        allCars.push_back(current->car);
        current = current->next;
      }
    }
    // Sort in ascending order by sale_price
    std::sort(allCars.begin(), allCars.end(), [](Car* a, Car* b){
      return a->sale_price < b->sale_price;
    });
    // Print
    for (auto car : allCars) {
      cout << *car;
    }
  }

  void reversePrint() {
    // Collect all car pointers
    vector<Car*> allCars;
    for (auto head : table) {
      Node<K>* current = head;
      while (current) {
        allCars.push_back(current->car);
        current = current->next;
      }
    }
    // Sort in descending order by sale_price
    std::sort(allCars.begin(), allCars.end(), [](Car* a, Car* b){
      return a->sale_price > b->sale_price;
    });
    // Print
    for (auto car : allCars) {
      cout << *car;
    }
  }

  void sortedPrint(const std::function<void(Car*)>& func) {
    vector<Car*> allCars;
    for (auto head : table) {
      Node<K>* current = head;
      while (current) {
        allCars.push_back(current->car);
        current = current->next;
      }
    }
    std::sort(allCars.begin(), allCars.end(), [](Car* a, Car* b){
      return a->sale_price < b->sale_price;
    });
    for (auto car : allCars) {
      func(car);
    }
  }

  void reversePrint(const std::function<void(Car*)>& func) {
    vector<Car*> allCars;
    for (auto head = table.begin(); head != table.end(); ++head) {
      Node<K>* current = *head;
      while (current) {
        allCars.push_back(current->car);
        current = current->next;
      }
    }
    std::sort(allCars.begin(), allCars.end(), [](Car* a, Car* b){
      return a->sale_price > b->sale_price;
    });
    for (auto car : allCars) {
      func(car);
    }
  }

  void printValues(K key, int &count){
    std::size_t index = hash(key, type) % capacity;
    Node<K>* current = table[index];
    while (current!=NULL) {
      std::cout << *current->car << std::endl;
      count++;
      current = current->next;
    }
    cout << "Total number of cars: " << count << endl;
  }

  void printPriceRange(K key1, K key2) {
    int count = 0;
    for (auto i : table) {
      Node<K>* current = i;
      while (current) {
        if (current->key >= key1 && current->key <= key2) {
          std::cout << *current->car << std::endl;
          count++;
        }
        current = current->next;
      }
    }
    cout << "Total number of cars: " << count << endl;
  }

  void searchPrice(K key) {
    int count = 0;
    std::size_t index = hash(key, type) % capacity;
    Node<K>* current = table[index];
    while (current) {
      if (current->key == key) {
        std::cout << *current->car << std::endl;
        count++;
      }
      current = current->next;
    }
    cout << "Total number of cars: " << count << endl;
  }

  void printRange(K key1, K key2) {
    int count = 0;
    for (int i = key1; i <= key2; i+=1000) {
      printValues(i, count);
      }
    cout << "Total number of cars: " << count << endl;
    }

  std::vector<Car*> searchCars(const std::string& name, const std::string& model, const std::string& country, float minPrice, float maxPrice) {
    std::vector<Car*> results;
    for (auto head : table) {
        Node<K>* current = head;
        while (current) {
            Car* car = current->car;
            if ((name.empty() || car->make == name) &&
                (model.empty() || car->model == model) &&
                (country.empty() || car->country == country) &&
                (car->sale_price >= minPrice && car->sale_price <= maxPrice)) {
                results.push_back(car);
            }
            current = current->next;
        }
    }
    return results;
  }

  const std::vector<Node<K>*>& getTable() const {
    return table;
  }

  void collectInRange(K key1, K key2, std::vector<Car*>& results) {
    for (auto i : table) {
      Node<K>* current = i;
      while (current) {
        if (current->key >= key1 && current->key <= key2) {
          results.push_back(current->car);
        }
        current = current->next;
      }
    }
  }
  
};

