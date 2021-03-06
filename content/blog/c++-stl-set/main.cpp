#include <iostream>
#include <set>

// Prints a set
template <class T>
void printSet(std::string label, std::set<T> s) {
    std::cout << label << std::endl;

    // Iterates through set<T>
    for (auto itr = s.begin(); itr != s.end(); ++itr)
    {
        std::cout << '\t' << *itr;
    }
    std::cout << std::endl;
    s.begin();
}

template <class S>
void checkIfFound(std::set<S> s, S search) {
    if(s.find(search) != s.end()) {
        std::cout << "Found char: " << search << std::endl;
    } else {
        std::cout << "Did not find char.." << std::endl;
    }
}
int main() {
    std::set<int> firstThree = { 1, 2, 3};

    printSet("Printing firstThree..." , firstThree);

    std::set<char> alphabet{ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                                          'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                                          'w', 'x', 'y', 'z' };


    printSet("Printing alphabet...", alphabet);

    // Copy Alphabet into another set
    std::set<char> copyAlphabet(alphabet.begin(), alphabet.end());
    printSet("Printing copyAlphabet", copyAlphabet);

    std::set<char> vowels;

    /**
     * Finds vowel from alphabet set. The STL set find method returns an iterator
     * to the data that is found.
     */
    vowels.insert({*alphabet.find('a'), *alphabet.find('e'), *alphabet.find('i'),
                   *alphabet.find('o'), *alphabet.find('u')});

    printSet("Printing vowels...", vowels);

    checkIfFound(vowels, 'a');
    checkIfFound(vowels, 'x');

    return 0;
}
