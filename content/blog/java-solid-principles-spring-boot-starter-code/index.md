---
title: "SOLID Principles in Spring Boot Starter Code"
date: "2020-11-28"
description: Walkthrough of the starter code for the Spring Boot assignments
featuredImage: "../../assets/spring-boot/spring-boot-startup.jpg"
featuredImageDescription: "Photo from Unsplash by"
photographerLink: "https://unsplash.com/@tateisimikito"
photographerName: "Jukan Tateisi"
---

This article will take you through the starter code if you've never worked with Spring before. By the end of this article you will have an understanding of what's going on in the starter code and will be prepared to work through the two assignments as we build out our API for our personal digital wallet.

## Cryptocurrency
If you're unfamiliar with [cryptocurrency](https://cointelegraph.com/bitcoin-for-beginners/what-are-cryptocurrencies), cryptocurrency pledges to be the future of finance relying on the underlying technology called a [blockchain](https://www.euromoney.com/learning/blockchain-explained/what-is-blockchain#:~:text=Blockchain%20is%20a%20system%20of,computer%20systems%20on%20the%20blockchain.). Some of the design goals of cryptocurrency include: security, anonymity, immutability, ease of transaction, and peer-to-peer transactions that don't need a third-party like a bank or a credit card to facilitate.

Some of the popular names you may have heard include [Bitcoin](https://www.investopedia.com/terms/b/bitcoin.asp) and [Ethereum](https://ethereum.org/en/). These are two of the most popular cryptocurrencies with Bitcoin being the original and most popular cryptocurrency and Ethereum building an open-source platform that allows for the development of [Distributed Applications (Dapps)](https://ethereum.org/en/dapps/).

To use blockchain technologies usually all you need is a [digital wallet](https://www.investopedia.com/terms/d/digital-wallet.asp) which holds all of your crytography keys and allows you to purchase, sell, and send cryptocurrency.

In this assignment, we will be working on creating a personal API for our own digital wallet that holds imaginary Bitcoin and Ethereumn information.

## Starter Code

If you haven't already please make sure you've worked through the [Setup guide](../java-solid-principles-spring-boot-pt1) and were able to get the Spring application running in your local environment.

The basic functionality that we are implementing in our digital wallet API is the ability to:
- View the balance of our digital wallet
- Make transactions with our digital wallet
- Reset the balance of our digital wallet

In the starter code, there are two classes that are implemented which handle all of this functionality:

```
.../java/solidSpring/
					DigitalWalletController.java
					DigitalWallet.java
					HelloController.java
					SolidSpringApplication.java
```

The `DigitalWalletController` class is a controller that handles the receiving and responding of web requests that reach any of the endpoints defined in the class.

```java
package solidSpring;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import solidSpring.DigitalWallet;

@RestController
public class DigitalWalletController {

	@GetMapping("/balance")
	public DigitalWallet wallet() {
		return DigitalWallet
				.getInstance()
				.accountBalance();
	}
	
	@GetMapping("/transaction")
	public DigitalWallet transaction(
			@RequestParam(value = "value", defaultValue = "0" )
			String value ) 
	{
		try
		{
			double parsedValue = Double.parseDouble( value );
			
			try 
			{
				return DigitalWallet
						.getInstance()
						.processTransaction( parsedValue );
			}
			catch ( Exception e )
			{
				throw new ResponseStatusException(
						HttpStatus.BAD_REQUEST, e.toString() );
			}
			
		} 
		catch ( NumberFormatException e )
		{
			throw new ResponseStatusException(
					HttpStatus.BAD_REQUEST, e.toString() );
		}
	}
	
	@GetMapping("/zero")
	public DigitalWallet zero()
	{
		return DigitalWallet
				.getInstance()
				.zero();
	}
}
```

In this `DigitalWalletController` class, Spring uses the `@RestController` annotation above the class definition to signifiy that the class
describes an endpoint that should be made available over the web.

Inside the class there are three methods defined with a `@GetMapping(...)` annotation. This `@GetMapping(...)` annotation let's Spring know that whenever the [route](https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/) defined inside of the `@GetMapping(...)` is reached via HTTP - GET, the method defined for the route will be invoked to process the HTTP request.

If you take a look at the `transaction/` endpoint, you will notice it's a little different than the other two. Inside the method signature you will see `@RequestParam(value = "value", defaultValue = "0" ) String value` defined. `@RequestParam` is another special annotation that is used to tell Spring that there is a [HTTP parameter](https://www.tutorialspoint.com/http/http_parameters.htm) that is expected to be passed to the endpoint. Inside the annotation there are two paremeters, the first is the key of the parameter that is being passed as part of the HTTP - GET request (called "value" in this endpoint), and the second parameter is the default value in case an explicit parameter is not set as part of the request. Then outside of the annotation you can see `String value` also defined as part of the method signature. Essentially what is happening here, Spring is parsing the HTTP - GET request and if a parameter specified as `value` is passed in, it will serialize the request and store the value in the locally scoped parameter `String value` which can be used inside the scope of the method. 

For each of the endpoints defined inside of the `DigitalWalletController`, you can see that they all have a return type of a class named `DigitalWallet`. This return type is used to serialize a Java object into an HTTP response using a Java library called [Jackson2](https://github.com/FasterXML/jackson) that is configured automatically in Spring Boot. This process of serialization is essentially the conversion of a Java object to [JSON](https://www.w3schools.com/whatis/whatis_json.asp), or a format that clients (mobile/web) can recieve and process from our server.

#### Serialization <a name="serialization"></a>
If you aren't familiar with the process of [serialization](https://www.tutorialspoint.com/java/java_serialization.htm), it's basically an awesome way to convert an object in Java to a stream of bytes that you can write to a file. This process is typically used in API development to read requests from a client and convert them into Java objects that we can run on the JVM. Another common use case is if we need to persist some data during some type of execution flow in the service, you can serialize a Java object and write the stream to a database that you can index and recall and convert back into a Java object using serialization. (This is super cool btw 🤑) 

Digging into this `DigitalWallet.java` class:
```java
package solidSpring;

public class DigitalWallet {
	
	private static DigitalWallet wallet = new DigitalWallet();
	
	private static final String NAME = "Bitcoin";
	private static final String WHITE_PAPER = "https://bitcoin.org/bitcoin.pdf";
	private double BTC = 0;
	
	private DigitalWallet() { };
	
	public static DigitalWallet getInstance()
	{
		return wallet;
	}
	
	
	public DigitalWallet processTransaction( double amount ) throws Exception
	{
		if( BTC + amount < 0 )
		{
			throw new Exception(
				String.format("\nInsufficient funds:\n\t BTC" +
				" Available: %1$s\n\t BTC Requested: %2$s",
				 BTC, amount));
		} else {
			BTC = BTC + amount;
		}
		
		return this;
	}
	
	public DigitalWallet zero()
	{
		BTC = 0;
		
		return this;
	}
	
	public DigitalWallet accountBalance()
	{
		return this;
	}
	
	/////////////////////////////////////////
	//	For Serialization
	////////////////////////////////////////
	public String getName()
	{
		return NAME;
	}

	public double getBTC() 
	{
		return BTC;
	}
	
	public String getWhitePaper()
	{
		return WHITE_PAPER;
	}
	
	public double getSatoshis()
	{
		return BTC * 100000000;
	}

}
```

You can see that the class is making use of the [Singleton pattern](https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm). `DigitalWallet` also has three instance attributes outside of the Singleton instance: `NAME`, `WHITE_PAPER`, and `BTC`. These attributes hold the name of Bitcoin, the link to the Bitcoin whitepaper, and the amount of Bitcoin in our digital wallet.

Inspecting the rest of the class, we can see the three methods that are invoked in `DigitalWalletController`: `processTransaction`, `zero`, and `accountBalance`. These classes handle transactions of Bitcoin in the digital wallet, set the amount of Bitcoin in our digital wallet to zero, and retrieve the balance of Bitcoin in the digital wallet respectively.

At the bottom of the class, you will see four methods that Spring uses to serialize the `DigitalWallet` instance to JSON: `getBTC`, `getName`, `getWhitePaper`, and `getSatoshis` (satoshis are the small atomic units that make up a Bitcoin). **Important: for a class that is serialized in Spring, any attribute "getter" (get\*) is automatically used for serialization.**

Now that we've run through all of the starter code, let start our server and play around with the API.

## API Walkthrough
To test the API, start your server in Eclipse and navigate to `http://localhost:8080` in the browser. You should see

```
Greetings from Spring Boot!
```

displayed in your browser.

Now let's test the three endpoints defined in the API so far.

### `balance/`
If you navigate to `http://localhost:8080/balance` in the browser, it will fetch the starting balance of the digital wallet and you should see:
```
{"name":"Bitcoin","btc":0.0,"whitePaper":"https://bitcoin.org/bitcoin.pdf","satoshis":0.0}
```
in your browser. This is the serialized response of the `balance/` endpoint defined in `DigitalWalletController.java`. You can see that all of the "getter" methods specified in the `DigitalWallet` class are serialized and returned as part of the endpoint's response.

### `transaction/`
Now, say we want to make a transaction and add some Bitcoin to our digital wallet. To do this, enter `http://localhost:8080/transaction?value=1.22` into the browser. You will now see in the response that we added 1.22 Bitcoin to our digital wallet:
```
{"name":"Bitcoin","btc":1.22,"whitePaper":"https://bitcoin.org/bitcoin.pdf","satoshis":1.22E8}
```

The `btc` field in the response now has a value of 1.22 instead of 0.0.

### `zero/`
A quick helper endpoint was also added so you can easily reset your digital wallet while testing. If you enter `http://localhost:8080/zero` into the browser, you will see in the response that the amount of Bitcoin in the digital wallet was set to 0.0:

```
{"name":"Bitcoin","btc":0.0,"whitePaper":"https://bitcoin.org/bitcoin.pdf","satoshis":0.0}
```

### Error Handling
Some light-weight error handling was also built in to the starter code if you look in the `processTransaction` method in `DigitalWallet` if you 
try to exchange more Bitcoin than what you have in your digital wallet, it will throw a 400 error (Bad Request) describing that you have insufficient funds to complete the transaction. To test this, you should now have zero BTC in your digital wallet (if not call `http://localhost:8080/zero` to set the balance to zero), pass in a _negative_ amount as the value to the `transaction/` endpoint e.g `http://localhost:8080/transaction?value=-1.22`. You should see an error page display with a stack trace as well a specific error message describing that there were insufficient funds to complete the transaction.

![Insufficient Funds Response](error-response.png)

This wraps up the extent of the API implemented in the starter code, now you're ready for the assignments 🚀
