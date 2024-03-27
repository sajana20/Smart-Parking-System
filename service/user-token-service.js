import axios from "axios";
import sessionStorageService from "../service/session-storage-service";
import Constants from "expo-constants";


const userTokenService = {};

userTokenService.sendToken = async (token) => {
  user = await sessionStorageService.get("user_id");
  const formData = new FormData();
  formData.append("user_id", user);
  formData.append("token", token);

  response = [];
  const options = {
    method: "POST",
    url: Constants.expoConfig.apiUrl + "/fcmToken",
    data: formData,
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  try {
    response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default userTokenService;
