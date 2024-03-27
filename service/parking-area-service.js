// import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

const parkingAreaService = {};


parkingAreaService.updateSlotAvailability = async (userId, slotId, availability) => {
  let response = {};
  const formData = new FormData();

  formData.append("user_id", userId);
  formData.append("slot_id", slotId);
  formData.append("availability", availability);

  const options = {
    method: "POST",
    url: Constants.expoConfig.apiUrl + "/availability",
    data: formData,
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  try {
    response = await axios.request(options);
  } catch (error) {
    console.log(error)

    alert("There is an Error");
  }
};

parkingAreaService.getparkingAvailability = async () => {
  response = [];

  const options = {
    method: "GET",
    url: Constants.expoConfig.apiUrl + "/availability",
  };
  try {
    response = await axios.request(options);
  } catch (error) {
    alert("There is an error");
  }

  return response.data;
};

export default parkingAreaService;
