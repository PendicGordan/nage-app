pragma solidity 0.5.0;

contract NageContract {
    struct Person {
        string name;
        uint256 age;
    }

    mapping(address => Person) private people;
    address[] private peopleAddress;

    function setData(string memory _name, uint256 _age) public {
        Person memory p = Person({name: _name, age: _age});
        people[msg.sender] = p;
        peopleAddress.push(msg.sender);
    }

    function getPersonData(address _address) public view returns(string memory, uint) {
        return(
            people[_address].name,
            people[_address].age
        );
    }

    function getPeopleAddresses() public view returns(address[] memory) {
        return peopleAddress;
    }
}
