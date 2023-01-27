import {useState, useEffect} from 'react'
import {ethers} from 'ethers';

function ItemHistory({item, itemHistory, contract,togglePop}) {
  return (
    <div className="product">
        <div className='product__details'>
            <div className='product__image'>
                <img src={item.image} alt='Product'></img>
            </div>
            <div className='product__overview'>
                <h1><strong>{item.itemName}</strong></h1>
                <hr/>
                <h2><strong>{item.price.toString()} ETH</strong></h2>
                <hr/>
                <h2><strong>Overview</strong></h2>
                <p>
                Quisque ullamcorper libero et diam efficitur, egestas fringilla sem placerat.Morbi dictum ut sapien ac aliquam. 
                Donec sit amet nisi ante. Mauris vitae pharetra felis, sit amet ultricies ante. Nulla at augue vel felis placerat condimentum. 
                </p>
            </div>
            <div className='product__order'>
                <h1>{item.price.toString()} ETH</h1>
                {item.quantity>0 ? (
                    <p><b>In Stock</b></p>
                ):(
                    <p>Out of Stock</p>
                )}
                <p>Available on <br/> <strong>{itemHistory.retailName}</strong><br/>
                at {itemHistory.retailPlace}
                </p>

                <p>Manufactured by <br/>
                <strong>{itemHistory.factoryName}</strong>   <br/>
                in <strong>{itemHistory.factoryPlace}</strong> <br/>
                at {new Date(itemHistory.timeMade * 1000).toLocaleDateString(undefined,{year:'numeric',weekday:'long',month:'long',day:'numeric'})}
                </p>

                <p>To distributor <br/>
                <strong>{itemHistory.distributorName}</strong><br/>
                in <strong>{itemHistory.distributorPlace}</strong> <br/>
                at {new Date((itemHistory.distReceived)* 1000).toLocaleDateString(undefined,{year:'numeric',weekday:'long',month:'long',day:'numeric'})}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ItemHistory