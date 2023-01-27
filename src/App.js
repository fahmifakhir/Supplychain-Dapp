import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import Navbar from "./pages/Navbar";
import Store from "./pages/Store";
import Factory from "./pages/Factory";
import Distributor from "./pages/Distributor";
import Retail from "./pages/Retail";
import FactToDist from "./pages/FactToDist";

function App() {
  const [account, setAccount] = useState([]);
  const [app, setApp] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
                app={app}
                setApp={setApp}
                account={account}
                setAccount={setAccount}
              />
            }
          >
            <Route index element={<Store app={app} setApp={setApp} />} />
            <Route path="/Logistic/">
              <Route
                index
                element={
                  <Factory
                    account={account}
                    setAccount={setAccount}
                    app={app}
                    setApp={setApp}
                  />
                }
              />
              <Route
                path="/Logistic/Factory"
                element={
                  <FactToDist
                    account={account}
                    setAccount={setAccount}
                    app={app}
                    setApp={setApp}
                  />
                }
              />
              <Route
                path="/Logistic/Distributor"
                element={
                  <Distributor
                    account={account}
                    setAccount={setAccount}
                    app={app}
                    setApp={setApp}
                  />
                }
              />
              <Route
                path="/Logistic/Retail"
                element={
                  <Retail
                    account={account}
                    setAccount={setAccount}
                    app={app}
                    setApp={setApp}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" closeOnClick={false} />
    </div>
    <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2023 All Rights Reserved
                <a href="#"></a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
