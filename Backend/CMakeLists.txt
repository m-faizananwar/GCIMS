cmake_minimum_required(VERSION 3.10)
project(GCIMS)

# Enable C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Production optimization flags
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Enable optimizations for Release builds
if(CMAKE_BUILD_TYPE MATCHES Release)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -DNDEBUG")
endif()

include(FetchContent)

# Fetch asio (header-only library required by Crow)
FetchContent_Declare(
	asio
	GIT_REPOSITORY https://github.com/chriskohlhoff/asio.git
	GIT_TAG asio-1-28-0
)
FetchContent_MakeAvailable(asio)

# Set asio directory so Crow can find it
set(ASIO_INCLUDE_DIR ${asio_SOURCE_DIR}/asio/include)

# If crow isn't installed system-wide, fetch it at configure time so the
# project can be configured out-of-the-box. You can remove this block
# and install crow separately if you prefer (see README).
FetchContent_Declare(
	crow
	GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
	GIT_TAG master
)
FetchContent_MakeAvailable(crow)

# Add executable
add_executable(GCIMS main.cpp)

# Link against Crow (the target provided by the fetched project)
target_link_libraries(GCIMS PRIVATE Crow::Crow)