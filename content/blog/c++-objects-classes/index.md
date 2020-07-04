---
title: Objects and Classes in C++
date: "2020-07-03"
description: A short explanation of objects and classes in C++
---

C++ is an object-oriented language.

Pretty much everything in C++ revolves around the representation of data as **classes** and their instantiation, **objects**.

Classes have **attributes** and **methods** that are used to represent the specific type of data that a class contains and how that data can be manipulated and mutated.

Class attributes are typically referred to as **variables** and class methods are referred to as **functions**. Together, the data model of attributes and methods are referred to as **class members** in C++.

One way to think about classes in C++ is as a recipe. Recipes are used to create food much like classes are used to instantiate objects. The recipe by itself doesn't actually amount to anything unless you decide to buy the ingredients (resource allocation) and put the recipe together (instantiate an object of a class). Like in recipes, you can decide to cook a recipe as many times as you'd like just like we can instantiate as many objects as we'd like of a specific class. Overseeing this process are the developers. Much like a first-rate chef curating their own recipes to perfection, developers define and refine classes to express their ideas and to write beautiful code.

## How to Declare a Class
To declare a class in C++ there are several methodologies.

You can either write the class definition in a header file, `.h`, and use the [linker](https://www.learncpp.com/cpp-tutorial/introduction-to-the-compiler-linker-and-libraries/) to connect the class definition to a class `.cpp` file where implementation lives. An example of this style of class definition can be found in this [repo](https://github.com/rileymiller/riley-miller-personal-site/tree/master/content/blog/c%2B%2B-objects-classes).

Or you can keep the class implementation coupled to the class definition and declare the class methods within the definition itself. Below is an example of the inline class definition.
```cpp
class MeatballSub {
  public:
    void PrintMeatballMessage() {
      cout << "This is a savory sandwich" << endl;
    }
}

int main() {
  // Instantiate a Meatball Sub
  MeatballSub lunch;

  // Print the Meatball message
  lunch.PrintMeatballMessage()

  return 0;
}
```
After compiling this program successfully and running the executable, the following output will be generated:
```shell
This is a savory sandwich
```

This program will print out the message defined in the class method `PrintMeatballMessage()` and return an exit code of 0 so that the Operating System knows that the program completed succcessfully. 

Classes are an extremely powerful primitive built into the C++ programming language and are the primary means of data representation in the object-oriented langauge.

Classes are also commonly leveraged as building blocks of complex data structures and other abstractions to allow programmers to solve all sorts of different challenges.