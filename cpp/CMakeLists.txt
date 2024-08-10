cmake_minimum_required(VERSION 3.10)

project(TagCombinationFinder VERSION 1.0)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

if(DEFINED ENV{VCPKG_ROOT} AND NOT DEFINED CMAKE_TOOLCHAIN_FILE)
  set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" CACHE STRING "")
endif()

find_package(nlohmann_json CONFIG REQUIRED)

add_executable(TagCombinationFinder src/main.cpp src/data_preprocessing.cpp)
target_include_directories(TagCombinationFinder PRIVATE include)
target_link_libraries(TagCombinationFinder PRIVATE nlohmann_json::nlohmann_json)
