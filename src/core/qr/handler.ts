import { Html5Qrcode } from "html5-qrcode";

export function startScanQR(onSuccess: (data: any) => void) {
  const errors: any = [];
  
  let lastItem: any = null;

  function onScanSuccess(decodedText, decodedResult) {
    if (lastItem == decodedText) {
      console.log("duplicate: ", decodedText);
      return;
    }

    console.log("will process", decodedText);
    lastItem = decodedText;

    try {
      const item = JSON.parse(decodedText);
      console.log("did process", item);

      onSuccess(item);
    } catch (error) {
      onSuccess(decodedText);
      console.error("parse error: ", error);
      // errors.push(error);
    }
  }

  function onScanFailure(error) {
    console.error("scan error: ", error);
    // errors.push(error);
  }

  const html5QrCode = new Html5Qrcode(/* element id */ "reader");
  html5QrCode
    .start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: (x,y) => {return {width: x, height: y}},
      },
      onScanSuccess,
      onScanFailure
    )
    .catch((err) => {
      console.error("start error", err);
    });
}
