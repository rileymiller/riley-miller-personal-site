# C++ STL Sets

## Still Under Construction 🚧
The Set data structure in C++ is a collection used to hold unique values following a specific order. Contrary to **index-based** data structures
like **arrays** and **vectors**, sets are **key-based** data structures.

> **Key-based** collections like Sets and Maps use the data in the collection itself to access the collection, whereas,
> **index-based** collections like Arrays and Vectors are enumerated and allow for random access.

In a general sense, the Set is an opinionated collection that is used to test for uniqueness and existence. Sets are
intentionally less flexible than index-based data structures which can perform many of same operations (find, contains). However,
since Sets are key-based, these operations are typically more readable.

One of the other nuances about Sets in C++ is that the data inside the collection is **immutable**, data can be added and removed from the set but cannot be directly modified (mutated) like with arrays and vectors.

### Common Methods
Some of the common methods that the STL Set exposes for common set operations are:
* [begin()](http://www.cplusplus.com/reference/set/set/begin/)
* [end()](http://www.cplusplus.com/reference/set/set/end/)
