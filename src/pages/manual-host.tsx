import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { Input } from "zmp-ui";
import Toast from "../components/toast";

import { MetaData } from "../core/api/meta-data";
import { HostInfo } from "../core/type";
import { isValidUrl } from "../core/utils";
import { hostState } from "../state";


import Toaster from "../core/toaster";
import { useNavigate } from "react-router";

const ManualHost: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [host, setHost] = useRecoilState<HostInfo>(hostState);
  const [saveable, setSaveable] = useState<boolean>(false);
  const [hostValue, setHostValue] = useState<string>("");
  const [validUrl, setValidUrl] = useState<string>("success");

  const updateHost = () => {
    

    const hostElement = document.getElementById("host");
    const keyElement = document.getElementById("host");

    const endpoint = hostElement?.textContent || "";
    const key = keyElement?.textContent || "";

    const saveHost = (host: HostInfo) => {

      MetaData.instance().setEndpoint(host.host);
      setHost(host);

      Toaster.show("Lưu thành công.", 1300);
      navigate("/");
    }

    if (key) {
      // authen and get enpoint
    } else {
      const host: HostInfo = {
        connected: true,
        host: endpoint,
        channel: endpoint,
      };
      saveHost(host);
    }
  };

  const updateHostInput = (e) => {
    const url = e.target.value;
    setHostValue(url);
    if (e.target.value) {
      if (isValidUrl(url)) {
        setSaveable(true);
        setValidUrl("success");
      } else {
        setSaveable(false);
        setValidUrl("error");
      }
      
    } else {
      setSaveable(false);
      setValidUrl("success");
    }
  };

  return (
    <div className="bg-white h-screen">
      <h1 className="text-[#001A33] text-xl font-semibold p-4 ">
        Nhập host để kết nối
      </h1>
      <div className="mx-6 h-1/2">
        <h3 className="font-semibold text-sm text-[#001A33] mb-2">
          Bước 1: Nhập host và key vào bên dưới:
        </h3>
        <Input
          label="Host *"
          type="text"
          placeholder="host-url.domain"
          value={hostValue}
          errorText="Cần nhập đúng url"
          clearable
          status={validUrl}
          onChange={updateHostInput}
        />
        <Input
          label="Key (optional)"
          type="text"
          placeholder="secrect-key"
          value=""
          errorText="Bạn phải nhập đúng"
          clearable
          status="success"
        />

        <h3 className="font-semibold text-sm text-[#001A33] mt-6">
          Bước 2: Quét thông tin QR
        </h3>
        <p className="text-xs pb-4">
          Mỗi lần quét được thông tin, Scanme sẽ gửi
          <span className="text-orange-700">POST</span> request lên
          <span className="text-orange-700"> submit</span> kèm theo thông tin vừa
          quét được
          <span className="text-orange-700">{`{data: scannedData, sender: ZaloName}`}</span>
          . Nếu response trả về object chứa thông tin đầy đủ
          <span className="text-orange-700">{`{error_code: 0, data: SVdata}`}</span>
          , app sẽ hiển thị <span className="text-orange-700">data</span> trong
          đó, nếu không sẽ chỉ hiển thị thông tin vừa quét được.
        </p>

        <div className="flex justify-center h-1/2 items-end">
          {saveable ?<div
            className="flex rounded-md bg-[#0068FF] active:bg-[#0354CA] text-white font-semibold w-fit h-10 px-2 items-center w-3/4 justify-center"
            onClick={updateHost}
          >
            Lưu thông tin
          </div> :
          <div
            className="flex rounded-md bg-neutral-100 text-neutral-500 font-semibold w-fit h-10 px-2 items-center w-3/4 justify-center"
          >
            Lưu thông tin
          </div>}
        </div>
      </div>

      <Toast/>
    </div>
  );
};

export default React.memo(ManualHost);
