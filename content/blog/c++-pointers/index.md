---
title: "C++ Pointers Basics"
date: "2020-07-30"
description: Basics of C++ pointers
featuredImage: "../../assets/pointers-ken.jpg"
featuredImageDescription: "Photo from Unsplash by"
photographerName: "Ken Reid"
photographerLink: "https://unsplash.com/@kennykiyoshi"
---

# Under Construction 🚧

> [Code](https://github.com/rileymiller/riley-miller-personal-site/blob/master/content/blog/c++-pointers/main.cpp) referenced in article.

C++ pointers are an extremely powerful primitive in the programming language which allows developers to directly manipulate memory during program execution.

Pointers usually get a bad rap for being confusing or "dangerous" but once you dig in and begin to understand them, they're pretty intuitive.

The C++ [docs](http://www.cplusplus.com/doc/tutorial/pointers/) broke pointers down in a way that I really liked focusing on two commonly used operators when working with pointers: `*` and `&`.

## Pointer Initialization
When starting with pointers, I've found that the easiest way to begin is by describing how to initialize them.

```cpp
int * x;
int * y;
```

## Address-of operator (&)
The docs refer to `&` as the "address-of" operator.

When the `&` is used to prefix data in C++, it returns the **memory address** of the data on the stack or heap.

```cpp
int a = 1;

int * x;

x = &a;
```

## Dereference Operator (*)

## Change Value of Pointed-to Data

## Copy Pointer