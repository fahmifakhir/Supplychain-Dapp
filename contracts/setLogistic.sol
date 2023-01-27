//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract setLogistic is Ownable{

    struct Factory {
        address addr;
        uint256 id; 
        string name; 
        string place;
        
    }

    struct Distribution {
        address addr;
        uint256 id; 
        string name; 
        string place;
        
    }

    struct Retail {
        address addr;
        uint256 id; 
        string name;
        string place;
       
    }
    uint factCounter = 1;
    uint dstCounter = 1;
    uint rtlCounter = 1;

    mapping (uint => Factory) public factories;
    mapping (uint => Distribution) public distributors;
    mapping (uint => Retail) public retails;

    
    function addFactory(address _address, string memory _name, string memory _place) public onlyOwner {
        Factory memory factory = Factory(_address,factCounter, _name, _place);
        factories[factCounter] = factory;

        factCounter ++;
    }

    function addDistribution(address _address, string memory _name, string memory _place) public onlyOwner {
        Distribution memory distributor = Distribution(_address,dstCounter, _name, _place);
        distributors[dstCounter] = distributor;

        dstCounter++;
    }
    
    function addRetail(address _address, string memory _name, string memory _place) public onlyOwner {
        Retail memory retail = Retail(_address,rtlCounter, _name, _place);
        retails[rtlCounter] = retail;
        rtlCounter++;
    }

    function getFactory(uint _factoryId) external view returns(Factory memory factoryDetail) {
        factoryDetail = factories[_factoryId];
    }
    
    function getDistributor(uint _distributorId) external view returns(Distribution memory distributorDetail) {
        distributorDetail = distributors[_distributorId];
    }
    
    function getRetail(uint _retailId) external view returns(Retail memory retailDetail) {
        retailDetail = retails[_retailId];
    }

}
