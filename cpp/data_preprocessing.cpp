#include "data_preprocessing.h"

void from_json(const json &j, Tag &t) {
  j.at("name").get_to(t.name);
  j.at("description").get_to(t.description);
  j.at("rarity").get_to(t.rarity);

  vector<string> comboStrings;
  j.at("combos").get_to(comboStrings);

  

  for (const auto &combo : comboStrings) {
    t.combos.push_back(comboMap.at(combo));
  }
}