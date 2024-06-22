import {
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  Address,
} from "@stellar/stellar-sdk";
import { userSignTransaction } from "./Freighter";

const rpcUrl: string = "https://soroban-testnet.stellar.org";


const contractAddress: string =
  "CBPSRM3TVRYA6PT7ESIXC64QZDTKIQNSKBYJ4CED64CN2OITETB67X2P";

const params = {
  fee: BASE_FEE,
  networkPassphrase: Networks.TESTNET,
};

const accountToScVal = (account: string): any => new Address(account).toScVal();

const stringToScValString = (value: string): any => {
  return nativeToScVal(value);
};

const numberToU64 = (value: number): any => {
  return nativeToScVal(value, { type: "u64" });
};

async function contractInt(caller: string, functName: string, values: any): Promise<any> {
  const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
  const sourceAccount = await provider.getAccount(caller);
  const contract = new Contract(contractAddress);
  let buildTx: any;

  if (values == null) {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName))
      .setTimeout(30)
      .build();
  } else if (Array.isArray(values)) {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName, ...values))
      .setTimeout(30)
      .build();
  } else {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName, values))
      .setTimeout(30)
      .build();
  }

  let _buildTx = await provider.prepareTransaction(buildTx);

  let prepareTx = _buildTx.toXDR(); // pre-encoding (converting it to XDR format)

  let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);

  let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);

  try {
    let sendTx = await provider.sendTransaction(tx).catch(function (err) {
      console.error("Catch-1", err);
      return err;
    });
    if (sendTx.errorResult) {
      throw new Error("Unable to submit transaction");
    }
    if (sendTx.status === "PENDING") {
      let txResponse = await provider.getTransaction(sendTx.hash);
      while (txResponse.status === "NOT_FOUND") {
        txResponse = await provider.getTransaction(sendTx.hash);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (txResponse.status === "SUCCESS") {
        let result = txResponse.returnValue;
        return result;
      }
    }
  } catch (err) {
    console.log("Catch-2", err);
    return;
  }
}

async function createPass(caller: string, title: string, descrip: string): Promise<number | void> {
  let titleScVal = stringToScValString(title);
  let descripScVal = stringToScValString(descrip);
  let values = [titleScVal, descripScVal];

  try {
    const passId = await contractInt(caller, "create_pass", values);
    let resolvedPassId = Number(passId?._value?._value);
    console.log(resolvedPassId);
    return resolvedPassId;
  } catch (error) {
    console.log("Pass not created. Check if you already have an active pass");
  }
}

async function approvePass(caller: string, pass_id: number): Promise<void> {
  let values = numberToU64(pass_id);

  try {
    await contractInt(caller, "approve_pass", values);
    console.log(`!!Pass ID - ${pass_id}, is now Approved!!`);
  } catch (error) {
    console.log("Pass can't be approved!!");
  }
}

async function expirePass(caller: string, pass_id: number): Promise<void> {
  let values = numberToU64(pass_id);

  try {
    await contractInt(caller, "expire_pass", values);
    console.log(`!!Pass ID - ${pass_id}, is now expired!!`);
  } catch (error) {
    console.log("Pass can't be expired!!");
  }
}

async function fetchAllPassStatus(caller: string): Promise<number[] | void> {
  try {
    let result = await contractInt(caller, "view_all_pass_status", null);
    let ansArr: number[] = result?._value.map((item: any) => Number(item?._attributes?.val?._value));
    console.log(...ansArr);
    return ansArr;
  } catch (error) {
    console.log("Unable to fetch All Pass Status!!");
  }
}

async function fetchMyPassStatus(caller: string, pass_id: number): Promise<(number | string)[] | void> {
  let values = numberToU64(pass_id);
  let result1, result2;

  try {
    result1 = await contractInt(caller, "view_my_pass", values);
  } catch (error) {
    console.log("Unable to fetch Your Pass Status!!");
    return [];
  }

  try {
    result2 = await contractInt(caller, "view_ac_pass_by_unique_id", values);
  } catch (error) {
    console.log("Unable to fetch Your Pass Status!!");
    return [];
  }

  let ansArr: (number | string)[] = [
    Number(result1?._value[0]?._attributes?.val?._value),
    result1?._value[1]?._attributes?.val?._value?.toString(),
    Number(result1?._value[2]?._attributes?.val?._value),
    result1?._value[3]?._attributes?.val?._value,
    result1?._value[4]?._attributes?.val?._value?.toString(),
    Number(result1?._value[5]?._attributes?.val?._value),
    result2?._value[1]?._attributes?.val?._value,
    Number(result2?._value[2]?._attributes?.val?._value),
  ];

  console.log(...ansArr);
  return ansArr;
}

export {
  createPass,
  approvePass,
  expirePass,
  fetchAllPassStatus,
  fetchMyPassStatus,
};
