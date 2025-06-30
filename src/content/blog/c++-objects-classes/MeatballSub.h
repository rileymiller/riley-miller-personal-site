//
// Created by Riley Miller on 6/28/20.
//
#include <string>
#ifndef C___OBJECTS_CLASSES_MEATBALLSUB_H
#define C___OBJECTS_CLASSES_MEATBALLSUB_H
class MeatballSub {
public:
    // Default Constructor
    MeatballSub();

    // Constructor
    MeatballSub(int, int, int, std::string);

    // Member Functions
    int getMeatballs();
    void setMeatballs(int);

    int getOzMarinara();
    void setOzMarinara(int);

    int getCheeseSlices();
    void setCheeseSlices(int);

    std::string getTypeBread();
    void setTypeBread(std::string);

    std::string to_string();

private:
    int _meatballs;
    int _ouncesMarinara;
    int _cheeseSlices;
    std::string _typeBread;

};
#endif //C___OBJECTS_CLASSES_MEATBALLSUB_H
