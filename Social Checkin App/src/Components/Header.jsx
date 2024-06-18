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
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", // Ensures full viewport height
            padding: "1rem 2.5rem",

        }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "black" }}>
                {/* <img src={StellarLogo} alt="CratePass X Stellar" className="w-11" /> */}
                <h1 >Social Checkin dApp</h1>
            </div>

            <div
                onClick={() => handleOpenMenu()}
                style={{ marginTop: "2rem" }}
            >
                {/* <ion-icon name={open ? "close" : "menu"}></ion-icon> */}
            </div>

            <div>

                <div style={{ padding: "0.25rem", backgroundColor: "#f9fafb", border: "2px solid", maxWidth: "max-content", borderRadius: "0.375rem" }}>
                    <span style={{ padding: "0.25rem 0.5rem", backgroundColor: "#6d28d9", color: "white", borderRadius: "0.375rem" }}>
                        User's  Address
                    </span>
                    <span style={{ padding: "0 0.5rem" }}>
                        {/* {`${publickey.substring(0, 4)} ${publickey && "..."
                            } ${publickey.substring(publickey.length - 4)}`} */}
                        {/*  display the whole public key of the connected wallet */}
                        {publickey}
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
        </div >
    );
};

export default Header;

/* Connect wallet function:

1. To enable connection between the wallet and the web application.
2. To get the public key of the connected wallet.
3. Signing the transaction.
*/

// import React, { useEffect, useState } from "react";
// import { checkConnection, retrievePublicKey } from "./Freighter";

// const Header = ({ setPubKey }) => {
//     const [connect, getConnected] = useState("Connect");
//     const [publickey, getPublicKey] = useState("");

//     const handleOpenMenu = () => /* Your menu handling logic */

//         useEffect(() => {
//             if (publickey !== "") {
//                 getConnected("Connected!");
//                 setPubKey(publickey);
//             }
//         }, [publickey]);

//     const connectWallet = async () => {
//         if (await checkConnection()) {
//             getPublicKey(await retrievePublicKey());
//         }
//     };

//     return (
//         <div
//             style={{

//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "100vh", // Ensures full viewport height
//                 padding: "1rem 2.5rem",

//             }}
//         >
//             <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "black" }}>
//                 <h1>Social Checkin dApp</h1>
//             </div>

//             <div style={{ marginTop: "2rem" }}>
//                 <button
//                     style={{
//                         fontSize: "1.25rem",
//                         backgroundColor: "#60a5fa",
//                         borderRadius: "0.375rem",
//                         padding: "1rem",
//                         fontWeight: "700",
//                         color: "white",
//                         border: "4px solid",
//                         cursor: "pointer",
//                     }}
//                     onClick={connectWallet}
//                 >
//                     {connect}
//                 </button>
//             </div>

//             <div
//                 style={{
//                     marginTop: "2rem",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                 }}
//             >
//                 <div
//                     style={{
//                         padding: "0.25rem",


//                         maxWidth: "max-content",
//                         borderRadius: "0.375rem",
//                     }}
//                 >
//                     <span
//                         style={{
//                             padding: "0.25rem 0.5rem",
//                         }}
//                     >
//                         User's Address
//                     </span>
//                     <span style={{ padding: "0 0.5rem" }}>{publickey}</span>
//                 </div>

//                 {/* Your menu logic (if needed) */}
//                 <div onClick={handleOpenMenu} className="text-4xl cursor-pointer">
//                     {/* Your menu icon */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;
