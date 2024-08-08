#include <chrono>
#include <fstream>
#include <iostream>
#include <nlohmann/json.hpp>
#include <omp.h> // OpenMP for parallel processing
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
static void from_json(const json &j, Tag &t) {
  j.at("name").get_to(t.name);
  j.at("description").get_to(t.description);
  j.at("rarity").get_to(t.rarity);

  vector<string> comboStrings;
  j.at("combos").get_to(comboStrings);

  static const unordered_map<string, int> comboMap = {
      {"CUTE", CUTE},       {"AWESOME", AWESOME}, {"NOOB", NOOB},
      {"SMART", SMART},     {"WEIRD", WEIRD},     {"WILD", WILD},
      {"COOL", COOL},       {"FUNNY", FUNNY},     {"GROSS", GROSS},
      {"NAUGHTY", NAUGHTY}, {"CREEPY", CREEPY},   {"ASPIRING", ASPIRING},
      {"GEEKY", GEEKY}};

  for (const auto &combo : comboStrings) {
    t.combos.push_back(comboMap.at(combo));
  }
}

static int calculateScore(const int comboCounts[]) {
    static const int multipliers[] = { 1, 1, 2, 5, 15, 30 }; // Lookup table
    int score = 1;

    for (int i = 0; i < COMBO_COUNT; i++) {
        score *= multipliers[comboCounts[i]];
    }

    return score;
}
static string formatTime(int totalSeconds) {
  int h = totalSeconds / 3600;
  int m = (totalSeconds % 3600) / 60;
  int s = totalSeconds % 60;
  return to_string(h) + "h " + to_string(m) + "m " + to_string(s) + "s";
}

static vector<Tag> findBestCombination(const vector<Tag> &tags) {
  omp_set_num_threads(16);
  vector<Tag> bestCombination;
  int bestScore = 0;
  size_t n = tags.size();
  size_t totalCombinations = (n * (n - 1) * (n - 2) * (n - 3) * (n - 4)) / 120;
  size_t currentCombination = 0;

  auto start = chrono::steady_clock::now();
#pragma omp parallel for schedule(dynamic) collapse(5) reduction(max : bestScore)
  for (size_t i = 0; i < n - 4; i++) {
    for (size_t j = i + 1; j < n - 3; j++) {
      for (size_t k = j + 1; k < n - 2; k++) {
        for (size_t l = k + 1; l < n - 1; l++) {
          for (size_t m = l + 1; m < n; m++) {
            int comboCounts[COMBO_COUNT] = {0};

            // Using indices instead of copying the combination
            for (const auto &combo : tags[i].combos)
              comboCounts[combo]++;
            for (const auto &combo : tags[j].combos)
              comboCounts[combo]++;
            for (const auto &combo : tags[k].combos)
              comboCounts[combo]++;
            for (const auto &combo : tags[l].combos)
              comboCounts[combo]++;
            for (const auto &combo : tags[m].combos)
              comboCounts[combo]++;

            int score = calculateScore(comboCounts);

#pragma omp critical
            {
              if (score > bestScore) {
                bestScore = score;
                bestCombination = {tags[i], tags[j], tags[k], tags[l], tags[m]};
                cout << "New best score: " << bestScore << endl;
                cout << "New best combination: " << tags[i].name << ", "
                     << tags[j].name << ", " << tags[k].name << ", "
                     << tags[l].name << ", " << tags[m].name << endl;
              }
            }
          }
        }
      }
    }
  }
  return bestCombination;
}

int main() {
  ifstream file("../../../../tags.json");
  if (!file) {
    cerr << "Could not open the file!" << endl;
    return 1;
  }

  json j;
  file >> j;
  vector<Tag> tags = j.get<vector<Tag>>();

  vector<Tag> bestTags = findBestCombination(tags);

  cout << "Best Combination:" << endl;
  for (const auto &tag : bestTags) {
    cout << tag.name << " (" << tag.description << ")" << endl;
  }

  return 0;
}