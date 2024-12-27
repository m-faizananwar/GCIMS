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
    Date start;
    Date end;
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

    // Define a route with CORS headers
    auto addCORS = [](crow::response& res) {
        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.add_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    };

    CROW_ROUTE(app, "/")([addCORS](const crow::request& req, crow::response& res) {
        addCORS(res);
        res.write("Hello, World!");
        res.end();
    });

    CROW_ROUTE(app, "/cars")([addCORS](const crow::request& req, crow::response& res) {
        addCORS(res);
        ifstream ifs("../../final_data.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/sorted/make/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& order) {
        addCORS(res);
        bool descending = (order != "descending");
        rewriteJsonSortedByKey("make", descending);
        ifstream ifs("../../final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/sorted/make_and_model/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& order) {
        addCORS(res);
        bool descending = (order != "descending");
        rewriteJsonSortedByKey("make_and_model", descending);
        ifstream ifs("../../final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/sorted/age/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& order) {
        addCORS(res);
        bool descending = (order != "descending");
        rewriteJsonSortedByKey("age", descending);
        ifstream ifs("../../final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/sorted/date/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& order) {
        addCORS(res);
        bool descending = (order != "descending");
        rewriteJsonSortedByKey("date", descending);
        ifstream ifs("../../final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/sorted/price/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& order) {
        addCORS(res);
        bool descending = (order != "descending");
        rewriteJsonSortedByKey("price", descending);
        ifstream ifs("../../final_data2.json");
        string json((istreambuf_iterator<char>(ifs)), istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/search/name/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& name) {
        addCORS(res);
        auto results = findCarsByName(name);  // Updated function name
        rewriteJsonWithSearchResults(results);
        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/search/date_range/<string>/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& startDate, const std::string& endDate) {
        addCORS(res);
        Date start(startDate);
        Date end(endDate);
        auto results = findCarsByDateRange(start, end);  // Updated function name
        rewriteJsonWithSearchResults(results);
        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/search/price_range/<float>/<float>")([addCORS](const crow::request& req, crow::response& res, float minPrice, float maxPrice) {
        addCORS(res);
        auto results = findCarsByPriceRange(minPrice, maxPrice);  // Updated function name
        rewriteJsonWithSearchResults(results);
        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/search/country/<string>")([addCORS](const crow::request& req, crow::response& res, const std::string& country) {
        addCORS(res);
        auto results = findCarsByCountry(country);  // Updated function name
        rewriteJsonWithSearchResults(results);
        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    CROW_ROUTE(app, "/cars/search")([addCORS](const crow::request& req, crow::response& res) {
        addCORS(res);
        auto query_params = req.url_params;
        std::string name = query_params.get("name") ? query_params.get("name") : "";
        std::string model = query_params.get("model") ? query_params.get("model") : "";
        std::string country = query_params.get("country") ? query_params.get("country") : "";
        float minPrice = query_params.get("minprice") ? std::stof(query_params.get("minprice")) : 0.0f;
        float maxPrice = query_params.get("maxprice") ? std::stof(query_params.get("maxprice")) : FLT_MAX;

        auto results = searchCars(name, model, country, minPrice, maxPrice);
        rewriteJsonWithSearchResults(results);
        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    // Start the server
    app.port(8080).multithreaded().run();
}
