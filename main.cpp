
#include <iostream>
#include "parser.h"
#include "Functions.h"
#include "Date.h"
#include "crow.h"

int main() {
    
    parsingData();
    int choice = 0;
    bool ascending = true;
    string date;
    string country;
    Date start ;
    Date end ;
    int startRange;
    int endRange;
    float price;
    float latitude;
    float longitude;
    int radius;
    float latitude1;
    float longitude1;
    float latitude2;
    float longitude2;

    crow::SimpleApp app;

    // Define a route
    CROW_ROUTE(app, "/")([]() {
        return "Hello, Bro Crow!";
    });

    // Start the server
    app.port(8080).multithreaded().run();
}