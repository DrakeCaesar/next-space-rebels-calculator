#include "data_preprocessing.h"
#include <fstream>
#include <iostream>
#include <omp.h> // OpenMP for parallel processing
#include <vector>

using namespace std;

static int calculateScore(const int comboCounts[]) {
  static const int multipliers[] = {1, 1, 2, 5, 15, 30}; // Lookup table
  int score = 1;

  for (int i = 0; i < COMBO_COUNT; i++) {
    score *= multipliers[comboCounts[i]];
  }

  return score;
}

static Tag *findBestCombination(const vector<Tag> &tags) {
  omp_set_num_threads(16);
  static Tag bestCombination[5];
  int bestScore = 0;
  size_t n = tags.size();

#pragma omp parallel for schedule(dynamic) collapse(5)                         \
    reduction(max : bestScore)
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
                bestCombination[0] = tags[i];
                bestCombination[1] = tags[j];
                bestCombination[2] = tags[k];
                bestCombination[3] = tags[l];
                bestCombination[4] = tags[m];
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

  Tag *bestTags = findBestCombination(tags);

  cout << "Best Combination:" << endl;
  for (int i = 0; i < 5; i++) {
    cout << bestTags[i].name << " (" << bestTags[i].description << ")" << endl;
  }

  return 0;
}