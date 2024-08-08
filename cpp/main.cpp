#include "data_preprocessing.h"
#include <fstream>
#include <iostream>
#include <mutex>
#include <thread>
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
  const int numThreads = 20;
  vector<thread> threads(numThreads);
  vector<int> bestScores(numThreads, 0);
  vector<vector<Tag>> bestCombinations(numThreads, vector<Tag>(5));
  size_t n = tags.size();

  mutex mtx;

  auto worker = [&](int threadId) {
    int localBestScore = 0;
    Tag localBestCombination[5];
    int localComboCounts[COMBO_COUNT];

    for (size_t i = threadId; i < n - 4; i += numThreads) {
      for (size_t j = i + 1; j < n - 3; j++) {
        for (size_t k = j + 1; k < n - 2; k++) {
          for (size_t l = k + 1; l < n - 1; l++) {
            for (size_t m = l + 1; m < n; m++) {
              fill(begin(localComboCounts), end(localComboCounts), 0);

              for (const auto &combo : tags[i].combos)
                localComboCounts[combo]++;
              for (const auto &combo : tags[j].combos)
                localComboCounts[combo]++;
              for (const auto &combo : tags[k].combos)
                localComboCounts[combo]++;
              for (const auto &combo : tags[l].combos)
                localComboCounts[combo]++;
              for (const auto &combo : tags[m].combos)
                localComboCounts[combo]++;

              int score = calculateScore(localComboCounts);

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

    lock_guard<mutex> guard(mtx);
    if (localBestScore > bestScores[threadId]) {
      bestScores[threadId] = localBestScore;
      bestCombinations[threadId] =
          vector<Tag>(localBestCombination, localBestCombination + 5);
    }
  };

  for (int i = 0; i < numThreads; i++) {
    threads[i] = thread(worker, i);
  }

  for (auto &t : threads) {
    t.join();
  }

  int bestScore = 0;
  for (int i = 0; i < numThreads; i++) {
    if (bestScores[i] > bestScore) {
      bestScore = bestScores[i];
      copy(bestCombinations[i].begin(), bestCombinations[i].end(),
           bestCombination);
    }
  }

  cout << "Final best score: " << bestScore << endl;
  cout << "Best combination: " << bestCombination[0].name << ", "
       << bestCombination[1].name << ", " << bestCombination[2].name << ", "
       << bestCombination[3].name << ", " << bestCombination[4].name << endl;
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
