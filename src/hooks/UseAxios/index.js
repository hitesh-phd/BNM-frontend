import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { differenceInMilliseconds, fromUnixTime } from "date-fns";

import { API_BASE_URL } from "@/utils/https";
import { selectToken, selectRefreshToken, login } from "@/store/AuthSlice";

const useAxios = () => {
  const authToken = useSelector(selectToken);
  const refreshToken = useSelector(selectRefreshToken);

  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${authToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authToken);
    // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    const isExpired =
      differenceInMilliseconds(fromUnixTime(user.exp), new Date()) < 0;

    if (!isExpired) return req;

    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/users/refresh-token`,
      { refresh: refreshToken }
    );

    dispatch(login(data));

    req.headers.Authorization = `Bearer ${data.data.accessToken}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
