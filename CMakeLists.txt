cmake_minimum_required(VERSION 3.10)
project(GCIMS)

# Enable C++17
set(CMAKE_CXX_STANDARD 17)

# Add executable
add_executable(GCIMS main.cpp)

# Include vcpkg dependencies
find_package(crow CONFIG REQUIRED)
target_link_libraries(GCIMS PRIVATE Crow::Crow)
