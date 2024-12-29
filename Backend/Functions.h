#pragma once
#include <iostream>
#include "parser.h"
#include "Cars.h"
#include "CarAVL.h"
#include "CarTAVL.h"
#include "HashTable.h"
#include "HashMatrix.h"

using namespace std;

// Forward declarations
bool carExists(const string& make, const string& model, const Date& date);
void updateCarInCSV(const Car* oldCar, const Car* newCar);
void deleteFromCSV(const string& make, const string& model, const Date& date);
void appendToCSV(const Car* car);
void openCSVForAppend(ofstream& csvFile);
void closeCSV(ofstream& csvFile);

// AVL trees for each of the three attributes
CarAVL <Car> * carsByMakeAndModel = new CarAVL<Car>();
CarAVL <Date> * carsByDate = new CarAVL<Date>();
CarAVL <string> * carsByMake = new CarAVL<string>();
CarTAVL <string> * carsByCountry = new CarTAVL<string>();

// Hash table for the country attribute
HashTable <int>* carsByAge = new HashTable<int>(75, "age");
HashTable <float>* carsByPrice = new HashTable<float>(150, "price");

// Hash matrix for the location attribute
Globe * globe = new Globe();

void parsingData()
{
    parseData(carsByMake, carsByDate, carsByMakeAndModel, carsByCountry, carsByPrice, carsByAge, globe);
}

void sortedPrint(string key, bool ascending)
{
    cout << "Cars sorted by " << key << endl;
    if (key == "make")
    {
        if (ascending)
            carsByMake->printInOrder();
        else
            carsByMake->printInReverseOrder();
    }
    else if (key == "date")
    {
        if (ascending)
            carsByDate->printInOrder();
        else
            carsByDate->printInReverseOrder();
    }
    else if (key == "make and model")
    {
        if (ascending)
            carsByMakeAndModel->printInOrder();
        else
            carsByMakeAndModel->printInReverseOrder();
    }
    else if (key == "age")
    {
        if (ascending)
            carsByAge->sortedPrint();
        else
            carsByAge->reversePrint();
    }
    else if (key == "price")
    {
        if (ascending)
            carsByPrice->sortedPrint();
        else
            carsByPrice->reversePrint();
    }
    else
        cout << "Invalid key" << endl;
}

void searchByAge(int age)
{
    int count = 0;
    cout << "Cars sold to age: " << age << endl;
    carsByAge->printValues(age, count);
    cout << "Total cars sold to age " << age << ": " << count << endl;
}

void searchByPrice(float price)
{
    cout << "Cars sold at price: " << price << endl;
    carsByPrice->searchPrice(price);
}

void searchByLocation(float latitude, float longitude, int radius)
{
    cout << "Cars sold in region: " << latitude << " and " << longitude << " and " << radius << endl;
    globe->printByRegion(longitude, latitude, radius);
}

void searchByCoordinates(int latitude, int longitude)
{
    cout << "Cars sold at coordinates: " << latitude << " and " << longitude << endl;
    globe->printByCoordinates(longitude, latitude);
}

void printMap()
{
    globe->printRegions();
}

void searchByRectangle(float latitude1, float longitude1, float latitude2, float longitude2)
{
    cout << "Cars sold in: (" << latitude1 << " , " << longitude1 << ") to (" << latitude2 << " , " << longitude2 << ")" << endl;
    globe->printRectangularRegion(longitude1, latitude1, longitude2, latitude2);
}

void rewriteJsonSortedByKey(const std::string& key, bool ascending)
{
    ofstream jsonFile("../../final_data2.json");
    jsonFile << "[\n";
    bool firstEntry = true;

    auto writeCarToJson = [&](Car* car) {
        if (!firstEntry) {
            jsonFile << ",\n";
        } else {
            firstEntry = false;
        }
        jsonFile << "  {\n"
         << "    \"carName\": \"" << car->make << " " << car->model << "\",\n"
         << "    \"brand\": \""  << car->model << "\",\n"
         << "    \"model\": \"" << car->model << "\",\n"
         << "    \"price\": " << car->sale_price << ",\n"
         << "    \"speed\": " << car->top_speed << ",\n"
         << "    \"location\": \"" << car->country << "\",\n"
         << "    \"gender\": \"" << car->buyer_gender << "\",\n"
         << "    \"new_car\": " << (car->new_car ? "true" : "false") << ",\n"
         << "    \"buyer_age\": " << car->buyer_age << ",\n"
         << "    \"city\": \"" << car->city << "\",\n"
         << "    \"dealer_latitude\": " << car->dealer_latitude << ",\n"
         << "    \"dealer_longitude\": " << car->dealer_longitude << ",\n"
         << "    \"color\": \"" << car->color << "\"\n"
         << "  }";

    };

    if (key == "make") {
        if (ascending) {
            carsByMake->printInOrder(writeCarToJson);
        } else {
            carsByMake->printInReverseOrder(writeCarToJson);
        }
    }
    else if (key == "make_and_model") {
        if (ascending) {
            carsByMakeAndModel->printInOrder(writeCarToJson);
        } else {
            carsByMakeAndModel->printInReverseOrder(writeCarToJson);
        }
    }
    else if (key == "age") {
        if (ascending) {
            carsByAge->sortedPrint(writeCarToJson);
        } else {
            carsByAge->reversePrint(writeCarToJson);
        }
    }
    else if (key == "date") {
        if (ascending) {
            carsByDate->printInOrder(writeCarToJson);
        } else {
            carsByDate->printInReverseOrder(writeCarToJson);
        }
    }
    else if (key == "price") {
        if (ascending) {
            carsByPrice->sortedPrint(writeCarToJson);
        } else {
            carsByPrice->reversePrint(writeCarToJson);
        }
    }

    jsonFile << "\n]\n";
    jsonFile.close();
}

void rewriteJsonWithSearchResults(const std::vector<Car*>& cars) {
    ofstream jsonFile("../../final_data2.json");
    jsonFile << "[\n";
    bool firstEntry = true;

    for (const auto& car : cars) {
        if (!firstEntry) {
            jsonFile << ",\n";
        } else {
            firstEntry = false;
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
         << "    \"registration_date\": \"" << car->purchase_date << "\"\n"
         << "  }";          }

    jsonFile << "\n]\n";
    jsonFile.close();
}

std::vector<Car*> findCarsByName(const std::string& name) {
    std::vector<Car*> results;
    if (carsByMake->search(name)) {
        auto node = carsByMake->search(name);
        results.push_back(node->car);
    }
    return results;
}

std::vector<Car*> findCarsByDateRange(const Date& start, const Date& end) {
    std::vector<Car*> results;
    carsByDate->collectInRange(carsByDate->root, start, end, results);
    return results;
}

std::vector<Car*> findCarsByPriceRange(float minPrice, float maxPrice) {
    std::vector<Car*> results;
    carsByPrice->collectInRange(minPrice, maxPrice, results);
    return results;
}

std::vector<Car*> findCarsByCountry(const std::string& country) {
    std::vector<Car*> results;
    if (auto node = carsByCountry->search(country)) {
        while (node) {
            results.push_back(node->car);
            node = node->next;
        }
    }
    return results;
}

std::vector<Car*> searchCars(const std::string& name, const std::string& model, const std::string& country, float minPrice, float maxPrice) {
    std::vector<Car*> results;
    for (auto head : carsByPrice->getTable()) {
        auto current = head;
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

// CSV file handling functions
void openCSVForAppend(ofstream& csvFile) {
    csvFile.open("../../final_data.csv", ios::app);
    if (!csvFile.is_open()) {
        throw runtime_error("Cannot open CSV file for appending");
    }
}

void closeCSV(ofstream& csvFile) {
    csvFile.close();
}

void appendToCSV(const Car* car) {
    ofstream csvFile;
    openCSVForAppend(csvFile);
    
    csvFile << car->make << ","
            << car->model << ","
            << car->buyer_gender << ","
            << car->buyer_age << ","
            << car->country << ","
            << car->city << ","
            << car->dealer_latitude << ","
            << car->dealer_longitude << ","
            << car->color << ","
            << (car->new_car ? "TRUE" : "FALSE") << ","
            << car->purchase_date.day << "/"
            << car->purchase_date.month << "/"
            << car->purchase_date.year << ","
            << car->sale_price << ","
            << car->top_speed << endl;
    
    closeCSV(csvFile);
}

// Function to delete a line from CSV
void deleteFromCSV(const string& make, const string& model, const Date& date) {
    ifstream inFile("../../final_data.csv");
    if (!inFile.is_open()) {
        throw runtime_error("Cannot open CSV file for reading");
    }

    ofstream tempFile("../../temp.csv");
    if (!tempFile.is_open()) {
        inFile.close();
        throw runtime_error("Cannot create temporary file");
    }
    
    string line;
    bool found = false;
    
    // Copy header if exists
    if (getline(inFile, line)) {
        tempFile << line << endl;
    }
    
    // Process remaining lines
    while (getline(inFile, line)) {
        istringstream ss(line);
        string field;
        vector<string> fields;
        
        while (getline(ss, field, ',')) {
            fields.push_back(field);
        }
        
        if (fields.size() >= 11 && fields[0] == make && fields[1] == model) {
            Date lineDate(fields[10]);
            if (lineDate == date) {
                found = true;
                continue; // Skip this line
            }
        }
        tempFile << line << endl;
    }
    
    inFile.close();
    tempFile.close();
    
    if (!found) {
        remove("../../temp.csv");
        throw runtime_error("Record not found");
    }
    
    // On Windows, we need to ensure the original file is closed before removing
    if (remove("../../final_data.csv") != 0) {
        throw runtime_error("Could not remove original file");
    }
    
    if (rename("../../temp.csv", "../../final_data.csv") != 0) {
        throw runtime_error("Could not rename temporary file");
    }
}

bool carExists(const string& make, const string& model, const Date& date) {
    ifstream inFile("../../final_data.csv");
    if (!inFile.is_open()) {
        throw runtime_error("Cannot open CSV file for reading");
    }
    
    string line;
    // Skip header
    getline(inFile, line);
    
    while (getline(inFile, line)) {
        istringstream ss(line);
        string field;
        vector<string> fields;
        
        while (getline(ss, field, ',')) {
            fields.push_back(field);
        }
        
        if (fields.size() >= 11 && fields[0] == make && fields[1] == model) {
            Date lineDate(fields[10]);
            if (lineDate == date) {
                inFile.close();
                return true;
            }
        }
    }
    inFile.close();
    return false;
}

void updateCarInCSV(const Car* oldCar, const Car* newCar) {
    // First delete the old entry
    deleteFromCSV(oldCar->make, oldCar->model, oldCar->purchase_date);   
    appendToCSV(newCar);
}
