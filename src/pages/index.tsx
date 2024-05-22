import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, Button } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import info from "/icons/icon_info.png";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";

import { ConnectInfo } from "../core/type";
import { ConnectEndpointKey } from "../core/data";

const fakeConnectInfo: ConnectInfo = {
  type: ConnectEndpointKey,
  endpointUrl:
    "https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg",
  logoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg",
  chanelName: "Shipping list 24/5/24",
};

const errors: any = [];

const HomePage: React.FunctionComponent = () => {
  const [connected, setConnected] = useState(false);
  const [host, setHost] = useState(fakeConnectInfo);
  const [item, setItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("aaaa");
    // // Don't
    let ScanedItems = [];
    setInterval(() => {
      ScanedItems = [];
    }, 1500); // TODO: dynamic config

    function onScanSuccess(decodedText, decodedResult) {
      if (ScanedItems.some((it) => it == decodedText)) {
        console.log("duplicate: ", decodedText);
        return;
      }

      console.log("will process", decodedText);

      try {
        const item = JSON.parse(decodedText);
        console.log("did process", item);
        if (item.type === ConnectEndpointKey) {
          setConnected(true);
          setHost(item);
          return;
        }

        setItem(item);

        // send data to server.
      } catch (error) {
        console.error("parse error: ", error);
        errors.push(error);
      }
    }

    function onScanFailure(error) {
      console.error("scan error: ", error);
      errors.push(error);
    }

    // let html5QrcodeScanner = new Html5QrcodeScanner(
    //   "reader",
    //   { fps: 10, qrbox: { width: 250, height: 250 } },
    //   /* verbose= */ false
    // );
    // html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    // This method will trigger user permissions
    const html5QrCode = new Html5Qrcode(/* element id */ "reader");
    html5QrCode
      .start(
        { facingMode: "environment" },
        {
          fps: 10, // Optional, frame per seconds for qr code scanning
          qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
        },
        onScanSuccess,
        onScanFailure
      )
      .catch((err) => {
        console.error("start error", err);
      });
  }, []);

  const postData = async () => {
    const data = { a: "aaaaaaa" };
    const response = await fetch(
      " https://9302-125-235-239-109.ngrok-free.app",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.text();
    console.log("Success:", result);
  };

  const openInfoPage = () => {
    navigate("/info");
  };

  return (
    <Page className="page flex flex-col bg-slate-50">
      <div className="flex justify-end">
        <img className="w-10" src={info} alt="logo" onClick={openInfoPage} />
      </div>
      <div className="flex-2">
        <div id="reader" className="w-full mt-20"></div>
        {connected ? (
          <div className="flex pt-2 w-full justify-center">
            <img className="w-10" src={host.logoUrl} alt="logo" />
            <span
              id="noti"
              className="text-center align-text-bottom text-sky-700 font-bold justify-self-center self-center pl-2"
            >
              {host.chanelName}
            </span>
          </div>
        ) : (
          <div className="flex">
            <span
              id="noti"
              className="text-center align-text-bottom w-full mt-2 text-orange-700 font-bold"
            >
              Chưa có kết nối!
            </span>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col mb-8">{item}</div>
    </Page>
  );
};

export default HomePage;
