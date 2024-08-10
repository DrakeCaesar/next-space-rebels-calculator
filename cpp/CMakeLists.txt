cmake_minimum_required(VERSION 3.10)

# Project name and version
project(TagCombinationFinder VERSION 1.0)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Enable CMake's built-in support for finding packages with vcpkg
if(DEFINED ENV{VCPKG_ROOT} AND NOT DEFINED CMAKE_TOOLCHAIN_FILE)
  set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" CACHE STRING "")
endif()

# Find the nlohmann_json package via vcpkg
find_package(nlohmann_json CONFIG REQUIRED)

# Add the executable and organize source files
add_executable(TagCombinationFinder src/main.cpp src/data_preprocessing.cpp)
target_include_directories(TagCombinationFinder PRIVATE include)

# Link the nlohmann_json target
target_link_libraries(TagCombinationFinder PRIVATE nlohmann_json::nlohmann_json)

# Enable compiler warnings
if(MSVC)
  target_compile_options(TagCombinationFinder PRIVATE /W4 /WX)
else()
  target_compile_options(TagCombinationFinder PRIVATE -Wall -Wextra -pedantic -Werror)
endif()

# Optimizations for release builds
set(CMAKE_CXX_FLAGS_RELEASE "-O3")
