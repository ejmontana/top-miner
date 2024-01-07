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
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import TopMinerABi from "./TopMiner.json";
import UdtTokenABi from "./usdtAbi.json";

import Swal from "sweetalert2";
import Loader from "./Loader";

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
  supportedChainIds: [1, 3, 4, 5, 42, 97],
});

export default function Home() {
  const { activate, active, library, account } = useWeb3React();
  const TopMinerAddress = "0x5753d9019B8a13C9E19512B396b6c23b7F6fEf6b";
  const TokenUsdtAddress = "0x3b550522d662ae42FD6D57D4ceD92AF701e2fD20";
  const [openModalConnect, setOpenModalConnect] = useState(false);
  const [openModalBuy, setOpenModalBuy] = useState(false);

  const [DollarCoin, setDollarCoin] = useState(0);
  const [UsdtCoin, setUsdtCoin] = useState(0);

  const [ContractTopMiner, setContractTopMiner] = useState("");
  const [ContractTokenUsdt, setContractTokenUsdt] = useState("");
  const gasLimit = 300000; //100000
  const [TokenApproved, setTokenApproved] = useState(0);
  const [loading, setLoading] = useState(false);

  const CalculateCoin = (e) => {
    const dolarCoind = e.target.value / 0.01;
    setDollarCoin(dolarCoind);
    console.log("CalculateCoin", e.target.value);
    setUsdtCoin(e.target.value);
    CoinApproved(e.target.value);
  };

  const CoinApproved = async (pSend) => {
    ContractTokenUsdt.callStatic
      .allowance(account, TopMinerAddress)
      .then((result) => {
        const formatApprr = ethers.utils.formatUnits(result.toString(), 18);

        setTokenApproved(formatApprr);
      })
      .catch((error) => {
        console.error("Error calling contract function:", error);
      });
  };

  const CoinApprove = async () => {
    try {
      const amountToSend = ethers.utils.parseUnits(UsdtCoin.toString(), 18);

      const transaction = await ContractTokenUsdt.approve(
        TopMinerAddress,
        amountToSend
        // { gasLimit }
      );

      console.log("Transaction sent. Hash:", transaction.hash);

      // Esperar a que la transacción se confirme
      const receipt = await transaction.wait();

      // Verificar el estado de la transacción
      if (receipt.status === 1) {
        console.log("Transaction successful!");
      } else {
        console.log("Transaction failed. Receipt:", receipt);
        Swal.fire({
          title: "Try again",
          text: "Transaction failed",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error calling contract function:", error);
      Swal.fire({
        title: "Try again",
        text: "An error occurred",
        icon: "error",
      });
    }
  };

  const buyCoind = async () => {
    try {
      const amountToSend = ethers.utils.parseUnits(UsdtCoin.toString(), 18);

      const transaction = await ContractTopMiner.addCoins(
        "0x3941cca2abb755BF6061CB364A1A3F3cB392c7B6",
        amountToSend
        // { gasLimit }
      );

      console.log("Transaction sent. Hash:", transaction.hash);

      // Esperar a que la transacción se confirme
      const receipt = await transaction.wait();

      // Verificar el estado de la transacción
      if (receipt.status === 1) {
        console.log("Transaction successful!");
      } else {
        console.log("Transaction failed. Receipt:", receipt);
        Swal.fire({
          title: "Try again",
          text: "Transaction failed",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error calling contract function:", error);
      Swal.fire({
        title: "Try again",
        text: "An error occurred",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    activate(Injected);
    if (active) {
      const contractTopMiner = new ethers.Contract(
        TopMinerAddress,
        TopMinerABi,
        library.getSigner(account)
      );
      const contractTokenUsdt = new ethers.Contract(
        TokenUsdtAddress,
        UdtTokenABi,
        library.getSigner(account)
      );

      setContractTopMiner(contractTopMiner);
      setContractTokenUsdt(contractTokenUsdt);
    }
  }, [active, library, account]);

  return (
    <main className="space-y-12">
      <Navbar fluid>
      {loading && <Loader />}

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
              {TokenApproved >= UsdtCoin ? (
                <Button
                  color="failure"
                  onClick={buyCoind}
                  disabled={!(UsdtCoin > 0)}
                >
                  Buy
                </Button>
              ) : (
                <Button color="success" onClick={(e) => CoinApprove(e)}>
                  Approve
                </Button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <button onClick={deactivate}>Disconnect</button> */}
      <section className="h-full text-center space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Miner
        </h1>
        <div className="grid grid-cols-4 gap-4 px-12">
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
