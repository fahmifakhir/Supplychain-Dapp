
import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import supplyChainABI from "../abi/supplyChain.json";
import {Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import NotConnected from "./NotConnected";

const supplyChainContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Distributor = ({ account,app, setApp }) => {
  const isConnected = Boolean(account[0]);
  const [sending, setSending] = useState(false);

  const [itemId, setItemId] = useState("");
  const [retailId, setRetailId] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    supplyChainContract,
    supplyChainABI.abi,
    signer
  );
  
  async function transferToDistributor() {
    setSending(true);

    const retIdBig = BigNumber.from(retailId);
    const itemIdBig = BigNumber.from(itemId);
    console.log(await contract.itemsHistory(0));
    try {
      await contract
        .retailToCustomer(itemIdBig, retIdBig)
        .then((response) => {
          toast
            .promise(provider.waitForTransaction(response.hash), {
              pending: "🗳️Updating item " + itemId + "...",
              success:
                "Item" +
                itemId +
                " successfully updated ",
              error: "Transaction Failed",
            })
            .then(setSending(false));
        });
    } catch (error) {
      console.log(error);
      setSending(false);
      toast.error("Item Out of Stock!", {
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
            <div className="col-sm-offset-2 well">
              <div className="col-sm-12 form-legend">
                <h2>Update Stock Item</h2>
              </div>
              <div className="col-sm-12 form-column">
                <form action="success" method="post">
                  <div className="form-group">
                    <label>Item to be updated</label>
                    <input
                      className="form-control"
                      placeholder="Insert Item Id"
                      onChange={(e) => setItemId(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>From retail</label>
                    <input
                      className="form-control"
                      placeholder="Insert Retail Id"
                      onChange={(e) => setRetailId(e.target.value)}
                    />
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
                        <h6 id="form-text">🗳️Updating Item..</h6>
                      </div>
                    ) : (
                      <Button className="text-white" onClick={transferToDistributor}>
                        Update 
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

export default Distributor;