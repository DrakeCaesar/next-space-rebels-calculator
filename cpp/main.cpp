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

string formatTime(int totalSeconds) {
  int h = totalSeconds / 3600;
  int m = (totalSeconds % 3600) / 60;
  int s = totalSeconds % 60;
  return to_string(h) + "h " + to_string(m) + "m " + to_string(s) + "s";
}

vector<Tag> findBestCombination(const vector<Tag> &tags) {
  omp_set_num_threads(16);
  vector<Tag> bestCombination;
  int bestScore = 0;
  size_t n = tags.size();
  size_t totalCombinations = (n * (n - 1) * (n - 2) * (n - 3) * (n - 4)) / 120;
  size_t currentCombination = 0;

  auto start = chrono::steady_clock::now();
#pragma omp parallel for schedule(dynamic) collapse(5)                         \
    shared(bestScore, bestCombination) // Parallelize outer loops
  for (size_t i = 0; i < n - 4; i++) {
    for (size_t j = i + 1; j < n - 3; j++) {
      for (size_t k = j + 1; k < n - 2; k++) {
        for (size_t l = k + 1; l < n - 1; l++) {
          for (size_t m = l + 1; m < n; m++) {
            unordered_map<string, int> comboCounts;
            vector<Tag> combination = {tags[i], tags[j], tags[k], tags[l],
                                       tags[m]};

            for (const auto &tag : combination) {
              for (const auto &combo : tag.combos) {
                if (combo != "UNKNOWN") {
                  comboCounts[combo]++;
                }
              }
            }

            int score = calculateScore(comboCounts);

#pragma omp                                                                    \
    critical // Ensure that updates to shared variables are done atomically
            if (score > bestScore) {
              bestScore = score;
              bestCombination = combination;
            }

#pragma omp atomic // Atomic increment of progress counter
            currentCombination++;

            if (currentCombination % 1000000 ==
                0) { // Reduce frequency of updates
              auto now = chrono::steady_clock::now();
              auto elapsed =
                  chrono::duration_cast<chrono::seconds>(now - start).count();
              double percentage =
                  (double)currentCombination / totalCombinations * 100;
              double estimatedTotal =
                  (double)elapsed / currentCombination * totalCombinations;
              double estimatedRemaining = estimatedTotal - elapsed;

              if (currentCombination > 0 && estimatedRemaining > 0) {
                cout << "Progress: " << percentage << "%, ETA: " 
                     << formatTime(static_cast<int>(estimatedRemaining)) << " "
                     << currentCombination << "/" << totalCombinations << endl;
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
