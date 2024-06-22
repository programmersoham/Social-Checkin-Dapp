"use client";
import React, { useEffect, useState } from "react";
import { checkConnection, retrievePublicKey } from "./Freighter";
import ImageUploader from "./ImageUploader";
import StellarLogo from "../public/stellarlogo.png";

interface HeaderProps {
  setPubKey: (key: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPubKey }) => {
  const [connect, setConnect] = useState<string>("Connect");
  const [publicKey, setPublicKey] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenMenu = () => setOpen(!open);

  useEffect(() => {
    if (publicKey !== "") {
      setConnect("Connected!");
      setPubKey(publicKey);
    }
  }, [publicKey, setPubKey]);

  const connectWallet = async () => {
    if (await checkConnection()) {
      setPublicKey(await retrievePublicKey());
    }
  };

  return (
    <div className="bg-slate-400 flex md:flex-row shadow-slate-500 shadow-lg justify-between items-center px-10 py-4">
      <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-black flex items-center gap-5">
        <img src={StellarLogo.src} alt="CratePass X Stellar" className="w-11" />
        <span className="text">Checkin dApp</span>
      </div>

      <div
        onClick={handleOpenMenu}
        className="text-4xl absolute top-4 right-3 md:hidden cursor-pointer"
      >
        {/* <ion-icon name={open ? "close" : "menu"}></ion-icon> */}
      </div>

      <div>
        <ul
          className={`${
            open ? "top-20 left-0" : "top-[-496px]"
          } flex flex-col md:flex-row md:justify-around items-center text-nowrap md:pb-0 py-3 absolute md:static bg-white md:bg-[transparent] gap-5 w-full md:w-auto pl-3 md:border-none border-2 border-blue-400 rounded-b-2xl transition-all duration-500 ease-in-out z-10`}
        >
          <li>
            <div className="p-1 bg-gray-50 border-2 max-w-max rounded-md">
              <span className="p-1 px-2 bg-violet-700 text-white h-full rounded-md">
                Address
              </span>
              <span className="px-2">
                {publicKey}
                {/* {`${publicKey.substring(0, 4)} ${
                  publicKey && "..."
                } ${publicKey.substring(publicKey.length - 4)}`} */}
              </span>
            </div>
          </li>
          <li>
            <button
              className="text-xl w-52 hover:bg-blue-500 bg-blue-400 rounded-md p-4 font-bold text-white border-4"
              onClick={connectWallet}
            >
              {connect}
              {connect === "Connected!" ? (
                <ImageUploader isConnected={true} />
              ) : (
                <ImageUploader isConnected={false} />
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

/* Connect wallet function:

1. To enable connection between the wallet and the web application.
2. To get the public key of the connected wallet.
3. Signing the transaction.
*/

// image uploader component : image uploader displays file picker when user has connected wallet and displays message to connect wallet when user has not connected wallet.
