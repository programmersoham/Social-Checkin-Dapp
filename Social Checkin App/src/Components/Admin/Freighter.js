import {
  requestAccess,
  signTransaction,
  setAllowed,
} from "@stellar/freighter-api";

async function checkConnection() {
  const isAllowed = await setAllowed();
  if (isAllowed) {
    return isAllowed;
  }
}

const retrievePublicKey = async () => {
  let publicKey = "";
  let error = "";
  try {
    publicKey = await requestAccess();
  } catch (e) {
    error = e;
  }
  if (error) {
    return error;
  }
  return publicKey;
};

/**
 * Signs a transaction using the provided XDR, network, and account.
 *
 * @param {string} xdr - The XDR of the transaction to sign.
 * @param {string} network - The network to sign the transaction on.
 * @param {string} signWith - The account to sign the transaction with.
 * @returns {Promise<string>} The signed transaction or an error message.
 */
const userSignTransaction = async (xdr, network, signWith) => {
  let signedTransaction = "";
  let error = "";

  try {
    signedTransaction = await signTransaction(xdr, {
      network,
      accountToSign: signWith,
    });
  } catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }

  return signedTransaction;
};

export { checkConnection, retrievePublicKey, userSignTransaction };