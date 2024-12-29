#pragma once
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <vector>
#include "Date.h"
#include "Cars.h"
#include "CarAVL.h"
#include "CarTAVL.h"
#include "HashTable.h"
#include "HashMatrix.h"
#include <set>

using namespace std;

void parseData(CarAVL <string>* carByMake, CarAVL <Date>* carByDate, CarAVL <Car>* carByMakeAndModel, CarTAVL <string> * carsByCountry, HashTable <float>* carsByPrice, HashTable <int>* carByAge, Globe * globe ) {
  
    int count=0;
    // Open the CSV file for reading
    ifstream csvFile("../../final_data.csv");
    if (!csvFile.is_open()) {
        cout << "Error opening file" << endl;
        return;
    }
    // Open the JSON file for writing
    ofstream jsonFile("../../final_data.json");
    jsonFile << "[\n";
    bool first = true;

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

        // Add the car to the AVL tree
        carByMake->insert(car->make, car);
        carByDate->insert(car->purchase_date, car);
        carByMakeAndModel->insert(*car, car);
        carsByCountry->insert(car->country, car);
        
        // Add the car to the hash table
        carByAge->insert(car->buyer_age, car);
        carsByPrice->insert(car->sale_price, car);

        // Add the car to the globe
        globe->insertCar(car);

        // Write the car to the JSON file
        if (!first) {
            jsonFile << ",\n";
        } else {
            first = false;
        }
      jsonFile << "  {\n"
         << "    \"carName\": \"" << car->make << " " << car->model << "\",\n"
         << "    \"brand\": \""  << car->make << "\",\n"
         << "    \"model\": \"" << car->model << "\",\n"
         << "    \"price\": " << car->sale_price << ",\n"
         << "    \"speed\": " << car->top_speed << ",\n"
         << "    \"country\": \"" << car->country << "\",\n"
         << "    \"gender\": \"" << car->buyer_gender << "\",\n"
         << "    \"new_car\": " << (car->new_car ? "true" : "false") << ",\n"
         << "    \"age\": " << car->buyer_age << ",\n"
         << "    \"city\": \"" << car->city << "\",\n"
         << "    \"dealer_latitude\": " << car->dealer_latitude << ",\n"
         << "    \"dealer_longitude\": " << car->dealer_longitude << ",\n"
         << "    \"color\": \"" << car->color << "\",\n"
         << "    \"registration_date\": " << car->purchase_date << ",\n"
         << "  }";
  
        // Increment the count
        count++;

    }
    cout << "Parsing Done\nNumber of cars: " << count << endl;

    // Close the files when we are finished
    csvFile.close();
    jsonFile << "\n]\n";
    jsonFile.close();
}

