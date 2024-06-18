import React, { useEffect, useState } from "react";
import { checkConnection, retrievePublicKey } from "./Freighter";


const Header = ({ setPubKey }) => {
    const [connect, getConnected] = useState("Connect");
    const [publickey, getPublicKey] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpenMenu = () => setOpen(!open);

    useEffect(() => {
        if (publickey !== "") {
            getConnected("Connected!");
            setPubKey(publickey);
        }
    }, [publickey]);

    const connectWallet = async () => {
        if (await checkConnection()) {
            getPublicKey(await retrievePublicKey());
        }
    };

    return (
        <div className="bg-slate-400 flex md:flex-row shadow-slate-500 shadow-lg justify-between items-center px-10 py-4">
            <div className="text-2xl sm:text-
      3xl lg:text-3xl font-semibold text-black flex items-center gap-5">
                {/* <img src={StellarLogo} alt="CratePass X Stellar" className="w-11" /> */}
                <h1 >Social Checkin dApp</h1>
            </div>

            <div
                onClick={() => handleOpenMenu()}
                className="text-4xl absolute top-4 right-3 md:hidden cursor-pointer"
            >
                {/* <ion-icon name={open ? "close" : "menu"}></ion-icon> */}
            </div>

            <div>

                <div className="p-1 bg-gray-50  border-2 max-w-max rounded-md">
                    <span >
                        User's     Address
                    </span>
                    <span className="px-2">
                        {`${publickey.substring(0, 4)} ${publickey && "..."
                            } ${publickey.substring(publickey.length - 4)}`}
                    </span>
                </div>

                <button style={{
                    fontSize: "1.25rem", width: "13rem", backgroundColor: "#60a5fa", borderRadius: "0.375rem", padding: "1rem", fontWeight: "700", color: "white", border: "4px solid", cursor: "pointer"
                }}


                    onClick={connectWallet}
                >
                    {connect}
                </button>

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