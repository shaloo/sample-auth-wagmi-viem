import logo from './logo.svg';
import './App.css';

import { ArcanaConnector } from "@arcana/auth-wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { WagmiConfig, configureChains, createConfig, Chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getAuthProvider } from "./getArcanaAuth";
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS

export const connector = (chains: Chain[]) => {
  return new ArcanaConnector({
    chains,
    options: {
      auth: getAuthProvider(),
    },
  });
};

const { chains, publicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [connector(chains)],
  publicClient,
});

function Profile() {
  const { address } = useAccount()
  const { connect, isConnecting } = useConnect({
    connector: connector(chains),
  })
  const { disconnect } = useDisconnect()
  const { data, isError, isLoading } = useBalance({
    address: address,
  })

  if (address) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <p>Connected to {address}</p>
          <p>Balance: {data ? data.formatted : "Loading..."} ETH</p>
          <p>Chain ID: {wagmiConfig ? wagmiConfig.lastUsedChainId : ""}</p>
          <button className="btn btn-primary mt-3" onClick={disconnect}>Disconnect</button>
        </div>
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Connecting...</p>
      </div>
    )
  }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <button className="btn btn-primary" onClick={() => connect()}>Arcana Auth: Login with Email/Social</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <WagmiConfig config={wagmiConfig}>
          <Profile/>
        </WagmiConfig>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
