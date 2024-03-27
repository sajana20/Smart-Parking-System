import axios from "axios";
import Constants from "expo-constants";

const userReservationService = {};

userReservationService.getBookingDetails = async (userId) => {
  const options = {
    method: "GET",
    url: Constants.expoConfig.apiUrl + "/reservations/" + userId,
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    alert("Load Booking Details Error.Please Try again");
    return null;
  }
};

export default userReservationService;
