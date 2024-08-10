#include "data_preprocessing.h"
#include <fstream>
#include <iostream>
#include <mutex>
#include <sstream>
#include <thread>
#include <vector>

using namespace std;

static void findBestCombination(const vector<Tag> &tags,
                                Tag bestCombination[5])
{
  const int numThreads = thread::hardware_concurrency();
  vector<thread> threads(numThreads);
  vector<int> bestScores(numThreads, 0);
  vector<vector<Tag>> bestCombinations(numThreads, vector<Tag>(5));
  size_t n = tags.size();

  mutex mtx;

  auto worker = [&](int threadId)
  {
    int localBestScore = 0;
    Tag localBestCombination[5];
    int localComboCounts[COMBO_COUNT];
    static const int multipliers[] = {1, 1, 2, 5, 15, 30}; // Lookup table

    for (size_t i = threadId; i < n - 4; i += numThreads)
    {
      for (size_t j = i + 1; j < n - 3; j++)
      {
        for (size_t k = j + 1; k < n - 2; k++)
        {
          for (size_t l = k + 1; l < n - 1; l++)
          {
            for (size_t m = l + 1; m < n; m++)
            {
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

              int score = 1;
              for (int o = 0; o < COMBO_COUNT; o++)
                score *= multipliers[localComboCounts[o]];

              if (score > localBestScore)
              {
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
    if (localBestScore > bestScores[threadId])
    {
      bestScores[threadId] = localBestScore;
      bestCombinations[threadId] =
          vector<Tag>(localBestCombination, localBestCombination + 5);
    }
  };

  for (int i = 0; i < numThreads; i++)
  {
    threads[i] = thread(worker, i);
  }

  for (auto &t : threads)
  {
    t.join();
  }

  int bestScore = 0;
  for (int i = 0; i < numThreads; i++)
  {
    if (bestScores[i] > bestScore)
    {
      bestScore = bestScores[i];
      copy(bestCombinations[i].begin(), bestCombinations[i].end(),
           bestCombination);
    }
  }

  // std::cout << "Final best score: " << bestScore << endl;
  // std::cout << "Best combination: " << bestCombination[0].name << ", "
  //           << bestCombination[1].name << ", " << bestCombination[2].name
  //           << ", " << bestCombination[3].name << ", "
  //           << bestCombination[4].name << endl;
}

std::string processJson(const std::string &input)
{
  json j = json::parse(input);
  vector<Tag> tags = j.get<vector<Tag>>();
  Tag bestTags[5];

  findBestCombination(tags, bestTags);

  json output = json::array();
  for (int i = 0; i < 5; i++)
  {
    vector<string> comboStrings;
    for (const auto &combo : bestTags[i].combos)
    {
      for (const auto &pair : comboMap)
      {
        if (pair.second == combo)
        {
          comboStrings.push_back(pair.first);
          break;
        }
      }
    }

    output.push_back(json{{"name", bestTags[i].name},
                          {"description", bestTags[i].description},
                          {"combos", comboStrings}});
  }

  return output.dump();
}

int main(int argc, char *argv[])
{
  string input;

  if (argc != 2)
  {
    // cerr << "Usage: " << argv[0] << " <json_input>" << endl;
    // read local file isntead of command line argument
    std::ifstream file("../../tags.test.json");
    std::stringstream buffer;
    buffer << file.rdbuf();
    input = buffer.str();
  }
  else
  {
    input = argv[1];
  }

  auto start = chrono::high_resolution_clock::now();

  std::string output = processJson(input);

  // Stop measuring time
  auto end = chrono::high_resolution_clock::now();
  chrono::duration<double> duration = end - start;

  std::cout << output;

  return 0;
}