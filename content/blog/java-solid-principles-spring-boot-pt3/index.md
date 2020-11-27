---
title: "SOLID Principles in Spring Boot: Open-closed Principle, Dependency Inversion Principle, and Interface Segregation Principle"
date: "2020-11-26"
description: Object-oriented SOLID principles in the context of Spring Boot Assignment Pt. 2
featuredImage: "../../assets/spring-boot/spring-boot-3-mtns.jpg"
featuredImageDescription: "Photo from Unsplash by"
photographerLink: "https://unsplash.com/@danieljschwarz"
photographerName: "Daniel Schwarz"
---

This article will take you through the remaining SOLID principles as we build out a light-weight, cryptocurrency digit wallet API in
Spring Boot. By the end of this assignment you will have an understanding of the Open-closed Principle (OCP), the Dependency Inversion Principle (DIP), and the Interface Segregation Principle (ISP).

## SOLID Principles

To review, [SOLID Principles](https://en.wikipedia.org/wiki/SOLID) are a set of software design principles in [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming) that are used to make software more maintainable, extensible, and flexible.

The theory of SOLID principles was introduced by Robert C. Martin in his paper [_Design Principles and Design Patterns_](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) and consists of 5 core principles:

**Single-responsibility principle**: A class should only have a single responsibility, that is, only changes to one part of the software's specification should be able to affect the specification of the class.

**Open-closed principle**: A module should be open for extension but closed for modification.

**Liskov Substitution principle**: Instances of a class should be replaceable by instances of a derived class without altering correctness of the program.

**Interface Segregation principle**: Many client-specific interfaces are better than one general-purpose interface.

**Dependency Inversion principle**: Depend upon abstractions. Do not depend upon concretions.

In this assignment we will deal with the **Open-closed principle**, **Dependency Inversion principle**, and the **Interface Segregation principle**.

Before we start, make sure that you've completed the [setup](../java-solid-principles-spring-boot-pt1) and [Part 1](../java-solid-principles-spring-boot-pt2) prior to starting Part 2.

## Starter Code

After completing [Part 1](../java-solid-principles-spring-boot-pt2) of the assignment, your project should have the following classes and directory structure below 👇:

```
.../restservice/
				api/
					DigitalWalletController.java
				coins/
					Bitcoin.java
					BitcoinRobust.java
				wallet/
					DigitalWallet.java
```

## Assignment

This assignment will focus on decoupling the architecture we implemented in [Part 1](../java-solid-principles-spring-boot-pt2) to support future requirements of the `DigitalWallet`.

### Open-closed Principle
The first part of the assignment will deal with the **Open-closed principle**.

[Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin), one of the father's of Agile software development described that the Open-closed principle was the most important of the five SOLID principles. This principle is based off the idea that:

> A module should be open for extension but closed for modification.

In essence, you can use abstract classes or interfaces to allow for different implementations without changing the code that uses them. Since interfaces are built into Java to handle Multi-Inheritance, they lend themselves well for upholding the Open-closed principle. For our use-case, interfaces will be closed for modification and we will use new classes to extend the functionality of our system. 

To demonstrate this principle, we will revisit the `DigitalWallet` class and reimagine how we could make it more flexible and loosely coupled to handle future use cases. 

The three methods implemented in the `DigitalWallet` class: `processTransaction`, `zero`, and `accountBalance` are all configured to handle Bitcoin. If we wanted to add other types of coins to our wallet, we'd need to refactor our `DigitalWallet` class so let's do that now.

#### Instructions

- Create an interface called `ICoin` that speficies the 3 API methods in the `DigitWallet` class:
	- `processTransaction`
	- `zero`
	- `accountBalance`

- Implement the method on the `Bitcoin` class (Note: you only have to implement the interface on the base `Bitcoin` class since `BitcoinRobust` is a child class)

- Change the return type of the three API methods in the `DigitalWallet` class: `processTransaction`, `zero`, and `accountBalance`, to the new interface `ICoin`.

- Change the return type of the endpoints in `DigitalWalletController` to `ICoin`.

At this point, the `DigitalWallet` class is almost heeding to the Open-closed principle but there is one more consideration we must take into account to fully decouple this class from implementation details and ensure that the class is open for extension yet closed for modification.

### Dependency Inversion principle

The Dependency Inversion principle specifies that modules should:

> Depend upon abstractions. Do not depend upon concretions.

In the `DigitalWallet` class, although we created and implemented the `ICoin` interface--the `DigitalWallet` class is still relying on the Bitcoin singleton in all three of the API methods. This is an example of relying on a concretion instead of an abstraction and is also preventing the class from complying with the Open-closed principle since you would need to modify the `DigitalWallet` class if you wanted to add another coin to the wallet like [Ethereum](https://ethereum.org/en/) 😉.

#### Instructions

- Remove the references of the `Bitcoin` singleton from the `DigitalWallet` class and refactor the three API methods to have a parameter `ICoin coin` that is used to call the corresponding `ICoin` method.
- In `DigitalWalletController`, pass the `Bitcoin` singleton into the `DigitalWallet` methods for each endpoint.

After this refactor, the `DigitalWallet` class is dependent completely on abstraction now that we've inverted the dependency on the Bitcoin singleton to the client that invokes the `DigitalWallet` methods, making this class loosely coupled and flexible.

We're now adhering to the **Open-closed principle** as well as the **Dependency Inversion principle**.