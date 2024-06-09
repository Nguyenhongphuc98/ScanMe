import React from "react";
import { useRecoilState } from "recoil";
import { itemState } from "../state";

const Action: React.FunctionComponent = () => {
  const [item] = useRecoilState<any>(itemState);

  const copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(item));
  };

  return (
    <div className="flex">
      {item ? (
        <div
          className="flex justify-center h-10 rounded w-60 items-center mt-2 bg-blue-600 active:bg-blue-700"
          onClick={copyData}
        >
          <img src="icons/copy.png" className="px-1 w-6" />
          <span className="text-white">Sao chép</span>
        </div>
      ) : (
        <div className="flex justify-center h-10 rounded w-60 items-center mt-2 bg-neutral-100">
           <img src="icons/copy-gray.png" className="px-1 w-6" />
          <span className="text-neutral-500">Sao chép</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Action);
