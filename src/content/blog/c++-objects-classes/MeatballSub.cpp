//
// Created by Riley Miller on 6/28/20.
//

#include "MeatballSub.h"

MeatballSub::MeatballSub() {
    _meatballs = 0;
    _ouncesMarinara = 0;
    _cheeseSlices = 0;
    _typeBread = "None";
}

MeatballSub::MeatballSub(int meatballs, int ozMarinara, int cheeseSlices, std::string typeBread) {
    _meatballs = meatballs;
    _ouncesMarinara = ozMarinara;
    _cheeseSlices = cheeseSlices;
    _typeBread = typeBread;
}

int MeatballSub::getMeatballs() { return _meatballs;}
int MeatballSub::getOzMarinara() { return _ouncesMarinara;}
int MeatballSub::getCheeseSlices() { return _cheeseSlices; }
std::string MeatballSub::getTypeBread() { return _typeBread; }

void MeatballSub::setMeatballs(int m) { _meatballs = m; }
void MeatballSub::setOzMarinara(int oz) { _ouncesMarinara = oz; }
void MeatballSub::setCheeseSlices(int slices) { _cheeseSlices = slices; }
void MeatballSub::setTypeBread(std::string type) { _typeBread = type; }

std::string MeatballSub::to_string() {
    return "Num Meatballs: " + std::to_string(_meatballs) + " Slices of Cheese: "
    + std::to_string(_cheeseSlices) + " Ounces of Marinara: " + std::to_string(_ouncesMarinara)
    + " Type of bread: " + _typeBread;
}