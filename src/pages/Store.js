import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import supplyChainABI from "../abi/supplyChain.json";
import ItemHistory from "./ItemHistory.js";
import { Row, Col, Card, Button } from "react-bootstrap";

const supplyChainContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Store = ({ app, setApp }) => {
  const [items, setItems] = useState([]);
  const [history, setItemHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    supplyChainContract,
    supplyChainABI.abi,
    signer
  );

  const togglePop = (items, history) => {
    setItems(items);
    setItemHistory(history);
    toggle ? setToggle(false) : setToggle(true);
  };

  async function loadItem() {
    const itemCount = await contract.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await contract.itemCreated(i);
      if (item.stage === 3) {
        items.push({
          itemId: item.itemId,
          price: item.price,
          quantity: item.quantity,
          itemName: item.itemName,
          image: item.image,
        });
      }
    }
    setItems(items);
    setLoading(false);
  }

  async function loadItemHistory() {
    const itemCount = await contract.itemCount();
    const history = await contract.getItemHistory(itemCount);
    
    console.log(history);
    setItemHistory(history);
    setLoading(false);
  }

  useEffect(() => {
    loadItem();
    loadItemHistory();
    setApp(false);
  }, []);

  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading..</h2>
      </main>
    );

  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text>{item.price.toString()} ETH</Card.Text>

                    <Button
                      variant="primary"
                      onClick={() => togglePop(item, history)}
                    >
                      view
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: "200px" }}>
          <h3>No listed item</h3>
        </main>
      )}

      {toggle && (
        <ItemHistory
          item={items}
          itemHistory={history}
          togglePop={togglePop}
          contract={contract}
        />
      )}
    </div>
  );
};

export default Store;
