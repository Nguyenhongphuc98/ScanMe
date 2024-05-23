import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, Button } from "zmp-ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { hostState, itemState as itemState, notiState, userState } from "../state";
import info from "/icons/icon_info.png";

import { ConnectInfo } from "../core/type";
import { ConnectEndpointKey } from "../core/data";
import { startScanQR } from "../core/qr/handler";
import { getLastHost, saveLastHost } from "../core/api/host";

const HomePage: React.FunctionComponent = () => {
  const [host, setHost] = useRecoilState<any>(hostState);
  const [item, setItem] = useRecoilState<any>(itemState);
  const [noti, setNoti] = useRecoilState(notiState);

  const navigate = useNavigate();

  useEffect(() => {
    const lastHost = getLastHost();
    if (lastHost) {
      setHost(lastHost);
      setItem(null);
      setNoti("");
    }

    startScanQR((data) => {
      if (typeof data === "string") {
        setNoti(data);
        setItem("");
        return;
      }

      if (data.type === ConnectEndpointKey) {
        data.connected = true;
        setHost(data);
        setNoti("");
        setItem("");

        saveLastHost(data);
      } else {
        setNoti("");
        setItem(data);
      }
    });
  }, []);

  const openInfoPage = () => {
    navigate("/info");
  };

  const copyNoti = () => {
    const notiElement = document.getElementById("noti");
    navigator.clipboard.writeText(notiElement?.innerText || "");
  };

  console.log('itemm', item);
  return (
    <Page className="page flex flex-col bg-slate-50">
      <div className="flex justify-start mb-2">
        <img className="w-8" src={info} alt="logo" onClick={openInfoPage} />
      </div>
      <div className="flex-2">
        <div id="reader" className="w-full"></div>
        {/* <div className="w-full h-72 bg-black"></div> */}
        {host.connected ? (
          <div className="flex pt-2 w-full justify-center">
            <img className="w-10" src={host.logo} alt="logo" />
            <span
              id="noti"
              className="text-center align-text-bottom text-sky-700 font-bold justify-self-center self-center pl-2"
            >
              {host.chanel}
            </span>
          </div>
        ) : (
          <div className="flex">
            <span className="text-center align-text-bottom w-full mt-2 text-orange-700 font-bold">
              Chưa có kết nối!
            </span>
          </div>
        )}
      </div>
      {noti && (
        <div
          id="noti"
          className="bg-sky-100 p-2 mt-4 text-center rounded-md"
          onClick={copyNoti}
        >
          {noti}
        </div>
      )}
      {item &&
        Object.keys(item).map((k) => {
          return (
            <div className="flex flex-row mt-2">
              <div className="bg-sky-200 p-2 mr-2 min-w-24">{k}:</div>
              <div className="bg-sky-200 p-2 mr-2">{item[k]}.</div>
            </div>
          );
        })}
    </Page>
  );
};

export default HomePage;
