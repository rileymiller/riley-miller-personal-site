#include <iostream>

void printAddressesAndValues(int val1, int val2, int *x, int *y) {
    std::cout << "val1: " << val1 << " val2: " << val2 << std::endl;
    // Point to value
    std::cout << "Pointer X: " << x << ", " << *x <<  std::endl;
    // Point to value
    std::cout << "Pointer Y: " << y << ", " << *y << std::endl;
    std::cout << std::endl;
}
int main() {
    // Initialize integers
    int val_1 = 14;
    int val_2 = 67;

    // Initialize integer pointers
    int* x;
    int* y;

    // Point to address
    x = &val_1;
    y = &val_2;


    printAddressesAndValues(val_1, val_2, x, y);

    // Change value via pointer
    *x = 32;

    printAddressesAndValues(val_1, val_2, x, y);

    // Copy pointer memory address
    y = x;

    printAddressesAndValues(val_1, val_2, x, y);

    // Change value via pointer
    *y = 42;

    printAddressesAndValues(val_1, val_2, x, y);

    return 0;
}
