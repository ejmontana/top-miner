"use client";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import {
  Button,
  DarkThemeToggle,
  Navbar,
  Modal,
  Card,
  Label,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import PhaserGame from "./component/PhaserGame";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export default function Home() {
  const { activate, deactivate } = useWeb3React();

  const [openModalConnect, setOpenModalConnect] = useState(false);
  const [openModalBuy, setOpenModalBuy] = useState(false);

  const [DollarCoin, setDollarCoin] = useState(0.0);

  const CalculateCoin = (e) => {
  
    setDollarCoin(e.target.value / 0.01);
  };

  return (
    <main className="space-y-12">
      <Navbar fluid>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Top Miner
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 space-x-4">
          <Button color="success" onClick={() => setOpenModalBuy(true)}>
            Buy
          </Button>
          <Button onClick={() => setOpenModalConnect(true)}>Connect</Button>
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
      </Navbar>

      <Modal
        show={openModalConnect}
        size="xl"
        popup
        onClose={() => setOpenModalConnect(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Select Wallet
            </h3>

            <div className="flex items-stretch space-x-4">
              <Button onClick={(e) => activate(CoinbaseWallet)}>
                <img src="img/coinbase.jpg" width={25} height={25} alt="a" />
                &nbsp;Coinbase Wallet
              </Button>
              <Button onClick={(e) => activate(WalletConnect)}>
                <img
                  src="img/walletConnect.png"
                  width={25}
                  height={25}
                  alt="a"
                />
                &nbsp;Wallet Connect
              </Button>
              <Button onClick={(e) => activate(Injected)}>
                <img src="img/metamassk.png" width={25} height={25} alt="a" />
                &nbsp;Metamask
              </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="https://coinmarketcap.com/academy/article/connect-metamask-to-binance-smart-chain-bsc"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                target="_blank"
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openModalBuy}
        size="md"
        onClose={(e) => setOpenModalBuy(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Purchase of dollar
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="usdt" value="USDT" />
              </div>
              <TextInput
                type="number"
                placeholder="0.0"
                required
                onChange={(e) => CalculateCoin(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dollar" value="Dollar" />
              </div>
              <TextInput
                type="number"
                placeholder="0.0"
                value={DollarCoin}
                disabled
              />
            </div>
            <div className="w-full">
              <Button color="success">Buy</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <button onClick={deactivate}>Disconnect</button> */}
      <section className="h-full text-center space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Miner
        </h1>
        <div class="grid grid-cols-4 gap-4 px-12">
          <div>
            <Card className="max-w-sm" imgSrc="/img/MineriaOro1.jpg">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Piedra común
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>

          <div>
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/img/MineriaOro1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Hierro básico
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>

          <div>
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/img/MineriaOro1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Carbón estándar
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>

          <div>
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/img/MineriaOro1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Cobre ordinario
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>

          <div>
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/img/MineriaOro1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Plata de calidad
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>

          <div>
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/img/MineriaOro1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Oro valioso
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>

          <div>
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/img/MineriaOro1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Diamantes raros
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>

          <div>
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/img/MineriaOro1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Gemas preciosas
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
