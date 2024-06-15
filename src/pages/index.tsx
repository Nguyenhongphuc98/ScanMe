import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, Button } from "zmp-ui";

import CopyAction from "../components/copy-action";
import Header from "../components/header";
import Noti from "../components/noti-msg";
import ScannedData from "../components/scanned-data";
import Toast from "../components/toast";

import { useRecoilState } from "recoil";
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
import { MetaData } from "../core/api/meta-data";
import { GUI_SCAN } from "../core/lang";

const HomePage: React.FunctionComponent = () => {
  const [host, setHost] = useRecoilState<HostInfo>(hostState);
  const [item, setItem] = useRecoilState<any>(itemState);
  const [noti, setNoti] = useRecoilState(notiState);


  useEffect(() => {
    startScanQR((data) => {
      setNoti("");

      if (data.type === ConnectEndpointKey) {
        data.connected = true;

        MetaData.instance().setEndpoint(data.host);

        setHost(data);
        setItem("");
        setNoti(GUI_SCAN);
      } else {
        MetaData.instance()
          .getFullData(data)
          .then((v) => {
            setItem(v);
          });
      }
    });
  }, []);

  console.log("itemm", item);
  return (
    <Page
      className="page flex flex-col items-center bg-white"
      style={{ paddingBottom: 20 }}
    >
      <Header />

      <div className="flex-none w-full justify-center items-center z-0">
        <div id="reader" className="h-72 bg-gray-200"></div>
        {/* <div className="w-full h-72 bg-black"></div> */}
      </div>

      <div className="bg-white flex flex-col w-full h-full items-center justify-between pt-2 z-40">
        <div className="flex flex-col w-full">
          <Noti />
          <ScannedData />
        </div>
        {!noti && !item && <div></div>}
        <CopyAction />
      </div>
      <Toast />
    </Page>
  );
};

export default HomePage;
