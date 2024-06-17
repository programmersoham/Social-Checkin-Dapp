import {
    Contract,
    SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal,
    Address,
} from "@stellar/stellar-sdk";
import { userSignTransaction } from "../Freighter";
import { getPublicKey } from "@stellar/freighter-api";

let rpcUrl = "https://soroban-testnet.stellar.org";

// Need to update the contract address with my contract address
let contractAdress = "CBOHFPCKOQIUPAIY2U44WP25HVMOSJPLWMEPETRCFPJ5XQXCXZ432FWH";