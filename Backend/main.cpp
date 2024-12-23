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
    CROW_ROUTE(app, "/cars")([]() {
        ifstream ifs("D:/gcims-backend/GCIMS/Backend/final_data.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        return crow::response(json);
    });
    CROW_ROUTE(app, "/cars/sorted/make/<string>")([](const std::string& order) {
        bool ascending = (order == "ascending");
        rewriteJsonSortedByKey("make", ascending);
        ifstream ifs("D:/gcims-backend/GCIMS/Backend/final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        return crow::response(json);
    });

    

    CROW_ROUTE(app, "/cars/sorted/make_and_model/<string>")([](const std::string& order) {
        bool ascending = (order == "ascending");
        rewriteJsonSortedByKey("make_and_model", ascending);
        ifstream ifs("D:/gcims-backend/GCIMS/Backend/final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        return crow::response(json);
    });

    CROW_ROUTE(app, "/cars/sorted/age/<string>")([](const std::string& order) {
        bool ascending = (order == "ascending");
        rewriteJsonSortedByKey("age", ascending);
        ifstream ifs("D:/gcims-backend/GCIMS/Backend/final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        return crow::response(json);
    });

    CROW_ROUTE(app, "/cars/sorted/date/<string>")([](const std::string& order) {
        bool ascending = (order == "ascending");
        rewriteJsonSortedByKey("date", ascending);
        ifstream ifs("D:/gcims-backend/GCIMS/Backend/final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        return crow::response(json);
    });

    CROW_ROUTE(app, "/cars/sorted/price/<string>")([](const std::string& order) {
        bool ascending = (order == "ascending");
        rewriteJsonSortedByKey("price", ascending);
        ifstream ifs("D:/gcims-backend/GCIMS/Backend/final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        return crow::response(json);
    });
    // Start the server
    app.port(8080).multithreaded().run();
}