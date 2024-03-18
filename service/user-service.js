import axios from "axios";
import Constants from "expo-constants";

const userService = {};

userService.login = async (email, password) => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);

  response = [];
  const options = {
    method: "POST",
    url: Constants.expoConfig.apiUrl + "/login",
    data: formData,
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  try {
    response = await axios.request(options);
    return response.data;
  } catch (error) {
    if (error.response.status == 401) {
      alert("Invalid credentials ");
    } else {
      console.log(error);
      alert("Login failed, Please Try again");
    }
    return null;
  }
};

userService.logout = async (id) => {
  const formData = new FormData();
  formData.append("user_id", id);

  const options = {
    method: "DETELE",
    url: Constants.expoConfig.apiUrl + "/logout",
    data: formData,
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  try {
    await axios.request(options);
  } catch (error) {
    alert("Logout failed, Please Try again");
  }
};

userService.register = async (userName, email, password) => {
  const formData = new FormData();
  formData.append("user_name", userName);
  formData.append("email", email);
  formData.append("password", password);

  const options = {
    method: "POST",
    url: Constants.expoConfig.apiUrl + "/signup",
    data: formData,
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  try {
    // show response to the user (Successfully added)
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    alert("Registration failed, Please Try again");
    return null;
  }
};

userService.reservaion = async (userId, slotId, video_data) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("slotId", slotId);
    formData.append("video_data", video_data);
  
    const options = {
      method: "POST",
      url: Constants.expoConfig.apiUrl + "/reservaion",
      data: formData,
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log("error", error);
      alert("Reservaion failed, Please Try again");
      return null;
    }
  };

export default userService;
