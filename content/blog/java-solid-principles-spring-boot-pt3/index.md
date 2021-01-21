---
title: "SOLID Principles in Spring Boot Part II"
date: "2020-11-26"
description: Object-oriented SOLID principles in the context of Spring Boot Assignment Pt. II
featuredImage: "../../assets/spring-boot/spring-boot-3-mtns.jpg"
featuredImageDescription: "Photo from Unsplash by"
photographerLink: "https://unsplash.com/@danieljschwarz"
photographerName: "Daniel Schwarz"
previous: "java-solid-principles-spring-boot-pt3"
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

#### Instructions 🎒

- Create an interface called `ICoin` that speficies the 3 API methods in the `DigitWallet` class:
	- `processTransaction`
	- `zero`
	- `accountBalance`

- Implement the method on the `Bitcoin` class (Note: you only have to implement the interface on the base `Bitcoin` class since `BitcoinRobust` is a child class)

- Change the return type of the three API methods in the `DigitalWallet` class: `processTransaction`, `zero`, and `accountBalance`, to the new interface `ICoin`.

- Change the return type of the endpoints in `DigitalWalletController` to `ICoin`.

After this refactor, test all of the API endpoints and ensure that the output is still the same.

At this point, the `DigitalWallet` class is almost heeding to the Open-closed principle but there is one more consideration we must take into account to fully decouple this class from implementation details and ensure that the class is open for extension yet closed for modification.

### Dependency Inversion principle

The Dependency Inversion principle specifies that modules should:

> Depend upon abstractions. Do not depend upon concretions.

In the `DigitalWallet` class, although we created and implemented the `ICoin` interface--the `DigitalWallet` class is still relying on the Bitcoin singleton in all three of the API methods. This is an example of relying on a concretion instead of an abstraction and is also preventing the class from complying with the Open-closed principle since you would need to modify the `DigitalWallet` class if you wanted to add another coin to the wallet like [Ethereum](https://ethereum.org/en/) 😉.

#### Instructions 🎒

- Remove the references of the `Bitcoin` singleton from the `DigitalWallet` class and refactor the three API methods to have a parameter `ICoin coin` that is used to call the corresponding `ICoin` method.
- In `DigitalWalletController`, pass the `Bitcoin` singleton into the `DigitalWallet` methods for each endpoint.

After this refactor, the `DigitalWallet` class is dependent completely on abstraction now that we've inverted the dependency on the Bitcoin singleton to the client that invokes the `DigitalWallet` methods, making this class loosely coupled and flexible.

We're now adhering to the **Open-closed principle** as well as the **Dependency Inversion principle**.

### Ethereum
[Ethereum](https://ethereum.org/en/) is a global, open-source platform for decentralized applications. It runs off a cryprocurrency called Ether (ETH) which is used to power thousands of [Distributed applications](https://blockgeeks.com/guides/dapps/) (Dapps).

Now that we've extended our `DigitalWallet` class, let's go on and add another coin to our wallet.

#### Instructions 🎒
- Create a class called `Ethereum` that implements the `ICoin` interface.
	- Make the `Ethereum` class a singleton since this will only be used to manage _your_ Ethereum.
	- Add two static constants to the `Ethereum` class:
		- `NAME`
		- `WHITE_PAPER`
	- Add one non-static attribute to the `Ethereum` class:
		- `ether`
	- Create two static attributes constants named:
		- `ETHER_USD`, which will hold the price of Ethereum in USD (e.g `ETHEREUM_USD` = 524.44)
		- `TRANSACTION_FEE_USD`, which will hold the price of the transaction fee in USD (e.g `TRANSACTION_FEE_USD` = 11.66)
	- Create three methods that map to the three endpoints defined in `DigitalWalletController`:
		- Ethereum processTransation( double requestedEther ), This method will now need to deduct a transaction fee off the amount of Bitcoin in the requested transaction. _Note: you should also take the transaction fee into account when checking to see whether or not there are sufficient funds for the transaction._
		- Ethereum setZero()
		- Ethereum accountBalance()

	- Create four methods that will be used to [serialize](../java-solid-principles-spring-boot-pt2#serialization) the Java object to a JSON response.
		- public String getName()
		- public double getEther()
		- public String getWhitePaper()
		- public double getTransactionFeeUSD()

- Refactor the endpoints in `DigitalWalletController` to be prefixed with `/btc/` e.g `@GetMapping("/btc/transaction")`
	- You should also rename the underlying methods of these endpoints e.g `wallet(...)` ➡️ `btc_balance(...)`

- Create a reference to the `Ethereum` singleton in the `DigitalWalletController` class.
- Create three new endpoints/methods in `DigitalWalletController` all prefixed with `/eth/`:
	- `@GetMapping("/eth/transaction")`, public ICoin eth_transaction(..)
	- `@GetMapping("/eth/balance")`, public ICoin eth_balance(..)
	- `@GetMapping("/eth/zero")`, public ICoin eth_zero(..)

**Note: All of the Ethereum endpoints should pass the Ethereum singleton into the respective DigitalWallet methods.**

Working through extending the service by adding a whole different cryptocurrency to our digital wallet shows the benefits of SOLID design.

We were able to extend the servce my implementing an `Ethereum` class _without_ having to even touch the `DigitalWallet` class while making
use of 4 out of the 5 SOLID principles.

However, we still have yet to cover the I in SOLID.

## Interface Segregation Principle
The Interface Segregation Principle (ISP) is one of the most commonly used SOLID principles. The principle states:

> Many client-specific interfaces are better than one general-purpose interface.

Thus far, we have only made use of one interface: `ICoin`. Placing all of the attributes that a coin _must_ have in order
to function correctly in our Digital Wallet.

Interfaces have many benefits, my favorite being composability which relates directly to ISP. By breaking general-purpose interfaces
up into smaller single-purpose interfaces, it gives your service substantially more flexibility since there is no limit to the number of
interfaces that a class can implement. It doesn't make sense to create an interface for every method that you have on a single class, that would
become difficult to maintain and largely unnecessary. However, if you have two classes that need to implement similar functionality and they're not
strictly related--this would be an excellent use case to define an interface and describe the functionality between the two classes.

In our use-case, Ethereum is much more than just a cryptocurrency. It's a full-blown open-source platform that give developers the ability to write distributed applications (Dapps) with blockchain technology. Specifically, Ethereum has this entity called a [smart-contract](https://ethereum.org/en/developers/docs/smart-contracts/#:~:text=A%20%22smart%20contract%22%20is%20simply,address%20on%20the%20Ethereum%20blockchain.&text=Smart%20contracts%20can%20define%20rules,enforce%20them%20via%20the%20code.) which is code that runs on the Ethereum blockchain.

To demonstrate the ISP, let's implement Ethereum Smart Contracts in our service.

#### Instructions 🎒
- Create a new class called `SmartContract`:
	- Create a non-static attribute called `contract` (This will represent a stringified program that will be run on the Ethereum blockchain)
	- Create a non-default constructor that takes in a string parameter called `contract` and set the class attribute `contract` equal to the parameter.
	- Create a "getter" for the `contract` attribute.

- On the `ICoin` interface add a new method called `addContract( String contract )`

- In the `Ethereum` class:
	- Create a new attribute that is a list of `SmartContract`s called `smartContracts`
	- Implement the new `addContract( String contract )` method, creating a `SmartContract` object, then adding this object to the `smartContracts` list.
	- Create a getter for the `smartContracts` attribute:
		- `public List<SmartContract> getSmartContracts()`

- In the `DigitalWallet` class:
	- Create a new method `addContract( ICoin coin, String contract )` that calls the `coin` `addContract` method.

- In the `Bitcoin` class you will need to also implement the `addContract(..)` method now that it's specified on the `ICoin` interface.. even though Bitcoin does not offer support for smart contracts. For this method do not add any implementation, just return `null`.

- In the `DigitalWalletController` class, add the endpoint below 👇

```java
	@GetMapping("/eth/add_contract")
	public ICoin eth_add_contract(
			@RequestParam(value = "code", defaultValue = "0" )
			String code )
	{
			try 
			{				
				return DigitalWallet
						.getInstance()
						.addContract( eth, code );
			} 
			catch( Exception e )
			{
				throw new ResponseStatusException(
						HttpStatus.BAD_REQUEST, e.toString() );
			}
	}
```

This endpoint will map the `/eth/add_contract/` endpoint to the `addContract` method via an HTTP - GET request that has a parameter "code".

To test this new endpoint and to verify that this new functionality is working as intended type: `http://localhost:8080/eth/add_contract?code=%22some%20code%20in%20here%22`

This simulates adding a smart contract as a string "some code in here" that will be run as a smart contract on the Ethereum blockchain. If everything was setup correctly, you should see the following response:

```
{"smartContracts":[{"contract":"\"some code in here\""}],"name":"Ethereum","eth":0.0,"transactionFeeUSD":11.66,"whitePaper":"https://blockchainlab.com/pdf/Ethereum_white_paper-a_next_generation_smart_contract_and_decentralized_application_platform-vitalik-buterin.pdf"}
```

**Note: The order of the fields in the JSON response does not matter.**

Circling back to the Interface Segregation Principle, we just ran into one of the primary issues this principle is designed to solve.

Bitcoin doesn't support smart contracts. 

But since we added the `addContract` method onto the `ICoin` interface, we had to implement the `addContract` method on the `Bitcoin` class.. even though this doesn't make sense since Bitcoin doesn't support smart contracts.

To resolve this, let's create a new interface for handling smart contracts since smart contracts are a hot attribute of other cryptocurrencies outside of Ethereum.

#### Instructions 🎒
- Create a new interface called `ISmartContract`
	- Specify a `addContract( String contract )` method on the interface

- Remove the `addContract(..)` method from the `ICoin` interface

- Implement the interface on the `Ethereum` class

- Remove the `addContract(..)` method from the `Bitcoin` class since `addContract(...)` is no longer on `ICoin`

- Modify the return type of `addContract` in the `DigitalWallet` class to be of type `ISmartContract`

- Modify the return type of the `/eth/add_contract` endpoint in `DigitalWalletController` to be of type `ISmartContract`

After you refactor this, ensure that the endpoint still behaves correctly and responds with the correct information.

Congrats, you've now applied the ISP in practice.

## Submission
Submit your assignment on Canvas with your whole directory as a zip file `<lastName-section>-spring-pt1.zip` e.g `Smith-SectionC-spring-pt1.zip`

## Rubric
