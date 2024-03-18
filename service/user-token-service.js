import axios from "axios";
import sessionStorageService from "../service/session-storage-service";

const userTokenService = {};

userTokenService.sendToken = async (token) => {
  console.log("tryee111");
  user = await sessionStorageService.get("user_id");
  const formData = new FormData();
  formData.append("user_id", user);
  formData.append("token", token);

  response = [];
  const options = {
    method: "POST",
    url: "https://5945-112-134-153-239.ngrok-free.app/fcmToken",
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
