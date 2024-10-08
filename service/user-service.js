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
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    alert("Registration failed, Please Try again");
    return null;
  }
};

export default userService;
