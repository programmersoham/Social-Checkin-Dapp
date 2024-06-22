import {
  requestAccess,
  signTransaction,
  setAllowed,
} from "@stellar/freighter-api";

async function checkConnection(): Promise<boolean> {
  const isAllowed: boolean = await setAllowed();
  if (isAllowed) {
    return isAllowed;
  }
  return false; // Added return statement to handle cases where isAllowed is false
}

const retrievePublicKey = async (): Promise<string> => {
  let publicKey: string = "";
  let error: string | null = null;
  try {
    publicKey = await requestAccess();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  if (error) {
    throw new Error(error); // Changed to throw an error instead of returning it
  }
  return publicKey;
};
const userSignTransaction = async (
  xdr: string,
  network: string,
  signWith: string
): Promise<string> => {
  let signedTransaction: string = "";
  let error: string = "";

  try {
    signedTransaction = await signTransaction(xdr, {
      network,
      accountToSign: signWith,
    });
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  if (error) {
    return error;
  }

  return signedTransaction;
};

export { checkConnection, retrievePublicKey, userSignTransaction };