cmake_minimum_required(VERSION 3.10)

# Project name and version
project(TagCombinationFinder VERSION 1.0)

# Set the C++ standard to C++11 or higher
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Enable CMake's built-in support for finding packages with vcpkg
if(DEFINED ENV{VCPKG_ROOT} AND NOT DEFINED CMAKE_TOOLCHAIN_FILE)
  set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" CACHE STRING "")
endif()

# Find the nlohmann_json package via vcpkg
find_package(nlohmann_json CONFIG REQUIRED)

# Add the executable
add_executable(TagCombinationFinder main.cpp "data_preprocessing.h" "data_preprocessing.cpp")

# Link the nlohmann_json target
target_link_libraries(TagCombinationFinder PRIVATE nlohmann_json::nlohmann_json)
