import React from "react";
import { useRecoilState } from "recoil";
import { itemState } from "../state";

const Action: React.FunctionComponent = () => {

  const [item] = useRecoilState<any>(itemState);

  const copyData = () => {
    navigator.clipboard.writeText(item);
  };

  return (
    <div className="flex">
      {item ? (
        <div
          className="flex justify-center h-10 rounded bg-gray-200 w-60 items-center mt-2"
          style={{ backgroundColor: "#0068FF" }}
          onClick={copyData}
        >
          <span className="text-white">Sao chép</span>
        </div>
      ) : (
        <div
          className="flex justify-center h-10 rounded bg-gray-200 w-60 items-center mt-2"
          style={{ backgroundColor: "#F2F3F4", color: "#D2D3D3" }}
        >
          <span className="text-neutral-500">Sao chép</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Action);
