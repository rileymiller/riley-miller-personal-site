---
title: "C++ Inheritance: Inheritance Access Levels (Pt. 3)"
date: "2020-07-06"
description: Relationship between the Base Class and Derived Class as specified in the class definition
---
### C++ Member Access Levels
With the three member access levels for classes, it is easy to get them confused and to understand the limitations and meaning behind each access level.

| Keyword | Meaning |
| ------------ | ------- |
| **public**     | Accessible everywhere |
| **protected**  | Accessible by self and derived classes |
| **private**    | Accessible by self |

### Inheritance Access Levels
A common point of confusion for the `(public|protected|private)` keywords is understanding what they mean within the context of describing member access level versus the inheritance relationship between a derived class and a base class. Using our example, when _public_ is used during class definition like in:
```cpp
class Wumpus : public Monster {
  // Wumpus definition
}
```

_public_ actually describes the inheritance between `Wumpus` and `Monster`. Specifically, when _public_ is used during class definition, it is specifying that all _public_ class members of `Monster` are accessible as _public_ class members of `Wumpus` and that all _protected_ class members of `Monster` are also accessible as _protected_ class members of `Wumpus`.

When learning inheritance, you will typically see _public_ used to describe the inheritance relationship between derived and base classes. However, both _private_ and _protected_ can be used to describe the inheritance relationship as well.

For example, when _protected_ is used to describe the inheritance relationship, the _public_ and _protected_ members of the base class are accessible only as _protected_ members of the derived class.
```cpp
// The Base Class
class Monster {
  public:
    int screams = 0;

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
class Wumpus : protected Monster {
  public:
    void Hide() {
      cout << "Shhhhhhh" << endl;
      this->screams = 0;
      this->isVisible = false;
    }

    void Appear() {
      cout << "ARGHHARHGHHHH" << endl;
      this->screams = this->screams + 1;
      this->isVisible = true;
    }

  private:
    bool isVisible;
}

int main() {
  Monster base;
  Wumpus derived;

  cout << "Monster screams: " << base.screams << endl; // No Error

  derived.Hide() // No Error

  cout << "Wumpus screams: " << derived.screams << endl; // Error
  return 0;
}
```

Now that the inheritance relationship of `Wumpus` is described as _protected_ instead of _public_, the `int screams` _public_ member of `Monster` is only accessible as a _protected_ member on `Wumpus`.

In the code snippet above, you can see that calling the `Hide()` method on Wumpus doesn't throw any errors because `screams` is modified within `Wumpus`. However, when trying to access `screams` on the `Wumpus` object within the scope of `main()`, the compiler will throw an error complaining about accessing a _protected_ attribute.

When describing the inheritance relationship, _public_, _protected_, and _private_ mean:

| Keyword | Meaning |
| ------------ | ------- |
| **public**     | _public_ and _protected_ members of the base class are accessible correspondingly as _public_ and _protected_ members of the derived class |
| **protected**  | _public_ and _protected_ members of the base class are accessible correspondingly as _protected_ members of the derived class |
| **private**    | _public_ and _protected_ members of the base class are accessible correspondingly as _private_ members of the derived class |

It is also noteworthy that if the inheritance relationship is not explicitly described, it will default to _private_. **Example:**
```cpp
class Wumpus : Monster {
  // Wumpus class definition
}
```
Using the class definition above, the _public_ and _protected_ members of `Monster` will only be accessible as _private_ on `Wumpus`.

## C++ Inheritance Articles
- [C++ Inheritance: Subclass Definition (Pt. 1)](../c++-inheritance-subclass-definition)
- [C++ Inheritance: Protected Member Access (Pt. 2)](../c++-inheritance-protected-members)
- [C++ Inheritance: Overriding Base Class Methods (Pt. 4)](../c++-inheritance-base-class-override)
- [C++ Inheritance: Polymorphism (Pt. 5)](../c++-inheritance-polymorphism)

