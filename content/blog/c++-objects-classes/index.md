# C++ Objects and Classes

C++ is an object-oriented language and objects and classes are the primary data structure for manipulating data in the programming language.

## Classes
Classes are used as an instruction manual for what type of data can be bounded to a specific instance of a class. 

## Objects
The specific instance of a class is an object, and every object that is instantiated has the same rules and specifications of how to behave as every other object instantiated from the same class. Although the object is stored in a different location in memory, and may have its data members set to different values, all objects of the same class will be bounded by the same rules as all of the other objects from the same class.

## Recipe 🍜
Another way to think about this paradigm is that a _class_ is like a recipe. A recipe specifies the specific ingredients, the quantity of the ingredients, and how to mix them together, and in which order. Whereas, the _object_ is the physical manifestation of the recipe, the product of the recipe.

```cpp
// MeatballSub.h
class MeatballSub {
  public:
    // Default Constructor
    MeatballSub();

    // Constructor
    MeatballSub(int, int, int, string);

    // Member Functions
    int getMeatballs();
    void setMeatballs(int);

  private:
    int _meatballs;
    int _ouncesMarinara;
    int _cheeseSlices;
    string _typeBread;

}
```