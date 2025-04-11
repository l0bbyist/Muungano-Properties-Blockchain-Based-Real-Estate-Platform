import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import axios from "axios";
import Cookie from "../../helper/cookie";
import getWeb3 from "../../helper/getWeb3"; // Use your modern getWeb3

const handleSignMessage = async (web3, publicAddress, nonce) => {
  try {
    const signature = await web3.eth.personal.sign(
      web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
      publicAddress,
      "" // password ignored by MetaMask
    );
    return { publicAddress, signature };
  } catch (err) {
    throw new Error("You need to sign the message to be able to log in.");
  }
};

const handleSignup = async (publicAddress) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL_API}/users`,
      { publicAddress },
      { headers: { "Content-Type": "application/json" } }
    );
    return result.data; // Make sure backend returns { nonce }
  } catch (error) {
    alert("Signup failed: " + error.message);
    throw error;
  }
};

const handleAuthenticate = async (publicAddress, signature) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL_API}/auth/login`,
      { publicAddress, signature }
    );
    return res.data.accessToken;
  } catch (error) {
    alert("Authentication failed: " + error.message);
    throw error;
  }
};

const getNonce = async (publicAddress) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL_API}/users/check_registed`,
    { params: { publicAddress } }
  );
  return res.data.data.nonce; // Adjust if shape is different
};

const getInfoUser = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL_API}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data.data;
};

const handleClick = async () => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const publicAddress = accounts[0];

    if (!publicAddress) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    let nonce;

    try {
      nonce = await getNonce(publicAddress);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const result = await handleSignup(publicAddress);
        nonce = (result && result.nonce) || (result.data && result.data.nonce);
 // adjust based on API response
      } else {
        throw error;
      }
    }

    const { signature } = await handleSignMessage(web3, publicAddress, nonce);
    const accessToken = await handleAuthenticate(publicAddress, signature);

    const currentTime = new Date();
    const expiredTime = currentTime.setMinutes(currentTime.getMinutes() + 24 * 60);
    Cookie.setCookie("accessToken", accessToken);
    Cookie.setCookie("expiredToken", expiredTime, 1);

    const user = await getInfoUser(accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    return { accessToken, user };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

function* loginFlow() {
  try {
    const response = yield call(handleClick);
    yield put({ type: LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error.message });
  }
}

function* loginWatcher() {
  yield takeEvery(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
