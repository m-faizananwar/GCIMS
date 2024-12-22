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
    ifstream csvFile("final_data.csv");

    // Read the file line by line
    string line;
 while (getline(csvFile, line)) {
    // Skip empty lines
    if (line.empty()) continue;

    // Split the line into fields using a string stream
    istringstream lineStream(line);
    string field;

    // Store the fields in a vector
    vector<string> fields;
    while (getline(lineStream, field, ',')) {
        fields.push_back(field);
    }

    // Log the fields for debugging
    cout << "Processing line: " << line << endl;
    cout << "Fields count: " << fields.size() << endl;

    // Ensure the line has enough fields (13 fields expected based on your code)
    if (fields.size() < 13) {
        cerr << "Error: Line has insufficient fields: " << line << endl;
        continue; // Skip this line
    }

    // Proceed to parse the fields
    try {
        Car* car = new Car();

        car->make = fields[0];
        car->model = fields[1];
        car->buyer_gender = fields[2];
        car->buyer_age = stoi(fields[3]);
        car->country = fields[4];
        car->city = fields[5];
        car->dealer_latitude = stof(fields[6]);
        car->dealer_longitude = stof(fields[7]);
        car->color = fields[8];
        car->new_car = (fields[9] == "TRUE");
        car->purchase_date = Date(fields[10]);
        car->sale_price = stof(fields[11]);
        car->top_speed = stof(fields[12]);

        // Add the car to the AVL tree and hash table
        carByMake->insert(car->make, car);
        carByDate->insert(car->purchase_date, car);
        carByMakeAndModel->insert(*car, car);
        carsByCountry->insert(car->country, car);
        carByAge->insert(car->buyer_age, car);
        carsByPrice->insert(car->sale_price, car);
        globe->insertCar(car);

        count++;
    } catch (const exception& e) {
        cerr << "Error parsing line: " << line << endl;
        cerr << "Exception: " << e.what() << endl;
        continue;
    }
}


    cout << "Parsing Done\nNumber of cars: " << count << endl;

    // Close the file when we are finished
    csvFile.close();
}

