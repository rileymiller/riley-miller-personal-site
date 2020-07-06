---
title: "C++ Inheritance: Subclass Definition (Pt. 1)"
date: "2020-07-06"
description: A short explanation of Inheritance in C++
---
Inheritance is a very useful concept for dealing with object-oriented languages and allows developers to declare generic classes that can then be extended to fit more specific use cases.

In C++, a **derived class**, is a class that is derived from another class, this class is called the **base class**. These terms are also sometimes referred to as a **subclass** for a derived class and a **superclass** for a base class.

A derived class _inherits_ all of the public properties and members of its base class, this is where the term **inheritance** stems from. When an object is instantiated for a derived class, the object will have access to all of the public members of both the derived class and the base class.

## How to Define a Subclass
Given that any class can be extended to have a derived class, the `:` operator is used to specify relationships between classes in C++ inheritance. To define a subclass, you would use `:` and the base class name like:
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
  
  private:
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

  private:
    bool isVisible;
}
```

In this case the Wumpus _inherits_ all of the public members of the base class, `Monster`, and also defines class members that are specific only to the `Wumpus` class.


## C++ Inheritance Articles
- [C++ Inheritance: Protected Member Access (Pt. 2)](../c++-inheritance-protected-members)
- [C++ Inheritance: Inheritance Access Levels (Pt. 3)](../c++-inheritance-relationship)
- [C++ Inheritance: Overriding Base Class Methods (Pt. 4)](../c++-inheritance-base-class-override)
