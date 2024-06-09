import React from "react";
import { useRecoilState } from "recoil";
import { itemState } from "../state";

const ScanedData: React.FunctionComponent = () => {
  const [item] = useRecoilState<any>(itemState);

  const stringView = () => {
    return (
      <div className="flex justify-center bg-white p-2 h-full w-11/12 rounded">
        <div
          className="rounded h-fit px-6 py-2 w-full"
          style={{ backgroundColor: "#F7F7F7", color: "#2E2E2E" }}
        >
          <div className="mb-2 text-sky-600 font-semibold">Text</div>
          <div className="truncate">{item}</div>
        </div>
      </div>
    );
  };

  const objectView = () => {
    return (
      <div className="bg-white flex flex-col w-full h-full px-6 pt-2 overflow-y-auto" style={{height: 158}}>
        {item &&
          Object.keys(item).map((k) => {
            return (
              <div className="flex w-full mt-1" key={k}>
                <div
                  className="flex w-2/6 bg-emerald-400 rounded-l-md text-start pl-2 text-white font-semibold items-center truncate"
                  style={{ height: 36 }}
                >
                  <span className="truncate">{k}</span>
                </div>
                <div
                  className="flex w-4/6 bg-indigo-200 rounded-r-md  pl-2 font-semibold items-center"
                  style={{ height: 34, color: "#001A33" }}
                >
                  <span className="truncate">{item[k]}</span>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const getView = () => {
    if (!item) return null;
    if (typeof item == "string") return stringView();
    return objectView();
  };

  return getView();
};

export default React.memo(ScanedData);
