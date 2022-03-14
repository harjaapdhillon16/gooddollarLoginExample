import "./App.css";
import { useState } from "react";
import {
  LoginButton,
  createLoginLink,
  parseLoginResponse,
} from "client-sdk-gooddollar";

function App() {
  const gooddollarLink = createLoginLink({
    v: "Google",
    web: "https://gooddollar.netlify.app",
    id: "0x09D2011Ca5781CA70810F6d82837648132762F9a",
    r: ["mobile", "location", "email", "name"],
    rdu: "https://gooddollar.netlify.app",
  });
  console.log(gooddollarLink);

  const [gooddollarData, setGooddollarData] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{ width: 200, height: 50, objectFit: "contain" }}
          src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.gooddollar.org/wp-content/uploads/2020/05/logo.png"
          className="App-logo"
          alt="logo"
        />
        {Object.keys(gooddollarData).length === 0 ? (
          <>
            <p>An App To Test the loggin with G$ functionality.</p>
            <LoginButton
              onLoginCallback={async (data) => {
                console.log(data);
                setGooddollarData(await parseLoginResponse(data));
                console.log("cool stuff happening", parseLoginResponse(data));
              }}
              gooddollarlink={gooddollarLink}
              style={{ fontSize: 20, padding: 20 }}
              rdu="gasdasd"
            >
              Loggin With GOODDOLLAR
            </LoginButton>
          </>
        ) : (
          <div>
            <p>Logged In</p>
            <p>Name : {gooddollarData.fullName}</p>
            <p>Wallet Address : {gooddollarData.walletAddrress}</p>
            <p>Mobile Number : {gooddollarData.mobile}</p>
            <p>Location : {gooddollarData.location}</p>
            <p>Email : {gooddollarData.email}</p>
            <button
              onClick={() => {
                setGooddollarData({});
                window.location.href = "http://localhost:3001/";
              }}
              style={{ fontSize: 20, padding: 20 }}
            >
              Logout
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
