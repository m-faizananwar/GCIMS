#include "crow.h"
#include <iostream>
#include "parser.h"
#include "Functions.h"
#include "Date.h"

int main() {
        parsingData();

    crow::SimpleApp app;

    // Define a route
    CROW_ROUTE(app, "/")([]() {
        return "Hello, Crow!";
    });

    // Start the server
    app.port(8080).multithreaded().run();
}
