import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { differenceInMilliseconds, fromUnixTime } from "date-fns";
import { API_BASE_URL } from "./https";

const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
const authJson = persistRoot ? JSON.parse(persistRoot?.Auth) : null;
let authTokens = authJson?.token;
const refreshToken = authJson?.refreshToken;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // headers: { Authorization: `Bearer ${authTokens}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) return req;
  const user = jwtDecode(authTokens);

  const isExpired =
    differenceInMilliseconds(fromUnixTime(user.exp), new Date()) < 0;

  if (!isExpired) return req;

  const { data } = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
    refreshToken: refreshToken,
  });

  localStorage.setItem(
    "persist:root",
    JSON.stringify({
      Auth: JSON.stringify({
        ...authJson,
        token: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      }),
    })
  );
  req.headers.Authorization = `Bearer ${data.data.accessToken}`;
  return req;
});

export default axiosInstance;
