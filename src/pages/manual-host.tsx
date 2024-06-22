import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { Input } from "zmp-ui";
import Toast from "../components/toast";

import { MetaData } from "../core/api/meta-data";
import { HostInfo } from "../core/type";
import { isValidUrl } from "../core/utils";
import { hostState } from "../state";

import Toaster from "../core/toaster";
import CodeHighlight from "../components/code-highlight";
import { useNavigate } from "react-router";
import { reqObject, respObject } from "../core/const";

const ManualHost: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [host, setHost] = useRecoilState<HostInfo>(hostState);
  const [saveable, setSaveable] = useState<boolean>(false);

  const [hostValue, setHostValue] = useState<string>("");
  const [keyValue, setKeyValue] = useState<string>("");

  const [validUrl, setValidUrl] = useState<string>("success");

  const updateHost = () => {
    const saveHost = (host: HostInfo) => {
      MetaData.instance().setEndpoint(host.host, keyValue);
      setHost(host);

      Toaster.show("Lưu thành công.", 1300);
      navigate("/");
    };

    if (keyValue) {
      // authen and get enpoint
    } else {
      const host: HostInfo = {
        connected: true,
        host: hostValue,
        channel: keyValue || hostValue,
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

  const updateKeyInput = (e) => {
    const keyData = e.target.value;
    setKeyValue(keyData);
  };

  return (
    <div className="bg-white h-screen pb-6">
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
          value={keyValue}
          clearable
          status="success"
          onChange={updateKeyInput}
        />

        <div className="flex justify-center my-6">
          {saveable ? (
            <div
              className="flex rounded-md bg-[#0068FF] active:bg-[#0354CA] text-white font-semibold h-10 px-2 items-center w-3/4 justify-center"
              onClick={updateHost}
            >
              Lưu thông tin
            </div>
          ) : (
            <div className="flex rounded-md bg-neutral-100 text-neutral-500 font-semibold h-10 px-2 items-center w-3/4 justify-center">
              Lưu thông tin
            </div>
          )}
        </div>

        <h3 className="font-semibold text-sm text-[#001A33]">
          Bước 2: Tạo handler cho host vừa cung cấp
        </h3>

        <p className="text-xs">
          <h4>Input</h4>
          <ul className="ml-6 mb-2" style={{ listStyleType: "disc" }}>
            <li>ApiType: POST</li>
            <li>Body(raw):</li>
          </ul>
          <CodeHighlight code={reqObject} />
          <h4>Output</h4>
          Trả kết quả dưới dạng JSON như bên dưới:
        </p>
        <CodeHighlight code={respObject} />
        <h3 className="font-semibold text-sm text-[#001A33]">
          Bước 3: Quét thông tin QR
        </h3>
        <p className="text-xs pb-4">
          Mỗi lần quét được thông tin, Scanme sẽ gửi request lên
          <span className="text-orange-700"> host</span> kèm theo thông tin vừa
          quét được. Tùy vào phản hồi từ host:
          <ul className="ml-6 mb-2" style={{ listStyleType: "disc" }}>
            <li>
              error_code: 0, hiển thị{" "}
              <span className="text-orange-700">data</span> trong resp
            </li>
            <li>
              error_code: khác 0, hiển thị{" "}
              <span className="text-orange-700">scanned-data</span>
            </li>
          </ul>
        </p>
      </div>

      <Toast />
    </div>
  );
};

export default React.memo(ManualHost);
