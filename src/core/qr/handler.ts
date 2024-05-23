import { Html5Qrcode } from "html5-qrcode";

export function startScanQR(onSuccess: (data: any) => void) {
  const errors: any = [];
  let ScanedItems = [];
  setInterval(() => {
    ScanedItems = [];
  }, 1500); // TODO: dynamic config

  function onScanSuccess(decodedText, decodedResult) {
    if (ScanedItems.some((it) => it == decodedText)) {
      console.log("duplicate: ", decodedText);
      return;
    }

    console.log("will process", decodedText);

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
        qrbox: { width: 250, height: 250 },
      },
      onScanSuccess,
      onScanFailure
    )
    .catch((err) => {
      console.error("start error", err);
    });
}
