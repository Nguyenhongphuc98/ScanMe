import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, Button } from "zmp-ui";

import CopyAction from "../components/copy-action";
import Header from "../components/header";
import Noti from "../components/noti-msg";
import ScannedData from "../components/scanned-data";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  hostState,
  itemState as itemState,
  notiState,
  userState,
} from "../state";

import questionIcon from "/icons/question.svg";

import { HostInfo } from "../core/type";
import { ConnectEndpointKey } from "../core/data";
import { startScanQR } from "../core/qr/handler";

const HomePage: React.FunctionComponent = () => {
  const [host, setHost] = useRecoilState<HostInfo>(hostState);
  const [item, setItem] = useRecoilState<any>(itemState);
  const [noti, setNoti] = useRecoilState(notiState);

  const navigate = useNavigate();

  useEffect(() => {
    startScanQR((data) => {
      setNoti("");

      if (data.type === ConnectEndpointKey) {
        data.connected = true;
        setHost(data);
        setItem("");
      } else {
        setItem(data);
      }
    });
  }, []);

  const openInfoPage = () => {
    navigate("/info");
  };

  console.log("itemm", item);
  return (
    <Page
      className="page flex flex-col items-center bg-white"
      style={{ paddingBottom: 20 }}
    >
      <Header/>

      <div className="flex-none w-full justify-center items-center z-0">
        <div id="reader" className="h-72 bg-gray-200"></div>
        {/* <div className="w-full h-72 bg-black"></div> */}
      </div>

      

      <div className="bg-white flex flex-col flex-1 w-full items-center justify-between pt-2 z-50">
        <Noti />
        <ScannedData/>
        {!noti && !item && <div></div>}
        <CopyAction/>
      </div>
    </Page>
  );
};

export default HomePage;
