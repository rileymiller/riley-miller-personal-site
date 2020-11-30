---
title: "SOLID Principles in Spring Boot Part I"
date: "2020-11-23"
description: Object-oriented SOLID principles in the context of Spring Boot Assignment Pt. I
featuredImage: "../../assets/spring-boot/spring-boot-2-mtns.jpg"
featuredImageDescription: "Photo from Unsplash by"
photographerLink: "https://unsplash.com/@vorosbenisop"
photographerName: "Benjamin Voros"
---

This article will take you through two of the SOLID principles as we build out a light-weight, cryptocurrency digit wallet API in
Spring Boot. By the end of this assignment you will have an understanding of the Single Responsibility Principle (SRP), the Liskov
Substitution Principle, and will have built a simple API for a [cryptocurrency digital wallet](https://www.investopedia.com/terms/d/digital-wallet.asp) that holds [Bitcoin](https://www.investopedia.com/terms/b/bitcoin.asp).

## SOLID Principles

To review, [SOLID Principles](https://en.wikipedia.org/wiki/SOLID) are a set of software design principles in [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming) that are used to make software more maintainable, extensible, and flexible.

The theory of SOLID principles was introduced by Robert C. Martin in his paper [_Design Principles and Design Patterns_](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) and consists of 5 core principles:

**Single-responsibility principle**: A class should only have a single responsibility, that is, only changes to one part of the software's specification should be able to affect the specification of the class.

**Open-closed principle**: A module should be open for extension but closed for modification.

**Liskov substitution principle**: Instances of a class should be replaceable by instances of a derived class without altering correctness of the program.

**Interface segregation principle**: Many client-specific interfaces are better than one general-purpose interface.

**Dependency Inversion principle**: Depend upon abstractions. Do not depend upon concretions.

In this assignment we will deal with the **Single-Responsibility Principle** as well as the **Liskov Subtitution Principle**.

Before we start, make sure that you've completed the [setup](../java-solid-principles-spring-boot-pt1) for this assignment.

## Assignment

In part one of the assignment, we will be working through some exercises to demonstrate the **Single Responsibility Principle** and the **Liskov Substitution Principle**.

If you need some help understanding the starter code or if you're new to Spring, you can reference this short [article](../java-solid-principles-spring-boot-starter-code) that breaks down the starter code in depth.

### Single Responsibility Principle
One of the common urges for developers working in Object-oriented languages is to write tightly coupled logic in the form of monolithic classes that try to address all of the present specifications for the system. You can see this in the implementation given in the starter code where we have two classes `DigitalWalletController` and `DigitalWallet` that handle all of the functionality for the API. There are many things wrong with this implementation but the first thing we'll focus on is the **Single Responsibility Principle**.

If you recall, the **Single Responsibility Principle** states:
> A class should only have a single responsibility, that is, only changes to one part of the software's specification should be able to affect the specification of the class.

The implementation of `DigitalWallet` given in the starter code violates this principle. The overarching purpose of a digital wallet is to manage digital assets. Inspecting the `DigitalWallet` class, you can see that there are asset specific (Bitcoin) implementation details specified on the class and that these implementation details are tightly coupled to the `DigitalWallet` methods as well. If the specifications of the digital wallet expanded beyond the requirement of just holding Bitcoin in the future, you can see that a considerable refactor would be in order (hint hint, nudge nudge 😉 ).

For the first part of this assignment, we will refactor the `DigitalWallet` class to adhere to the **Single Responsibility Principle** by extracting all of Bitcoin specific logic into it's own class.

Specifically, after you complete this refactor you should have the following directory structure:
```
.../restservice/
		api/
			DigitalWalletController.java
		coins/
			Bitcoin.java
		wallet/
			DigitalWallet.java
```
#### Instructions 🎒
- Create a class called `Bitcoin`
	- Make the `Bitcoin` class a singleton since this will only be used to manage _your_ Bitcoin.
	- Add two static constants to the `Bitcoin` class:
		- `NAME`
		- `WHITE_PAPER`
	- Add one non-static attribute to the `Bitcoin` class:
		- `btc`
	- Create three methods that map to the three endpoints defined in `DigitalWalletController`:
		- Bitcoin processTransation( double requestedBTC )
		- Bitcoin setZero()
		- Bitcoin accountBalance()

	- Create four methods that will be used to [serialize](#serialization) the Java object to a JSON response.
		- public String getName()
		- public double getBTC()
		- public String getWhitePaper()
		- public double getSatoshis()

- Refactor the `DigitalWallet` class to:
	- Contain a reference to the `Bitcoin` singleton
	- Create three methods used to manage the Bitcoin Singleton:
		- public Bitcoin processTransaction( double amount )
		- public Bitcoin zero()
		- public Bitcoin accountBalance()
	- Remove all of the "getters" from this class

- Refactor the `DigitalWalletController` endpoint methods to have a return type of `Bitcoin`

**Note: you should no longer have any of the serialization getters on the `DigitalWallet` class**

_Before proceeding, make sure to test all three of the API endpoints to ensure that they all behave exactly the same as they did prior to extracting Bitcoin into its own class._

### Liskov Substitution Principle
Now that we've pulled out a Bitcoin class from the digital wallet to adhere to the Single Responsibility Principle, we're now going to demonstrate the Liskov Substitution Principle.

To refresh, the Liskov Substitution Principle is based off the idea that:
> Instances of a class should be replaceable by instances of a derived class without altering correctness of the program.

Basically, if we were to swap out the base class for a derived class the methods on the derived class could not specify that it needed any more parameters than what was specified on the base class and on the response, it could not specify any less information than what was returned by the base class in order to uphold the contract of the base class with it's client. This prevents issues when a subclass is switched in for a base class and the child class breaks the existing contract with a client of the base class.

To demonstrate this principle, we will be creating a child class of `Bitcoin` named `BitcoinRobust` (super creative, I know). This `BitcoinRobust` class will inherit all of the attributes of the parent `Bitcoin` class but will now account for transaction fees.

Transaction fees are a common feature of crypto digital exchanges, basically, the exchange takes a slice out of your transaction for providing the infrastructure to make crypto transactions.

In order to implement this we will need to make serveral tweaks.

#### Instructions 🎒
- Change the accesibility of the `Bitcoin` instance attributes as well as the `Bitcoin` constructor to protected. This will allow the derived `BitcoinRobust` class to inherit these attributes and constructor.

- Create a class called `BitcoinRobust`
	- Make this class a singleton.
	- Create two static attributes constants named:
		- `BTC_USD`, which will hold the price of Bitcoin in USD (e.g `BTC_USD` = 18656)
		- `TRANSACTION_FEE_USD`, which will hold the price of the transaction fee in USD (e.g `TRANSACTION_FEE_USD` = 11.66)
	- Implement the `processTransaction` method in the derived `BitcoinRobust` class. This method will now need to deduct a transaction fee off the amount of Bitcoin in the requested transaction. _Note: you should also take the transaction fee into account when checking to see whether or not there are sufficient funds for the transaction._
	- Create one method that will be used to [serialize](#serialization) the Java object to a JSON response.
		- public double getTransactionFeeUSD()

- Refactor the singleton attribute in the `DigitalWallet` from the `Bitcoin` singleton, to the `BitcoinRobust` singleton. Notice, since we are correctly implementing the Liskov Substitution Principle, we are able to seamlessly swap in the `BitcoinRobust` class in the `DigitalWallet` class without having to refactor the `DigitalWallet` class.

Now to test, try entering requests for all of the endpoints into the browser.

You should notice now when sending a request to the `/transaction` endpoint that the amount of BTC in the response is not exactly the same as the amount of BTC added in the transaction.

e.g. Entering `http://localhost:8080/transaction?value=1.22` in the browser should emit a response similar to:
```
{"name":"Bitcoin","transactionFeeUSD":11.66,"btc":1.2193749999999999,"whitePaper":"https://bitcoin.org/bitcoin.pdf","satoshis":1.2193749999999999E8}
```

Notice that the `transactionFeeUSD` field now appears on the response and that the amount of BTC is slightly less than the `1.22` sent in the transaction request.

Once you've verified all of the endpoints after implementing the **Liskov Substitution Principle** this assignment is complete.

## Submission
Submit your assignment on Canvas with your whole directory as a zip file `<lastName-section>-spring-pt1.zip` e.g `Smith-SectionC-spring-pt1.zip`

## Rubric