import React from "react";
// import { Pre, Line, LineNo, LineContent } from "./styles";
import { Highlight } from "prism-react-renderer";
import { Line, LineContent, LineNo, Pre } from "../components/code-style";
import { useNavigate } from "react-router-dom";

const connectObject = `
{
  type: 'connect',
  host: 'host-url.domain',
  key: 'secrect-key',
}
`.trim();

const respObject = `
{
  error_code: 0,
  data: {
    submit: 'submit-url',
    channel: 'channel-name',
  }
}
`.trim();

const Guide: React.FunctionComponent = () => {
  const navigate = useNavigate();
  
  const openAddhostPage = () => {
    navigate("/addhost");
  };

  const renderHighlight = (object) => {
    return (
      <Highlight code={object} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        )}
      </Highlight>
    );
  };

  return (
    <div className="bg-white h-screen">
      <h1 className="text-[#001A33] text-xl font-semibold p-4 ">
        Quét mã để kết nối
      </h1>
      <div className="mx-6">
        <h3 className="font-semibold text-sm text-[#001A33]">
          Bước 1: Tạo mã QR chứa object như bên dưới:
        </h3>
        {renderHighlight(connectObject)}
        <p className="text-xs pb-4">
          Scanme sẽ gửi <span className="text-orange-700">POST</span> request
          lên <span className="text-orange-700">host</span> kèm theo field
          <span className="text-orange-700">key</span> trong body. Bạn có thể bỏ
          qua field này nếu không cần authen.
        </p>
        <h3 className="font-semibold text-sm text-[#001A33]">
          Bước 2: Tạo response cho host vừa cung cấp
        </h3>
        {renderHighlight(respObject)}
        <h3 className="font-semibold text-sm text-[#001A33]">
          Bước 3: Quét thông tin QR
        </h3>
        <p className="text-xs pb-4">
          Mỗi lần quét được thông tin, Scanme sẽ gửi
          <span className="text-orange-700">POST</span> request lên
          <span className="text-orange-700"> submit</span> kèm theo thông tin vừa
          quét được
          <span className="text-orange-700">{`{data: scannedData, sender: ZaloName}`}</span>
          . Nếu response trả về object chứa thông tin đầy đủ
          <span className="text-orange-700">{`{error_code: 0, data: SVdata}`}</span>
          , app sẽ hiển thị <span className="text-orange-700">data</span> trong
          đó, nếu không sẽ chỉ hiển thị thông tin vừa quét được.
        </p>

        <div className="flex justify-center items-end">
          <div className="flex rounded-md bg-[#E5EFFF] active:bg-blue-200 text-[#5198FF] font-semibold w-3/4 h-10 px-2 justify-center items-center" onClick={openAddhostPage}>
            Tạo kết nối thủ công
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Guide);
