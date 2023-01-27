import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import supplyChainABI from "../abi/supplyChain.json";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import NotConnected from "./NotConnected";

const supplyChainContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Factory = ({ account, seAccount, setApp }) => {
  const isConnected = Boolean(account[0]);

  const [factoryId, setFactoryId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState("");
  const [sending, setSending] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    supplyChainContract,
    supplyChainABI.abi,
    signer
  );

  async function addItem() {
    setSending(true);

    const factIdBig = BigNumber.from(factoryId);
    const priceBig = BigNumber.from(price);
    const quantityBig = BigNumber.from(quantity);

    try {
      await contract
        .addItem(itemName, factoryId, quantity, price, image)
        .then((response) => {
          toast
            .promise(provider.waitForTransaction(response.hash), {
              pending: "🗳️Adding Item :  " + itemName + "...",
              success:
                "Adding " +
                itemName +
                " to from factory " +
                factoryId +
                " success",
              error: "Transaction Failed",
            })
            .then(setSending(false));
        });
    } catch (error) {
      console.log(error);
      setSending(false);
      toast.error("Only listed factory can add item !", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  }
  useEffect(() => {
    setApp(true);
  });

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center h-100">
      {isConnected ? (
        <>
          <div>
            <div className="row">
              <div className="col-sm-offset-2">
                <div className="col-sm-12 form-legend">
                  <h2>Add Item</h2>
                </div>
                <div className="col-sm-12 form-column">
                  <form action="success" method="post">
                    <div className="form-group">
                      <label>Item Image</label>
                      <input
                        className="form-control"
                        placeholder="( IPFS file format )"
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Item Name</label>
                      <input
                        className="form-control"
                        onChange={(e) => setItemName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="( In ETH )"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="( In Pieces )"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Factory Id</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setFactoryId(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            id="termsOfUse"
                            type="checkbox"
                            name="termsOfUse"
                          />{" "}
                          Yes, Im aware with the information inputted above
                        </label>
                      </div>
                    </div>
                    {sending ? (
                      <div className="w-20 m-2 d-flex flex-column justify-content-center align-items-center">
                        <PuffLoader
                          id="loader"
                          color="black"
                          loading={sending}
                          speedMultiplier="1"
                          size={60}
                          className="m-3"
                        />
                        <h6 id="form-text">🗳️Adding Item..</h6>
                      </div>
                    ) : (
                      <Button className="text-white" onClick={addItem}>
                        Create
                      </Button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
};

export default Factory;
