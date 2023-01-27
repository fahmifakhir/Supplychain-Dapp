//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./setLogistic.sol";
contract supplyChain is setLogistic {
    
    enum Stage{
        init, Factory, Distribution, Retail, Sold
    }

    struct Item {
        uint itemId;
        uint price;
        uint quantity;
        string itemName;
        string image;

        Stage stage;
    }

    struct itemHistory{
        uint itemId;
        
        string factoryName;
        string factoryPlace;
        uint timeMade;
        
        string distributorName;
        string distributorPlace;
        uint distReceived;

        string retailName;
        string retailPlace;
        uint retReceived;

        uint lastOrder;
    }

    uint public itemCount;
    mapping(uint => Item) public itemCreated;
    mapping(uint => itemHistory) public itemsHistory;
    
    
    function addItem (string memory _itemName, uint _factoryId, uint _quantity, uint _price, string memory _image) public {
        require( _factoryId == factories[_factoryId].id && msg.sender == factories[_factoryId].addr , "Wrong Factory Id or address");
        itemCount++;

        itemCreated[itemCount] = Item(itemCount, _price, _quantity, _itemName, _image, Stage.Factory);
        

        itemsHistory[itemCount].itemId = itemCreated[itemCount].itemId;

        itemsHistory[itemCount].factoryName = factories[_factoryId].name;
        itemsHistory[itemCount].factoryPlace = factories[_factoryId].place;

        itemsHistory[itemCount].timeMade = block.timestamp;
        
       
    }

    function itemToDistributor(uint _itemId, uint _distributorId, uint _factoryId) public {
        require( _factoryId == factories[_factoryId].id && msg.sender == factories[_factoryId].addr , "Wrong Factory Id or address");
        require(itemCreated[_itemId].stage == Stage.Factory, "wrong stage");
        
        itemCreated[_itemId].stage = Stage.Distribution;
        itemsHistory[_itemId].distributorName = distributors[_distributorId].name;
        itemsHistory[_itemId].distributorPlace = distributors[_distributorId].place;
        itemsHistory[_itemId].distReceived = block.timestamp;
    }  


    function itemToRetail(uint _itemId, uint _retailId, uint _distributorId) public {
        require( _distributorId == distributors[_distributorId].id && msg.sender == distributors[_distributorId].addr , "Wrong Distributor Id or address");
        require(itemCreated[_itemId].stage == Stage.Distribution, "wrong stage");
        
        itemCreated[_itemId].stage = Stage.Retail;
        itemsHistory[_itemId].retailName = retails[_retailId].name;
        itemsHistory[_itemId].retailPlace = retails[_retailId].place;

        itemsHistory[_itemId].retReceived = block.timestamp;
    }

    function retailToCustomer(uint _itemId, uint _retailId) public {
        require( _retailId == retails[_retailId].id && msg.sender == retails[_retailId].addr , "Wrong Retail Id or address");
        Item memory item = itemCreated[_itemId];
        require(item.quantity > 0);
        itemCreated[_itemId].quantity = item.quantity-1;
        itemsHistory[_itemId].lastOrder = block.timestamp;        
    }


    function getItemHistory(uint _itemId) external view returns(itemHistory memory) {
        itemHistory memory history = itemsHistory[_itemId];
        return history;
    }      
}   