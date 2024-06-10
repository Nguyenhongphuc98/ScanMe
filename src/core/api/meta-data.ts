type JSONResponse = {
  error_code: number;
  data: any;
};

export class MetaData {
  endpoint: string = "";
  lastData: any;

  static _instance: MetaData;

  constructor() {}

  static instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  setEndpoint(url: string) {
    this.endpoint = url;
  }

  getFullData(data: any) {
    return new Promise(resolve => {
      const onDone = (meta) => {
        this.lastData = meta;
        resolve(meta);
      };

      if (this.endpoint == "") {
        console.log("endpoint not set, use default");
        return onDone(data);
      }
  
      const submitData = new FormData();
      submitData.set("data", data);
      submitData.set("sender", "ZaloName");
  
      return fetch(this.endpoint, {
        method: "POST",
        body: submitData,
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
