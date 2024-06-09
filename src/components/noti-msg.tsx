import React from "react";
import { useRecoilState } from "recoil";
import { notiState } from "../state";

const Noti: React.FunctionComponent = () => {
  const [noti] = useRecoilState(notiState);

  if (noti == null || noti == "") return null;

  return (
    <div className="flex justify-center p-6 w-full rounded">
      <span
        className="rounded h-fit px-6 py-2"
        style={{ backgroundColor: "#FFF9D0", color: "#FF6A6A" }}
      >
        {noti}
      </span>
    </div>
  );
};

export default React.memo(Noti);
