import axios from "axios";
import sessionStorageService from "../service/session-storage-service";
import Constants from "expo-constants";
import ReactNativeBlobUtil from "react-native-blob-util";

const footageService = {};
let dirs = ReactNativeBlobUtil.fs.dirs;
footageService.download = async (fileName) => {
  return ReactNativeBlobUtil.config({
    path: dirs.DownloadDir + "/SPS/" + fileName,
  })
    .fetch(
      "GET",
      Constants.expoConfig.raspberryApiUrl + "/downloadVideo/" + fileName,
      {}
    )
    .catch((err) => {
      console.error(err);
    });
};

footageService.fileName = async (reservaionId) => {
  userId = await sessionStorageService.get("user_id");

  response = [];
  const options = {
    method: "GET",
    url: Constants.expoConfig.apiUrl + "/footageFileName/" + reservaionId,
  };

  try {
    response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default footageService;
