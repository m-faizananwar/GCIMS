#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <vector>
#include "Date.h"
#include "Cars.h"

using namespace std;

struct TrieNode {
  std::vector<TrieNode*> children;
  bool isEndOfWord;
  Car* car;
  TrieNode() : isEndOfWord(false), car(nullptr) {
    children.resize(26, nullptr);
  }
};

class Tries {
private:
  TrieNode* root;
  int index(char ch) {
    return ch - 'a';
  }

public:
  Tries() : root(new TrieNode()) {}
  void insert(std::string key, Car* car) {
    TrieNode* current = root;
    for (char ch : key) {
      int i = index(ch);
      if (!current->children[i]) {
        current->children[i] = new TrieNode();
      }
      current = current->children[i];
    }
    current->isEndOfWord = true;
    current->car = car;
  }
  Car* search(std::string key) {
    TrieNode* current = root;
    for (char ch : key) {
      int i = index(ch);
      if (!current->children[i]) {
        return nullptr;
      }
      current = current->children[i];
    }
    return current->isEndOfWord ? current->car : nullptr;
}
};

//set<string> models;

void parseData(Tries *tries) {


    int count=0;
    // Open the CSV file for reading
    ifstream csvFile("final_data.csv");

    // Read the file line by line
    string line;
    while (getline(csvFile, line)) {
        // Split the line into fields using a string stream
        istringstream lineStream(line);
        string field;

        // Store the fields in a vector
        vector<string> fields;
        while (getline(lineStream, field, ',')) {
        fields.push_back(field);
        }

        Car* car = new Car();

        // Set the car's attributes
        car->make = fields[0];
        car->model = fields[1];
        car->buyer_gender = fields[2];
        car->buyer_age = stoi(fields[3]);
        car->country = fields[4];
        car->city = fields[5];
        car->dealer_latitude = stof(fields[6]);
        car->dealer_longitude = stof(fields[7]);
        car->color = fields[8];
        if (fields[9] == "TRUE")
        {
            car->new_car = true;
        }
        else {
            car->new_car = false;
        }
        car->purchase_date = Date(fields[10]);
        car->sale_price = stof(fields[11]);
        car->top_speed = stof(fields[12]);

        // Insert in tries
        tries->insert(car->make + " " + car->model, car);

    }
    cout << "Parsing Done\nNumber of cars: " << count << endl;

    if (tries->search("Kia Sedona"))
        cout << "Found" << endl;
    else {
        cout << "Not found" << endl;
    }
    // Close the file when we are finished
    csvFile.close();

}


int main() {
    Tries *tries = new Tries();
    parseData(tries);
    return 0;
}


