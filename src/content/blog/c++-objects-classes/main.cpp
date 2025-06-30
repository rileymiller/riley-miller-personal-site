#include <iostream>
#include "MeatballSub.h"

int main() {

    MeatballSub firstSub;
    MeatballSub customSub(2,6,3, "White");

    std::cout << firstSub.to_string() << std::endl;

    std::cout << customSub.to_string() << std::endl;

    // Hmm I like Wheat bread
    firstSub.setTypeBread("Wheat");

    // Oooo I would like some more cheese now
    customSub.setCheeseSlices(6);

    std::cout << "After some sandwich modifications" << std::endl;

    std::cout << firstSub.to_string() << std::endl;

    std::cout << customSub.to_string() << std::endl;
    return 0;
}
