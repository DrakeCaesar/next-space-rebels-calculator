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

  // Iterative combination generator with incremental updates
  size_t indices[5] = {0, 1, 2, 3, 4};
  int comboCounts[COMBO_COUNT];
  static const int multipliers[] = {1, 1, 2, 5, 15, 30};

  // Initialize combo counts for first combination
  std::memset(comboCounts, 0, sizeof(comboCounts));
  for (int i = 0; i < 5; i++)
  {
    for (const auto &combo : tags[indices[i]].combos)
      comboCounts[combo]++;
  }

  // Calculate initial score
  int score = 1;
  for (int o = 0; o < COMBO_COUNT; o++)
    score *= multipliers[comboCounts[o]];

  if (score > bestScore)
  {
    bestScore = score;
    for (int i = 0; i < 5; i++)
      bestCombination[i] = tags[indices[i]];
  }

  // Generate remaining combinations with incremental updates
  while (true)
  {
    // Find rightmost index that can be incremented
    int pos = 4;
    while (pos >= 0 && indices[pos] == n - 5 + pos)
    {
      pos--;
    }

    if (pos < 0)
      break; // No more combinations

    // Remove combos from tags that will change
    for (int i = pos; i < 5; i++)
    {
      for (const auto &combo : tags[indices[i]].combos)
        comboCounts[combo]--;
    }

    // Update indices
    indices[pos]++;
    for (int i = pos + 1; i < 5; i++)
    {
      indices[i] = indices[i - 1] + 1;
    }

    // Add combos from new tags
    for (int i = pos; i < 5; i++)
    {
      for (const auto &combo : tags[indices[i]].combos)
        comboCounts[combo]++;
    }

    // Calculate score for new combination
    score = 1;
    for (int o = 0; o < COMBO_COUNT; o++)
      score *= multipliers[comboCounts[o]];

    if (score > bestScore)
    {
      bestScore = score;
      for (int i = 0; i < 5; i++)
        bestCombination[i] = tags[indices[i]];
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
#endif