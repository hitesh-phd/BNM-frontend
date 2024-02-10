import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileData: {},
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
  },
});

const editProfileAction =
  ({ data, setIsLoading, onSuccess }) =>
  async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/user/api/forget-password/`,
        data: data,
        headers: API_HEADERS,
      });
      successToast(response, "OTP sent successfully to email");
      toNavigate();
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const { setUserProfileData } = ProfileSlice.actions;

export default ProfileSlice.reducer;
