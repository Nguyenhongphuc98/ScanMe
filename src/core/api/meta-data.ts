import { getUserInfo } from "zmp-sdk";

type JSONResponse = {
  error_code: number;
  data: any;
};

export class MetaData {
  endpoint: string = "";
  key: string = "";

  zaloName: string = "";
  lastData: any;

  static _instance: MetaData;

  constructor() {}

  static instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  init() {
    getUserInfo({
      avatarType: "normal",
    }).then((data) => {
      this.zaloName = data.userInfo.name;
    });
  }

  setEndpoint(url: string, key: string = "") {
    this.endpoint = url;
    this.key = key;
  }

  getFullData(data: any) {
    return new Promise((resolve) => {
      const onDone = (meta) => {
        this.lastData = meta;
        resolve(meta);
      };

      if (this.endpoint == "") {
        console.log("endpoint not set, use default");
        return onDone(data);
      }

      // const submitData = new FormData();
      // submitData.set("key", this.key);
      // submitData.set("data", data);
      // submitData.set("sender", this.zaloName);
      

      return fetch(this.endpoint, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          key: this.key, 
          data: data,
          sender: this.zaloName,
        })
      })
        .then(async (res) => {
          const jsonRes: JSONResponse = await res.json();
          if (jsonRes.error_code == 0) {
            onDone(jsonRes.data);
          } else {
            onDone(data);
          }
        })
        .catch((e) => {
          console.log("fail to submit data", e);
          onDone(data);
        });
    });
  }

  getLastData() {
    return this.lastData;
  }
}
