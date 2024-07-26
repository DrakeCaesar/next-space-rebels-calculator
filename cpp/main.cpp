#include <chrono>
#include <fstream>
#include <iostream>
#include <nlohmann/json.hpp>
#include <string>
#include <unordered_map>
#include <vector>

using json = nlohmann::json;
using namespace std;

struct Tag {
  string name;
  string description;
  string rarity;
  vector<string> combos;
};

// Define how to parse a Tag from JSON
void from_json(const json &j, Tag &t) {
  j.at("name").get_to(t.name);
  j.at("description").get_to(t.description);
  j.at("rarity").get_to(t.rarity);
  j.at("combos").get_to(t.combos);
}

int calculateScore(const unordered_map<string, int> &comboCounts) {
  int score = 0;
  for (const auto &entry : comboCounts) {
    if (entry.first == "UNKNOWN")
      continue;
    int count = entry.second;
    if (count == 2)
      score += 1;
    if (count == 3)
      score += 3;
    if (count == 4)
      score += 15;
  }
  return score;
}

void formatTime(int totalSeconds) {
  int h = totalSeconds / 3600;
  int m = (totalSeconds % 3600) / 60;
  int s = totalSeconds % 60;
  printf("%dh %dm %ds", h, m, s);
}

vector<Tag> findBestCombination(const vector<Tag> &tags) {
  vector<Tag> bestCombination;
  int bestScore = 0;
  size_t n = tags.size();
  size_t totalCombinations = (n * (n - 1) * (n - 2) * (n - 3) * (n - 4)) / 120;
  size_t currentCombination = 0;

  auto start = chrono::steady_clock::now();

  for (size_t i = 0; i < n - 4; i++) {
    for (size_t j = i + 1; j < n - 3; j++) {
      currentCombination += (n - j - 1) * (n - j - 2) * (n - j - 3) / 6;
      auto now = chrono::steady_clock::now();
      auto elapsed =
          chrono::duration_cast<chrono::seconds>(now - start).count();
      double percentage = (double)currentCombination / totalCombinations * 100;
      int estimatedTotal = elapsed / currentCombination * totalCombinations;
      int estimatedRemaining = estimatedTotal - elapsed;
      cout << "Progress: " << percentage << "%, Estimated time remaining: ";
      formatTime(estimatedRemaining);
      cout << endl;

      for (size_t k = j + 1; k < n - 2; k++) {
        for (size_t l = k + 1; l < n - 1; l++) {
          for (size_t m = l + 1; m < n; m++) {
            vector<Tag> combination = {tags[i], tags[j], tags[k], tags[l],
                                       tags[m]};
            unordered_map<string, int> comboCounts;

            for (const auto &tag : combination) {
              for (const auto &combo : tag.combos) {
                if (combo != "UNKNOWN") {
                  comboCounts[combo]++;
                }
              }
            }

            int score = calculateScore(comboCounts);
            if (score > bestScore) {
              bestScore = score;
              bestCombination = combination;
            }
          }
        }
      }
    }
  }
  return bestCombination;
}

int main() {
  ifstream file("../../tags.json");
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
