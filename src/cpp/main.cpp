#include "data_preprocessing.h"
#include <vector>
#include <string>
#include <cstring>
#include <iostream>
#include "dfs.h"

// Include Emscripten headers only when building for WebAssembly
#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
using namespace emscripten;
#endif

using namespace std;

// Structure to return results to JavaScript
struct JsTagCombinationResult
{
  std::vector<std::string> combination;
  int score;
  std::string details;
};

static void findBestCombination(const vector<Tag> &tags, Tag bestCombination[5])
{
  size_t n = tags.size();
  int bestScore = 0;

  // Simple single-threaded version for WASM (threads can be problematic in WASM)
  for (size_t i = 0; i < n - 4; i++)
  {
    for (size_t j = i + 1; j < n - 3; j++)
    {
      for (size_t k = j + 1; k < n - 2; k++)
      {
        for (size_t l = k + 1; l < n - 1; l++)
        {
          for (size_t m = l + 1; m < n; m++)
          {
            int comboCounts[COMBO_COUNT];
            std::memset(comboCounts, 0, sizeof(comboCounts));

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

            int score = 1;
            static const int multipliers[] = {1, 1, 2, 5, 15, 30}; // Lookup table
            for (int o = 0; o < COMBO_COUNT; o++)
              score *= multipliers[comboCounts[o]];

            if (score > bestScore)
            {
              bestScore = score;
              bestCombination[0] = tags[i];
              bestCombination[1] = tags[j];
              bestCombination[2] = tags[k];
              bestCombination[3] = tags[l];
              bestCombination[4] = tags[m];
            }
          }
        }
      }
    }
  }
}

// Parse JSON input and find best tag combination
#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
#endif
JsTagCombinationResult findBestTagCombination(
    std::string targetJson,
    std::string tagsJson,
    std::string rulesJson,
    int maxDepth)
{
  // Parse the tags JSON
  json j = json::parse(tagsJson);
  vector<Tag> tags = j.get<vector<Tag>>();

  Tag bestTags[5];
  findBestCombination(tags, bestTags);

  // Prepare result
  JsTagCombinationResult result;
  result.combination.clear();

  int totalScore = 1;
  for (int i = 0; i < 5; i++)
  {
    result.combination.push_back(bestTags[i].name);
  }

  // Calculate final score
  int comboCounts[COMBO_COUNT];
  std::memset(comboCounts, 0, sizeof(comboCounts));

  for (int i = 0; i < 5; i++)
  {
    for (const auto &combo : bestTags[i].combos)
    {
      comboCounts[combo]++;
    }
  }

  static const int multipliers[] = {1, 1, 2, 5, 15, 30};
  for (int o = 0; o < COMBO_COUNT; o++)
    totalScore *= multipliers[comboCounts[o]];

  result.score = totalScore;
  result.details = "Best combination of 5 tags found";

  return result;
}

// Emscripten bindings - only include in WebAssembly build
#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(tags_module)
{
  value_object<JsTagCombinationResult>("JsTagCombinationResult")
      .field("combination", &JsTagCombinationResult::combination)
      .field("score", &JsTagCombinationResult::score)
      .field("details", &JsTagCombinationResult::details);

  register_vector<std::string>("VectorString");

  emscripten::function("findBestTagCombination", &findBestTagCombination);
}
#else
// Native build main function
int main(int argc, char *argv[])
{
  if (argc != 2)
  {
    std::cerr << "Usage: " << argv[0] << " <json_input>" << std::endl;
    return 1;
  }

  try
  {
    // Parse the input JSON
    json j = json::parse(argv[1]);
    vector<Tag> tags = j.get<vector<Tag>>();

    // Find best combination
    Tag bestTags[5];
    findBestCombination(tags, bestTags);

    // Create result JSON
    json result = json::array();
    for (int i = 0; i < 5; i++)
    {
      json tagObj;
      tagObj["name"] = bestTags[i].name;
      tagObj["description"] = bestTags[i].description;
      tagObj["combos"] = bestTags[i].combos;
      result.push_back(tagObj);
    }

    // Output result to stdout
    std::cout << result.dump() << std::endl;
    return 0;
  }
  catch (const std::exception &e)
  {
    std::cerr << "Error: " << e.what() << std::endl;
    return 1;
  }
}
#endif