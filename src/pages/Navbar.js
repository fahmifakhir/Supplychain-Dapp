import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = ({ app, setApp, account, setAccount }) => {
  const isConnected = Boolean(account[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
    }
  }
  return (
    <>
      {app ? (
        <div>
          <Navbar bg="" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/" onClick={() => setApp(false)}>
                <h3>Chain Store</h3>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/Logistic/">
                    Add Item
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Logistic/Factory">
                    Factory
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Logistic/Distributor">
                    Distributor
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Logistic/Retail">
                    Retail
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Nav>
                {isConnected ? (
                  <h5
                    className="btn col-2 m-0 d-flex align-items-center "
                    id="navbar-button"
                  >
                    <img
                      src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                      alt="test"
                      width="24px"
                      className="mx-2"
                    />
                    {account[0].slice(0, 6) + "..." + account[0].slice(36, 42)}
                  </h5>
                ) : (
                  <button
                    id="navbar-button"
                    href="about"
                    onClick={connectAccount}
                    className="col-2 btn m-0 p-0 d-flex align-items-center"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/metamask-logo.png"
                      alt="test"
                      width="24px"
                      className="mx-2"
                    />
                    Connect
                  </button>
                )}
              </Nav>
            </Container>
          </Navbar>
          <Outlet />
        </div>
      ) : (
        <div>
          <Navbar bg="" variant="dark">
            <Container>
              <Navbar.Brand>
                <h3>Chain Store</h3>
              </Navbar.Brand>
              <Nav className="me-auto">
                <Button as={Link} to="/Logistic/" onClick={() => setApp(true)}>
                  Logistic
                </Button>
              </Nav>
            </Container>
          </Navbar>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default NavBar;
