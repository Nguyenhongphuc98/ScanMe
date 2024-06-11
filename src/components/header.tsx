import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { HOST_NOT_CONNECT } from "../core/lang";
import { HostInfo } from "../core/type";
import { hostState } from "../state";

const Header: React.FunctionComponent = () => {

  const host = useRecoilValue<HostInfo>(hostState);
  const navigate = useNavigate();
  
  const openGuidePage = () => {
    navigate("/guide");
  };

  if (typeof host == 'string') return null;

  return host.connected ? (
    <div
      className="flex flex-none justify-center items-center mb-2 h-8 rounded bg-sky-100 w-full bg-[#E5EFFF]"
    >
      <span className="text-sky-600 max-w-52 truncate">{host.channel || host.host}</span>
      <img src="icons/tick.svg" className="px-1 w-6" />
    </div>
  ) : (
    <div
      className="flex flex-none justify-center items-center mb-2 h-8 rounded w-full bg-[#FFF9D0]"
    >
      <span className="text-red-500">{HOST_NOT_CONNECT}</span>
      <img src="icons/question2.svg" className="px-1 w-6" onClick={openGuidePage}/>
    </div>
  );
};

export default React.memo(Header);
