---
title: "C++ Inheritance: Overriding Base Class Methods (Pt. 4)"
date: "2020-07-06"
description: Overriding Base Class Methods in C++
---
Oftentimes when defining a derived class, you need to add specific functionality to a method inherited from the base class to suit the needs of the subclass. This process is called **overriding**. 

There is an important distinction between _overriding_ and _overloading_. _Overriding_ refers to the process of redefining a method inherited from the base class that contains the same parameters. Whereas, _overloading_ refers to the process of defining a method in the derived class with the same name but different parameters.

An example of method _overriding_ is:
```cpp
// The Base Class
class Monster {
  public:
    string Shout() {
      return "WSDFSFDS";
    }
  
  private:
    int hearts;
}


// Derived Class
class Wumpus : public Monster {
  public:
    string Shout() {
      return "wummmmmwummmmmwummmmmwummmmm";
    }

  private:
    bool isVisible;
}

int main() {
  Wumpus derived;

  cout << derived.Shout() << endl;

  return 0;
}
```

Calling `main()` would produce the following output:
```shell
$ ./monster
wummmmmwummmmmwummmmmwummmmm
$ echo $?
0
```

### Calling Base Class Functions
Sometimes when _overriding_ functions you wish to add functionality at the derived class level instead of completely overhauling the inherited function. To call a base class function within a derived class, you would write the base class name followed by the **scope resolution operator** (`::`):
```cpp
// The Base Class
class Monster {
  public:
    string Shout() {
      return "WSDFSFDS";
    }
  
  private:
    int hearts;
}


// Derived Class
class Wumpus : public Monster {
  public:
    string Shout() {
      return Monster::Shout() + "wummmmmwummmmmwummmmmwummmmm";
    }

  private:
    bool isVisible;
}
```

When calling the base class method within the derived class method override, the derived class `Shout()` method would now output:
```shell
$ ./monster
WSDFSFDSwummmmmwummmmmwummmmmwummmmm
$ echo $?
0
```

## C++ Inheritance Articles
- [C++ Inheritance: Subclass Definition (Pt. 1)](../c++-inheritance-subclass-definition)
- [C++ Inheritance: Protected Member Access (Pt. 2)](../c++-inheritance-protected-members)
- [C++ Inheritance: Inheritance Access Levels (Pt. 3)](../c++-inheritance-relationship)
- [C++ Inheritance: Polymorphism (Pt. 5)](../c++-inheritance-polymorphism)
