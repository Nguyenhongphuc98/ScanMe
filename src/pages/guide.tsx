import React from "react";
import { useNavigate } from "react-router-dom";
import CodeHighlight from "../components/code-highlight";
import { connectObject, reqObject, respObject } from "../core/const";

const Guide: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const openAddhostPage = () => {
    navigate("/addhost");
  };
  

  return (
    <div className="bg-white">
      <h1 className="text-[#001A33] text-xl font-semibold p-4 ">
        Quét mã để kết nối
      </h1>
      <div className="mx-6">
        <h3 className="font-semibold text-sm text-[#001A33]">
          Bước 1: Tạo mã QR chứa dạng stringify của object như bên dưới:
        </h3>
        <CodeHighlight code = {connectObject}/>
        <p className="text-xs pb-4">
          Scanme sẽ lưu thông tin này để sử dụng trong suốt phiên mở app. Bạn có
          thể bỏ qua field <span className="text-orange-700">key</span> nếu
          không cần authen.
        </p>
        <h3 className="font-semibold text-sm text-[#001A33]">
          Bước 2: Tạo handler cho host vừa cung cấp
        </h3>

        <p className="text-xs">
          <h4>Input</h4>
          <ul className="ml-6 mb-2" style={{ listStyleType: "disc" }}>
            <li>ApiType: POST</li>
            <li>Body (raw):</li>
          </ul>
          <CodeHighlight code = {reqObject}/>
          <h4>Output</h4>
          Trả kết quả dưới dạng JSON như bên dưới:
        </p>
        <CodeHighlight code = {respObject}/>
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

        <div className="flex justify-center items-end">
          <div
            className="flex rounded-md bg-[#E5EFFF] active:bg-blue-200 text-[#5198FF] font-semibold w-3/4 h-10 px-2 mb-6 justify-center items-center"
            onClick={openAddhostPage}
          >
            Tạo kết nối thủ công
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Guide);
