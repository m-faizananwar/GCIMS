#include <iostream>
#include "parser.h"
#include "Functions.h"
#include "Date.h"
#include "crow.h"
#include "HashMatrix.h"

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

    // 10. Search by coordinates
    CROW_ROUTE(app, "/cars/search/coordinates")([addCORS](const crow::request& req, crow::response& res) {
        addCORS(res);
        auto query_params = req.url_params;
        float latitude = query_params.get("lat") ? std::stof(query_params.get("lat")) : 0.0f;
        float longitude = query_params.get("lng") ? std::stof(query_params.get("lng")) : 0.0f;
        
        ofstream jsonFile("../../final_data2.json");
        jsonFile << "[\n";
        bool firstEntry = true;
        globe->printByCoordinatesJSON(longitude, latitude, jsonFile, firstEntry);
        jsonFile << "\n]\n";
        jsonFile.close();

        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    // 11. Search by location and radius
    CROW_ROUTE(app, "/cars/search/radius")([addCORS](const crow::request& req, crow::response& res) {
        addCORS(res);
        auto query_params = req.url_params;
        float latitude = query_params.get("lat") ? std::stof(query_params.get("lat")) : 0.0f;
        float longitude = query_params.get("lng") ? std::stof(query_params.get("lng")) : 0.0f;
        int radius = query_params.get("radius") ? std::stoi(query_params.get("radius")) : 1;

        ofstream jsonFile("../../final_data2.json");
        jsonFile << "[\n";
        bool firstEntry = true;
        globe->printByRegionJSON(longitude, latitude, radius, jsonFile, firstEntry);
        jsonFile << "\n]\n";
        jsonFile.close();

        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    // 12. Search by rectangle coordinates
    CROW_ROUTE(app, "/cars/search/rectangle")([addCORS](const crow::request& req, crow::response& res) {
        addCORS(res);
        auto query_params = req.url_params;
        float lat1 = query_params.get("lat1") ? std::stof(query_params.get("lat1")) : 0.0f;
        float lng1 = query_params.get("lng1") ? std::stof(query_params.get("lng1")) : 0.0f;
        float lat2 = query_params.get("lat2") ? std::stof(query_params.get("lat2")) : 0.0f;
        float lng2 = query_params.get("lng2") ? std::stof(query_params.get("lng2")) : 0.0f;  // Fixed syntax error here

        ofstream jsonFile("../../final_data2.json");
        jsonFile << "[\n";
        bool firstEntry = true;
        globe->printRectangularRegionJSON(lng1, lat1, lng2, lat2, jsonFile, firstEntry);
        jsonFile << "\n]\n";
        jsonFile.close();

        ifstream ifs("../../final_data2.json");
        std::string json((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        res.write(json);
        res.end();
    });

    // Add new car endpoint
    CROW_ROUTE(app, "/cars/add")
        .methods("POST"_method)
        ([addCORS](const crow::request& req, crow::response& res) {
            addCORS(res);
            auto x = crow::json::load(req.body);
            if (!x) {
                res.code = 400;
                res.write("{\"error\": \"Invalid JSON!\"}");
                res.end();
                return;
            }

            try {
                Car* newCar = new Car();
                newCar->make = x["brand"].s();
                newCar->model = x["model"].s();
                newCar->buyer_gender = x["gender"].s();
                newCar->buyer_age = x["buyer_age"].i();
                newCar->country = x["country"].s();
                newCar->city = x["city"].s();
                newCar->dealer_latitude = x["dealer_latitude"].d();
                newCar->dealer_longitude = x["dealer_longitude"].d();
                newCar->color = x["color"].s();
                newCar->new_car = x["new_car"].b();
                newCar->purchase_date = Date(x["registration_date"].s());
                newCar->sale_price = x["price"].d();
                newCar->top_speed = x["speed"].d();
                newCar->setID();    

                // Add to data structures
                carsByMake->insert(newCar->make, newCar);
                carsByDate->insert(newCar->purchase_date, newCar);
                carsByMakeAndModel->insert(*newCar, newCar);
                carsByCountry->insert(newCar->country, newCar);
                carsByAge->insert(newCar->buyer_age, newCar);
                carsByPrice->insert(newCar->sale_price, newCar);
                globe->insertCar(newCar);

                // Append to CSV
                appendToCSV(newCar);

                res.code = 201;
                res.write("{\"message\": \"Car added successfully\"}");
            } catch (const exception& e) {
                res.code = 500;
                res.write("{\"error\": \"" + std::string(e.what()) + "\"}");
            }
            res.end();
            // Remove the parsingData() call here
        });

    // Delete car endpoint
    CROW_ROUTE(app, "/cars/delete")
        .methods("DELETE"_method)
        ([addCORS](const crow::request& req, crow::response& res) {
            addCORS(res);
            auto x = crow::json::load(req.body);
            if (!x) {
                res.code = 400;
                res.write("{\"error\": \"Invalid JSON!\"}");
                res.end();
                return;
            }

            try {
                // Get ID from JSON
                string id = x["id"].s();

                // Locate the car
                Car* foundCar = findCarByID(id);
                if (!foundCar) {
                    res.code = 404;
                    res.write("{\"error\": \"Car not found!\"}");
                    res.end();
                    return;
                }

                // Remove from globe
                globe->removeCar(foundCar);

                // Remove from CSV
                deleteFromCSVByID(id);

                // Remove from data structures
                carsByMakeAndModel->remove(*foundCar);
                carsByDate->remove(foundCar->purchase_date);
                carsByMake->remove(foundCar->make);
                carsByCountry->remove(foundCar->country);
                carsByAge->remove(foundCar->buyer_age);
                carsByPrice->remove(foundCar->sale_price);
                globe->removeCar(foundCar);

                res.code = 200;
                res.write("{\"message\": \"Car deleted successfully by ID!\"}");
            } catch (const exception& e) {
                res.code = 500;
                res.write("{\"error\": \"" + std::string(e.what()) + "\"}");
            }
            res.end();
            // Remove parsingData() call from here
        });

    // Update car endpoint
    CROW_ROUTE(app, "/cars/update")
        .methods("PUT"_method)
        ([addCORS](const crow::request& req, crow::response& res) {
            addCORS(res);
            auto x = crow::json::load(req.body);
            if (!x) {
                res.code = 400;
                res.write("{\"error\": \"Invalid JSON!\"}");
                res.end();
                return;
            }

            try {
                // Check if we have an ID for ID-based update
                if (x.has("id")) {
                    // ID-based path
                    string id = x["id"].s();
                    Car* oldCar = findCarByID(id);
                    if (!oldCar) {
                        res.code = 404;
                        res.write("{\"error\": \"Car not found by ID!\"}");
                        res.end();
                        return;
                    }
                    // Remove from data structures
                    globe->removeCar(oldCar);
                    carsByMakeAndModel->remove(*oldCar);
                    carsByDate->remove(oldCar->purchase_date);
                    carsByMake->remove(oldCar->make);
                    carsByCountry->remove(oldCar->country);
                    carsByAge->remove(oldCar->buyer_age);
                    carsByPrice->remove(oldCar->sale_price);

                    // Create new car object
                    Car* newCar = new Car();
                    // ...existing code...
                    newCar->make = x["new_make"].s();
                    newCar->model = x["new_model"].s();
                    newCar->buyer_gender = x["gender"].s();
                    newCar->buyer_age = x["buyer_age"].i();
                    newCar->country = x["country"].s();
                    newCar->city = x["city"].s();
                    newCar->dealer_latitude = x["dealer_latitude"].d();
                    newCar->dealer_longitude = x["dealer_longitude"].d();
                    newCar->color = x["color"].s();
                    newCar->new_car = x["new_car"].b();
                    newCar->purchase_date = Date(x["registration_date"].s());
                    newCar->sale_price = x["price"].d();
                    newCar->top_speed = x["speed"].d();
                    newCar->id= oldCar->id;

                    // Re-insert
                    carsByMake->insert(newCar->make, newCar);
                    carsByDate->insert(newCar->purchase_date, newCar);
                    carsByMakeAndModel->insert(*newCar, newCar);
                    carsByCountry->insert(newCar->country, newCar);
                    carsByAge->insert(newCar->buyer_age, newCar);
                    carsByPrice->insert(newCar->sale_price, newCar);
                    globe->insertCar(newCar);

                    // Update CSV
                    updateCarInCSV(oldCar, newCar);

                    delete oldCar;
                    res.code = 200;
                    res.write("{\"message\": \"Car updated successfully by ID\"}");
                } else {
                    // Existing make/model/date path
                    string make = x["brand"].s();
                    string model = x["model"].s();
                    Date date(x["registration_date"].s());

                    if (!carExists(make, model, date)) {
                        res.code = 404;
                        res.write("{\"error\": \"Car not found by make/model/date!\"}");
                        res.end();
                        return;
                    }
                    // Create old car
                    Car* oldCar = new Car();
                    oldCar->make = make;
                    oldCar->model = model;
                    oldCar->purchase_date = date;

                    // ...existing removal code...
                    if (auto node = carsByMakeAndModel->search(*oldCar)) {
                        oldCar->dealer_latitude = node->car->dealer_latitude;
                        oldCar->dealer_longitude = node->car->dealer_longitude;
                        globe->removeCar(oldCar);
                    }
                    carsByMakeAndModel->remove(*oldCar);
                    carsByDate->remove(oldCar->purchase_date);
                    carsByMake->remove(oldCar->make);

                    // Create new car
                    Car* newCar = new Car();
                    // ...existing code...
                    newCar->make = x["new_make"].s();
                    newCar->model = x["new_model"].s();
                    newCar->buyer_gender = x["gender"].s();
                    newCar->buyer_age = x["buyer_age"].i();
                    newCar->country = x["country"].s();
                    newCar->city = x["city"].s();
                    newCar->dealer_latitude = x["dealer_latitude"].d();
                    newCar->dealer_longitude = x["dealer_longitude"].d();
                    newCar->color = x["color"].s();
                    newCar->new_car = x["new_car"].b();
                    newCar->purchase_date = Date(x["registration_date"].s());
                    newCar->sale_price = x["price"].d();
                    newCar->top_speed = x["speed"].d();
                    newCar->id= oldCar->id;

                    // Re-insert
                    carsByMake->insert(newCar->make, newCar);
                    carsByDate->insert(newCar->purchase_date, newCar);
                    carsByMakeAndModel->insert(*newCar, newCar);
                    carsByCountry->insert(newCar->country, newCar);
                    carsByAge->insert(newCar->buyer_age, newCar);
                    carsByPrice->insert(newCar->sale_price, newCar);
                    globe->insertCar(newCar);

                    updateCarInCSV(oldCar, newCar);
                    delete oldCar;

                    res.code = 200;
                    res.write("{\"message\": \"Car updated successfully by make/model/date\"}");
                }
            } catch (const exception& e) {
                res.code = 500;
                res.write("{\"error\": \"" + std::string(e.what()) + "\"}");
            }
            res.end();
        });

    // Custom JSON sorting endpoint
    CROW_ROUTE(app, "/sort")
        .methods("GET"_method)
        ([addCORS](const crow::request& req, crow::response& res) {
            addCORS(res);
            auto query_params = req.url_params;
            std::string sortBy = query_params.get("sortBy") ? query_params.get("sortBy") : "";
            std::string order = query_params.get("order") ? query_params.get("order") : "asc";

            if (sortBy.empty()) {
                res.code = 400;
                res.write("{\"error\": \"Missing required parameter: sortBy\"}");
                res.end();
                return;
            }

            bool ascending = (order != "desc");

            try {
                // Read data from final_data2.json
                ifstream ifs("../../final_data2.json");
                if (!ifs.is_open()) {
                    throw runtime_error("Cannot open final_data2.json");
                }
                std::string json_str((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
                auto json_data = crow::json::load(json_str);
                if (!json_data) {
                    throw runtime_error("Invalid JSON in final_data2.json");
                }

                vector<Car*> cars;
                for (const auto& item : json_data) {
                    Car* car = new Car();
                    car->id = item["id"].s();
                    car->make = item["brand"].s();
                    car->model = item["model"].s();
                    car->buyer_gender = item["gender"].s();
                    car->buyer_age = item["buyer_age"].i();
                    car->country = item["country"].s();
                    car->city = item["city"].s();
                    car->dealer_latitude = item["dealer_latitude"].d();
                    car->dealer_longitude = item["dealer_longitude"].d();
                    car->color = item["color"].s();
                    car->new_car = item["new_car"].b();
                    car->purchase_date = Date(item["registration_date"].s());
                    car->sale_price = item["price"].d();
                    car->top_speed = item["speed"].d();
                    car->id = item["id"].s();
                    cars.push_back(car);
                }

                // Sort the data
                sortCars(cars, sortBy, ascending);

                // Write sorted results to JSON
                rewriteJsonWithSearchResults(cars);

                // Clean up
                for (auto car : cars) {
                    delete car;
                }

                // Return the sorted data
                ifstream sorted_ifs("../../final_data2.json");
                std::string json((std::istreambuf_iterator<char>(sorted_ifs)), std::istreambuf_iterator<char>());
                res.write(json);

            } catch (const exception& e) {
                res.code = 500;
                res.write("{\"error\": \"" + std::string(e.what()) + "\"}");
            }
            res.end();
        });

    // Start the server
    app.port(8080).multithreaded().run();
}
