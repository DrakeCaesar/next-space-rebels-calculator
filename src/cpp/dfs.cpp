#include "dfs.h"

using namespace std;

// Function to find all chains and print the best one
#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <thread>
#include <mutex>
#include <functional>
#include <string>

using namespace std;

void findBestChain(vector<Pair> &pairs, vector<string> &combos)
{
    const int numThreads = thread::hardware_concurrency() / 2;
    unordered_map<string, vector<pair<string, int>>> graph;
    mutex mtx;
    vector<Pair> bestChain;
    int maxSum = 0;

    // Build the graph from the pairs
    for (const auto &p : pairs)
    {
        graph[p.combo1].push_back({p.combo2, p.count});
        graph[p.combo2].push_back({p.combo1, p.count});
    }

    // Helper function for DFS
    function<void(string, vector<Pair> &, int, unordered_set<string> &)> dfs = [&](string combo, vector<Pair> &currentChain, int currentSum, unordered_set<string> &visited)
    {
        if (currentChain.size() == combos.size() - 1)
        { // We've used all combos
            lock_guard<mutex> lock(mtx);
            if (currentSum > maxSum)
            {
                maxSum = currentSum;
                bestChain = currentChain;

                // Print the current best chain
                cout << "      " << maxSum << ": ";
                cout << bestChain[0].combo1 << " ";
                for (const auto &p : bestChain)
                {
                    cout << p.count << " " << p.combo2 << " ";
                }
                cout << endl;
            }
            return;
        }

        visited.insert(combo);

        for (const auto &neighbor : graph[combo])
        {
            if (visited.find(neighbor.first) == visited.end())
            {
                currentChain.push_back({combo, neighbor.first, neighbor.second});
                dfs(neighbor.first, currentChain, currentSum + neighbor.second, visited);
                currentChain.pop_back();
            }
        }

        visited.erase(combo);
    };

    // Function to run DFS in a thread
    auto threadFunc = [&](string startCombo)
    {
        vector<Pair> currentChain;
        unordered_set<string> visited;
        dfs(startCombo, currentChain, 0, visited);
    };

    vector<thread> threads;
    for (size_t i = 0; i < combos.size(); ++i)
    {
        if (threads.size() >= numThreads)
        { // Wait for some threads to finish if we've hit the limit
            for (auto &t : threads)
            {
                if (t.joinable())
                {
                    t.join();
                }
            }
            threads.clear(); // Clear the thread vector after joining
        }
        threads.push_back(thread(threadFunc, combos[i]));
    }

    // Join any remaining threads
    for (auto &t : threads)
    {
        if (t.joinable())
        {
            t.join();
        }
    }

    // Print the final best chain
    cout << "Best: " << maxSum << ": ";
    cout << bestChain[0].combo1 << " ";
    for (const auto &p : bestChain)
    {
        cout << p.count << " " << p.combo2 << " ";
    }
    cout << endl;
}

void printBestChain()
{
    vector<Pair> pairs = {
        {"ASPIRING", "SMART", 8},
        {"AWESOME", "COOL", 7},
        {"FUNNY", "WEIRD", 7},
        {"COOL", "WEIRD", 6},
        {"CREEPY", "WEIRD", 6},
        {"CUTE", "WILD", 5},
        {"WEIRD", "WILD", 5},
        {"AWESOME", "WILD", 4},
        {"COOL", "GROSS", 4},
        {"CUTE", "FUNNY", 4},
        {"GEEKY", "SMART", 4},
        {"GEEKY", "WILD", 4},
        {"ASPIRING", "AWESOME", 3},
        {"AWESOME", "CREEPY", 3},
        {"AWESOME", "CUTE", 3},
        {"AWESOME", "NAUGHTY", 3},
        {"AWESOME", "SMART", 3},
        {"COOL", "CUTE", 3},
        {"COOL", "SMART", 3},
        {"CREEPY", "WILD", 3},
        {"CUTE", "WEIRD", 3},
        {"FUNNY", "GROSS", 3},
        {"GEEKY", "WEIRD", 3},
        {"GROSS", "NAUGHTY", 3},
        {"NAUGHTY", "WILD", 3},
        {"SMART", "WEIRD", 3},
        {"ASPIRING", "COOL", 2},
        {"AWESOME", "FUNNY", 2},
        {"AWESOME", "WEIRD", 2},
        {"CREEPY", "CUTE", 2},
        {"CREEPY", "FUNNY", 2},
        {"CREEPY", "NAUGHTY", 2},
        {"CUTE", "GROSS", 2},
        {"CUTE", "NOOB", 2},
        {"FUNNY", "NAUGHTY", 2},
        {"FUNNY", "NOOB", 2},
        {"GROSS", "WEIRD", 2},
        {"NOOB", "WEIRD", 2},
        {"SMART", "WILD", 2},
        {"ASPIRING", "FUNNY", 1},
        {"ASPIRING", "GEEKY", 1},
        {"ASPIRING", "GROSS", 1},
        {"ASPIRING", "NOOB", 1},
        {"ASPIRING", "WEIRD", 1},
        {"ASPIRING", "WILD", 1},
        {"AWESOME", "GROSS", 1},
        {"AWESOME", "NOOB", 1},
        {"COOL", "WILD", 1},
        {"CREEPY", "GEEKY", 1},
        {"CREEPY", "SMART", 1},
        {"CUTE", "GEEKY", 1},
        {"CUTE", "SMART", 1},
        {"FUNNY", "SMART", 1},
        {"GEEKY", "GROSS", 1},
        {"GEEKY", "NOOB", 1},
        {"GROSS", "NOOB", 1},
        {"GROSS", "WILD", 1},
        {"NAUGHTY", "WEIRD", 1},
        {"NOOB", "WILD", 1}};

    vector<string> combos = {
        "ASPIRING", "AWESOME", "COOL", "CREEPY", "CUTE", "FUNNY",
        "GEEKY", "GROSS", "NAUGHTY", "NOOB", "SMART", "WEIRD", "WILD"};

    // Adding +1 to each pair that is part of a triple
    vector<Pair> triples = {
        {"ASPIRING", "AWESOME", 1},
        {"ASPIRING", "SMART", 1},
        {"AWESOME", "SMART", 1},
        {"ASPIRING", "AWESOME", 1},
        {"ASPIRING", "WEIRD", 1},
        {"AWESOME", "WEIRD", 1},
        {"CREEPY", "CUTE", 1},
        {"CREEPY", "WEIRD", 1},
        {"CUTE", "WEIRD", 1}};

    for (const auto &triple : triples)
    {
        for (auto &pair : pairs)
        {
            if ((pair.combo1 == triple.combo1 && pair.combo2 == triple.combo2) ||
                (pair.combo1 == triple.combo2 && pair.combo2 == triple.combo1))
            {
                pair.count += triple.count;
            }
        }
    }

    findBestChain(pairs, combos);
}
