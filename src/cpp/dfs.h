#ifndef DFS_H
#define DFS_H

#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <functional>

using namespace std;

// Structure to hold pairs with their counts
struct Pair
{
    string combo1;
    string combo2;
    int count;
};

// Function to find all chains and print the best one
void findBestChain(vector<Pair> &pairs, vector<string> &combos);

// Function to print the best chain
void printBestChain();

#endif // DFS_H