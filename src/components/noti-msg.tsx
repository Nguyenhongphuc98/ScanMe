import React from "react";
import { useRecoilValue } from "recoil";
import { notiState } from "../state";

const Noti: React.FunctionComponent = () => {
  const noti = useRecoilValue(notiState);

  if (noti == null || noti == "") return null;

  return (
    <div className="flex justify-center px-6 pt-2 w-full rounded">
      <span
        className="rounded h-fit px-6 py-2 bg-[#FFF9D0] text-[#FF6A6A]"
      >
        {noti}
      </span>
    </div>
  );
};

export default React.memo(Noti);
