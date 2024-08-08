#ifndef DATA_PREPROCESSING_H
#define DATA_PREPROCESSING_H

#include <nlohmann/json.hpp>
#include <string>
#include <unordered_map>
#include <vector>

using json = nlohmann::json;
using namespace std;

enum Combo {
  CUTE,
  AWESOME,
  NOOB,
  SMART,
  WEIRD,
  WILD,
  COOL,
  FUNNY,
  GROSS,
  NAUGHTY,
  CREEPY,
  ASPIRING,
  GEEKY,
  COMBO_COUNT // This will be 13, representing the number of combos
};

struct Tag {
  string name;
  string description;
  string rarity;
  vector<int> combos; // Use vector of indices instead of strings
};

// Define how to parse a Tag from JSON
void from_json(const json &j, Tag &t);

#endif // DATA_PREPROCESSING_H