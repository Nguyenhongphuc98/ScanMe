import React from "react";
import { useRecoilValue } from "recoil";
import { itemState } from "../state";

const ScanedData: React.FunctionComponent = () => {
  const item = useRecoilValue<any>(itemState);

  // const stringView = () => {
  //   return (
  //     <div className="flex justify-center bg-white p-2 h-full w-11/12 rounded">
  //       <div
  //         className="rounded h-fit px-6 py-2 w-full bg-[#F7F7F7] text-[#2E2E2E]"
  //       >
  //         <div className="mb-2 text-sky-600 font-semibold">Text</div>
  //         <div className="truncate">{item}</div>
  //       </div>
  //     </div>
  //   );
  // };

  // const objectView = () => {
  //   return (
  //     <div className="bg-white flex flex-col w-full h-full px-6 pt-2 mt-6 overflow-y-auto" style={{height: 168}}>
  //       {item &&
  //         Object.keys(item).map((k) => {
  //           return (
  //             <div className="flex w-full mt-1" key={k}>
  //               <div
  //                 className="flex w-2/6 h-[2.5rem] bg-emerald-400 rounded-l-md text-start pl-2 text-white font-semibold items-center truncate"
  //               >
  //                 <span className="truncate">{k}</span>
  //               </div>
  //               <div
  //                 className="flex w-4/6 bg-indigo-200 rounded-r-md  pl-2 font-semibold items-center text-[#001A33] h-[2.4rem]"
  //               >
  //                 <span className="truncate">{item[k]}</span>
  //               </div>
  //             </div>
  //           );
  //         })}
  //     </div>
  //   );
  // };

  const stringView = () => {
    return (
      <div className="flex flex-col w-full h-full px-4 overflow-y-auto" style={{height: "30vh"}}>
        <div className="bg-emerald-400 text-white rounded w-fit px-1 py-0.5 my-1">Dữ liệu text</div>
        <div className="truncate">{item}</div>
      </div>
    );
  };

  const objectView = () => {
    return (
      <div className="flex flex-col w-full h-full px-4 overflow-y-auto" style={{height: "30vh"}}>
        <div className="bg-emerald-400 text-white rounded w-fit px-1 py-0.5 my-1">Dữ liệu cấu trúc</div>
        {item &&
          Object.keys(item).map((k) => {
            return (
              <div className="flex w-full mt-1.5 border-b" key={k}>
                <div
                  className="flex w-2/6 text-start text-[#7B7B7D] font-semibold items-center truncate"
                >
                  <span className="truncate">{k}</span>
                </div>
                <div
                  className="flex w-4/6 font-semibold items-center text-[#001A33]"
                >
                  <span className="truncate">{item[k]}</span>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const getContent = () => {
    if (!item) return null;
    if (typeof item == "string") return stringView();
    return objectView();
  };

  if (!item) return null;

  return <div className="flex flex-col w-full bg-white justify-center m-4">
      <div className="flex w-11/12 mb-0.5 bg-[#EEEEEE] p-1 rounded-t-md">
        <img src="./icons/success-green.png" className="w-5"/>
        <span className="mx-1 text-[#00C578] font-semibold">QUÉT THÀNH CÔNG</span>
      </div>
      <div className="w-11/12 bg-[#F8F8F8]">
        {getContent()}
      </div>
    </div>
};

export default React.memo(ScanedData);
