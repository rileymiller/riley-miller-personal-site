---
title: "C++ Inheritance: Protected Member Access (Pt. 2)"
date: "2020-07-06"
description: Protected class members in C++ Inheritance
---
Without inheritance, most classes typically use either _public_ or _private_ to specify the access level of their class members. However, if a derived class tried to interact with a _private_ member of the base class, the compiler would throw an error complaining about a _private_ member being accessed in the derived class. **Example:**
```cpp
// Derived Class
class Wumpus : public Monster {
  public:
    ...
    void SelfDestruct() {
      cout << "GG, Wumpus is outta here" << endl;
      this->hearts = 0; // ERROR
    }

  private:
    bool isVisible;
}
```
Since `hearts` is specified as a _private_ member on the base class, this member cannot be accessed directly by any of the methods of a derived class.

This is where the **protected** access level becomes useful. The protected member access level specifies that any _derived class_ can access the protected member but nothing else. **Example:**

```cpp
// The Base Class
class Monster {
  public:
    void setHealth(int hearts) {
      this->hearts = hearts;
    }

    int getHealth() {
      return this->hearts;
    }
  
  protected:
    int hearts;
}


// Derived Class
class Wumpus : public Monster {
  public:
    void Hide() {
      cout << "Shhhhhhh" << endl;
      this->isVisible = false;
    }

    void Appear() {
      cout << "ARGHHARHGHHHH" << endl;
      this->isVisible = true;
    }

    void SelfDestruct() {
      cout << "GG, Wumpus is outta here" << endl;
      this->hearts = 0; // No Error
    }

  private:
    bool isVisible;
}

int main() {
  Monster base;
  Wumpus derived;

  derived.SelfDestruct() // No Error

  base.hearts = base.hearts + 1; // Error, trying to modify protected member

  cout << "Monster health: " << base.hearts << endl; // Also throws an error
  return 0;
}
```

After moving `int hearts` from _private_ to _protected_ in the base class, `Monster`, the derived class, `Wumpus`, can now interact with the attribute directly without making the compiler unhappy.

However, as shown when trying to access and modify the _protected_ attribute in `main()`, the compiler gets unhappy since only derived classes are allowed to interact with _protected_ members of the base class.

## C++ Inheritance Articles
- [C++ Inheritance: Subclass Definition (Pt. 1)](../c++-inheritance-subclass-definition)
- [C++ Inheritance: Inheritance Access Levels (Pt. 3)](../c++-inheritance-relationship)
- [C++ Inheritance: Overriding Base Class Methods (Pt. 4)](../c++-inheritance-base-class-override)
