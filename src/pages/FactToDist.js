
import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import supplyChainABI from "../abi/supplyChain.json";
import {Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import NotConnected from "./NotConnected";

const supplyChainContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const FactToDist = ({ account,app, setApp }) => {
  const isConnected = Boolean(account[0]);
  const [sending, setSending] = useState(false)

  const [itemId, setItemId] = useState("");
  const [factoryId, setFactoryId] = useState("");
  const [distributorId,setDistributorId] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    supplyChainContract,
    supplyChainABI.abi,
    signer
  );
  
  async function transferToDistributor() {
    setSending(true);

    const factIdBig = BigNumber.from(factoryId);
    const itemIdBig = BigNumber.from(itemId);
    const distributorIdBig = BigNumber.from(distributorId);

    try {
      await contract
        .itemToDistributor(itemIdBig, factIdBig, distributorIdBig)
        .then((response) => {
          toast
            .promise(provider.waitForTransaction(response.hash), {
              pending: "🗳️Transfering " + itemId + "...",
              success:
                "Transfer Item " +
                itemId +
                " to Distributor " +
                distributorId +
                " success",
              error: "Transaction Failed",
            })
            .then(setSending(false));
        });
    } catch (error) {
      console.log(error);
      setSending(false);
      toast.error("Item has been Transfered !", {
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
                <h2>Transfer Item To Distributor</h2>
              </div>
              <div className="col-sm-12 form-column">
                <form action="success" method="post">
                  <div className="form-group">
                    <label>Item Id</label>
                    <input
                      className="form-control"
                      onChange={(e) => setItemId(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>From Factory</label>
                    <input
                      className="form-control"
                      placeholder="Insert Factory Id"
                      onChange={(e) => setFactoryId(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>To Distributor</label>
                    <input
                      className="form-control"
                      placeholder="Insert Distributor Id"
                      onChange={(e) => setDistributorId(e.target.value)}
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
                        <h6 id="form-text">🗳️Transfering Item..</h6>
                      </div>
                    ) : (
                      <Button className="text-white" onClick={transferToDistributor}>
                        Transfer
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

export default FactToDist;