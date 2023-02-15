//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract setLogistic is Ownable{

    struct Factory {
        uint256 id; 
        string name; 
        string place;
        
    }

    struct Distribution {
        uint256 id; 
        string name; 
        string place;
        
    }

    struct Retail {
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

    
    function addFactory( string memory _name, string memory _place) public onlyOwner {
        Factory memory factory = Factory(factCounter, _name, _place);
        factories[factCounter] = factory;

        factCounter ++;
    }

    function addDistribution( string memory _name, string memory _place) public onlyOwner {
        Distribution memory distributor = Distribution(dstCounter, _name, _place);
        distributors[dstCounter] = distributor;

        dstCounter++;
    }
    
    function addRetail(string memory _name, string memory _place) public onlyOwner {
        Retail memory retail = Retail(rtlCounter, _name, _place);
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

