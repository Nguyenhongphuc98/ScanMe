import React from "react";
import { useRecoilState } from "recoil";
import { HostInfo } from "../core/type";
import { hostState } from "../state";

const Header: React.FunctionComponent = () => {

  const [host] = useRecoilState<HostInfo>(hostState);

  if (typeof host == 'string') return null;

  return host.connected ? (
    <div
      className="flex flex-none justify-center items-center mb-2 h-8 rounded bg-sky-100  w-full"
      style={{ backgroundColor: "#E5EFFF", color: "5198FF" }}
    >
      <span className="text-sky-600 max-w-52 truncate">{host.channel || host.host}</span>
      <img src="icons/tick.svg" className="px-1 w-6" />
    </div>
  ) : (
    <div
      className="flex flex-none justify-center items-center mb-2 h-8 rounded w-full"
      style={{ backgroundColor: "#FFF9D0", color: "FF6A6A" }}
    >
      <span className="text-red-500">Chưa kết nối máy chủ</span>
      <img src="icons/question2.svg" className="px-1 w-6" />
    </div>
  );
};

export default React.memo(Header);
