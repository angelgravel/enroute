// import { Branches, User } from "./../util/types.d";
// import Axios from "axios";
// import { LoginResponse } from "src/util/types";

// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://europe-west2-wrk-butler.cloudfunctions.net/api"
//     : "http://localhost:5000/wrk-butler/europe-west2/api";

// const axios = Axios.create({
//   baseURL,
// });

// export const getIdTokenFromRefreshToken = async (
//   refreshToken: string,
// ): Promise<string | null> => {
//   try {
//     const res = await fetch(
//       `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
//         redirect: "follow",
//       },
//     );
//     const { id_token } = await res.json();
//     return id_token;
//   } catch (error) {
//     console.log("error", error);
//     return null;
//   }
// };

// export const delay = (v, t) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(v), t);
//   });

// // *** AUTH ***
// // TODO: If res.status = 403, log user out
// export const setToken = (token: string) => {
//   localStorage.setItem("token", token);
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// export const unsetToken = () => {
//   localStorage.removeItem("token");
//   delete axios.defaults.headers.common["Authorization"];
// };

// export const doValidate = () => axios.get("/validate").then((res) => res.data);

// export const doLogin = (email: string, password: string) =>
//   axios.post("/login", { email, password }).then((res) => res.data);

// export const doRegister = (data) =>
//   axios.post("/signup/company", data).then((res) => res.data as LoginResponse);

// export const doUpdateProfile = (companyId, data) =>
//   axios.patch(`/companies/${companyId}`, data);

// export const updateAvatar = async (avatarUrl: string, companyId: string) => {
//   return axios
//     .post(
//       "/image",
//       { avatarUrl, companyId },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     )
//     .then((res) => res.data);
// };

// // *** ADS ***
// export const doGetAds = (ids: string[] = []) =>
//   axios
//     .get(`/jobs${ids.length !== 0 ? `?ids=${ids.join(",")}` : ""}`)
//     .then((res) => res.data);

// export const doGetAd = (adID: string) =>
//   axios.get(`/jobs/${adID}`).then((res) => res.data);

// export const doActivateAd = (id: string) => axios.patch(`/jobs/${id}/activate`);

// export const doDenyAd = (id: string) => axios.patch(`/jobs/${id}/deny`);

// // *** USERS ***
// export const doGetUser = (ID: string): Promise<User> =>
//   axios.get(`/users/${ID}`).then((res) => res.data);

// export const doAcceptUser = (adId: string, userId: string) =>
//   axios
//     .post(`/jobs/${adId}/acceptApplicant`, { userId })
//     .then((res) => res.data);

// export const doRejectUser = (adId: string, userId: string) =>
//   axios.post(`/jobs/${adId}/rejectApplicant`, { userId });

// // *** BRANCHES ***
// export const doGetBranches = (): Promise<Branches> =>
//   axios.get("/branches").then((res) => res.data);

// export const doActivateBranch = (branch) =>
//   axios
//     .patch(`/branches/${branch}/activate`, { active: false })
//     .then((res) => res.data);

// export const doDeactivateBranch = (branch) =>
//   axios
//     .patch(`branches/${branch}/deactivate`, { active: true })
//     .then((res) => res.data);

// // *** COMPANIES ***
// export const doGetCompanies = () =>
//   axios.get("/companies").then((res) => res.data);
// export const doGetCompany = (id) =>
//   axios.get(`/companies/${id}`).then((res) => res.data);

// // *** CHATS ***
// export const doSendMessage = (chatId: string, data: string) =>
//   axios.post(
//     `/chats/${chatId}`,
//     { body: data },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );

// export { axios };

// eslint-disable-next-line import/no-anonymous-default-export
export default null;
