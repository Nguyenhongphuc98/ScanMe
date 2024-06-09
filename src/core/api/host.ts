// import { ConnectInfo } from "../type";
// import { HOST_INFO } from "./const";


// export function getLastHost() {
//   const rawInfo = localStorage.getItem(HOST_INFO);

//   if (!rawInfo) {
//     return null;
//   }

//   try {
//     const host = JSON.parse(rawInfo);
//     return host;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export function saveLastHost(host: ConnectInfo) {
//   const storedData =JSON.stringify(host);
//   localStorage.setItem(HOST_INFO, storedData);
// }

// const postData = async () => {
//   const data = { a: "aaaaaaa" };
//   const response = await fetch(
//     " https://9302-125-235-239-109.ngrok-free.app",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   const result = await response.text();
//   console.log("Success:", result);
// };