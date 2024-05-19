import React, { useEffect } from "react";
import { List, Page, Icon, useNavigate, Button } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

import { Html5QrcodeScanner } from "html5-qrcode";
import UserCard from "../components/user-card";

const HomePage: React.FunctionComponent = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Code matched = ${decodedText}`, decodedResult);
    }

    function onScanFailure(error) {
      console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, []);

  const openSettingPage = () => {
    navigate("/settings");
  };

  const postData = async () => {
    const data = { a: "aaaaaaa" };
    const response = await fetch(
      " https://9302-125-235-239-109.ngrok-free.app",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    // const response = await fetch(
    //   " https://9302-125-235-239-109.ngrok-free.app",
    //   {
    //     method: "get",
    //     headers: new Headers({
    //       "ngrok-skip-browser-warning": "69420",
    //     }),
    //   }
    // );

    const result = await response.text();
    console.log("Success:", result);
  };

  return (
    <Page className="page flex flex-col justify-between bg-slate-50">
      <div id="reader" className="w-full mt-20"></div>
      <div className="w-full flex flex-col mb-8">
        <Button variant="secondary" size="large" onClick={openSettingPage}>
          Settings
        </Button>
        <Button variant="secondary" size="large" onClick={postData}>
          Post
        </Button>
      </div>
    </Page>
  );
};

export default HomePage;
