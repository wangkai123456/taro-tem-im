const JMessage = require("./jmessage-wxapplet-sdk-1.4.3.min");
const JIM = new JMessage();

console.log(JIM)
JIM.init({
  appkey: "4f7aef34fb361292c566a1cd",
  random_str: "404",
  signature: "7db047a67a9d7293850ac69d14cc82bf",
  timestamp: 1507882399401
})
  .onSuccess(function (data) {
    console.log("success:" + JSON.stringify(data));
  })
  .onFail(function (data) {
    console.log("error:" + JSON.stringify(data));
  });
