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

static void findBestCombination(const vector<Tag> &tags,
                                Tag bestCombination[5]) {
  omp_set_num_threads(16);
  int bestScore = 0;
  size_t n = tags.size();

#pragma omp parallel
  {
    int localBestScore = 0;
    Tag localBestCombination[5];

#pragma omp for schedule(dynamic) collapse(5)
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

              if (score > localBestScore) {
                localBestScore = score;
                localBestCombination[0] = tags[i];
                localBestCombination[1] = tags[j];
                localBestCombination[2] = tags[k];
                localBestCombination[3] = tags[l];
                localBestCombination[4] = tags[m];
              }
            }
          }
        }
      }
    }

#pragma omp critical
    {
      if (localBestScore > bestScore) {
        bestScore = localBestScore;
        for (int i = 0; i < 5; i++) {
          bestCombination[i] = localBestCombination[i];
        }
        cout << "New best score: " << bestScore << endl;
        cout << "New best combination: " << bestCombination[0].name << ", "
             << bestCombination[1].name << ", " << bestCombination[2].name
             << ", " << bestCombination[3].name << ", "
             << bestCombination[4].name << endl;
      }
    }
  }
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

  Tag bestTags[5];
  findBestCombination(tags, bestTags);

  cout << "Best Combination:" << endl;
  for (int i = 0; i < 5; i++) {
    cout << bestTags[i].name << " (" << bestTags[i].description << ")" << endl;
  }

  return 0;
}
