#include "crow.h"

int main() {
    crow::SimpleApp app;

    // Define a route
    CROW_ROUTE(app, "/")([]() {
        return "Hello, Crow!";
    });

    // Start the server
    app.port(8080).multithreaded().run();
}
