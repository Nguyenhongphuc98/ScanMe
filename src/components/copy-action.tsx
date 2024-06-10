import React from "react";

import Toaster from "../core/toaster";

import { useRecoilState, useRecoilValue } from "recoil";
import { MetaData } from "../core/api/meta-data";
import { itemState, toastState } from "../state";
import { COPY } from "../core/lang";


const Action: React.FunctionComponent = () => {
  const item = useRecoilValue<any>(itemState);
  // const [_, setToast] = useRecoilState<any>(toastState);

  const copyData = () => {
    navigator.clipboard.writeText(
      JSON.stringify(MetaData.instance().getLastData())
    );

    // setToast("Đã sao chép!.");
    Toaster.show("Đã sao chép.");
  };

  return (
    <div className="flex">
      {item ? (
        <div
          className="flex justify-center h-10 rounded w-60 items-center mt-2 bg-blue-600 active:bg-blue-700"
          onClick={copyData}
        >
          <img src="icons/copy.png" className="px-1 w-6" />
          <span className="text-white">{COPY}</span>
        </div>
      ) : (
        <div className="flex justify-center h-10 rounded w-60 items-center mt-2 bg-neutral-100">
          <img src="icons/copy-gray.png" className="px-1 w-6" />
          <span className="text-neutral-500">{COPY}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Action);
