---
title: "C++ Inheritance: Polymorphism (Pt. 5)"
date: "2020-07-07"
description: Polymorphism in C++
---
A key facet of _inheritance_ in C++ is **polymorphism**, where execution can vary based off of data type. This becomes particulary useful when defining subclasses that require different functionality than the parent class.

In C++ there are two types of polymorphism, **compile-time polymorhpism** and **run-time polymorphism**. Both of these terms refer to _when_ the compiler is able to determine which function to call.

Compile-time polymorphism is typically affiliated with **method overriding** where the compiler is able to determine which method to invoke when there are identical methods that have different paramters. **Ex:**

```cpp
class Monster {
  public:
    void Scream() {
      cout << "AHDSFDSFSD" << endl;
    }

    void Scream(int n) {
      cout << "IM SCARY X" << n << endl;
    }
}
```
In the example above, the C++ compiler is smart enough to know that if a `Monster` object calls the `Scream` method without passing in any parameters, it will call the first implementation, but if it calls `Scream(3)` it will invoke the second implementation of `Scream` because the method is taking in an integer parameter.

Which leads us to run-time polymorphism, where the compiler isn't able to determine which function to call during compilation. The run-time style of polymorphism is commonly seen in practice when declaring containers that can hold instances of a base class and its subclasses. For example:

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

    void SelfDestruct() {
      cout << "Monster go bye-bye" << endl;
      this->hearts = 0;
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
      this->hearts = 2;
    }

  private:
    bool isVisible;
}

int main() {
  Monster* base;
  Wumpus* derived;

  vector<Monster*> monstars;

  monstars.push_back(base);
  monstars.push_back(derived);

  base = &derived;
  cout << base->SelfDestruct() << endl;
  return 0;
}
```

In the `main()` method you can see that we're able to add a pointer to a `Wumpus` class to a `Monster *` vector. This is made possible by a C++ feature called base/derived class pointer conversion, where the language is able to impicitly cast a derived class pointer to a pointer of the base class without any explicit type casting. However, now that the `Wumpus` pointer has been cast to a `Monster` pointer, the program would need a way to tell which implementation of the `SelfDestruct` method to call for both the `Wumpus *` and `Monster *` during execution. Enter *virtual functions**.

## Virtual Functions
In order to distinguish which implementation of `SelfDestruct` to call during the program execution, C++ exposes some interesting language features for us to enable run-time polymorphism. Specifically, the `virtual` keyword which can be preprended to a method declaration in the base class which signifies that any subclass definition can override this method and then when the virtual function is called during execution, the program can determine which function to call between the base class and the derived class based off the type of the object.

Now, if we revisit the example above, when we try to call the `SelfDestruct` method of the reference to the `Wumpus` object. The program will actually output the `Monster` classes implementation of the `SelfDestruct()` method.. not the `Wumpus` implementation. **Output:**

```shell
$ ./runtime-poly
Monster go bye-bye
```

In order to enable run-time polymorphism, we need to allow the subclass to override the base class using the `virtual` keyword.

Another useful keyword that is used with polymorphism in C++ is **override**. The `override` keyword is optional, and is appended to the method declaration. The `override` keyword gives you typechecking when overriding a base class virtual method so that you don't accidentally mispell the method name or specify incorrect parameters to the function.

Here is an updated version of the example above using the `virtual/override` implementation so that we can dynamically specify the correct method at run-time.

**Example:**
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

    virtual void SelfDestruct() {
      cout << "Monster go bye-bye" << endl;
      this->hearts = 0;
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

    void SelfDestruct() override {
      cout << "GG, Wumpus is outta here" << endl;
      this->hearts = 2;
    }

  private:
    bool isVisible;
}

int main() {
  Monster* base;
  Wumpus* derived;

  vector<Monster*> monstars;

  monstars.push_back(base);
  monstars.push_back(derived);

  base = &derived;
  cout << base->SelfDestruct() << endl;
  return 0;
}
```

This will output:
```shell
./updated-runtime-poly
GG, Wumpus is outta here
```


The `virtual` and `override` keywords should be used:

| keyword | Where To Use It |
| ------  | --------------- |
| `virtual`| base class method that is being overridden by a subclass |
| `override` | derived class method that is overriding the base class method |

## Pure Virtual Functions
Sometimes a base class will not specify an implementation for a specific method and will instead rely on the subclass define this method in its own class definition. These functions are called **pure virtual function** and they are specified by appending `const = 0;` after the method name. **Example:**
```cpp
class Monster {
  public:
    virtual void Dance() const = 0;

  protected:
    int health;
}

class Wumpus : public Monster {
  public:
    void Dance() const override {
      cout << "Wumpus getting groovy" << endl;
    }
}
```

**IMPORTANT!!** Whenever a base class implements a pure virtual method, **this class cannot be instantiated as an object**, this class is called an **abstract base class** and is used to define a set of common attributes and methods that each subclass should define.