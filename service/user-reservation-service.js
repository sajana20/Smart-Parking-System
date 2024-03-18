import axios from "axios";
import Constants from "expo-constants";

const userReservationService = {};

userReservationService.reservaion = async (userId, slotId, video_data) => {
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

  userReservationService.getBookingDetails = async (userId) => {
    console.log('fsdfvsd')
    const options = {
      method: "GET",
      url: Constants.expoConfig.apiUrl + "/reservations/"+userId,
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
  
    try {
      const response = await axios.request(options);
      console.log("dataaaaa")
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log("error", error);
      alert("Load Booking Details Error.Please Try again");
      return null;
    }
  };

export default userReservationService;