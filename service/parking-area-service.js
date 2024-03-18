// import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

const parkingAreaService = {};

// parkingAreaService.getTotalAvailability = (endpoint, query) => {

//     const [data, setData] = useState([])
//     const [error, setError] = useState(null)

//     const options = {
//         method: 'GET',
//         url: 'https://sss.com/${endpoint}',
//         params: {...query},
//     };

//     const fetchData = async () => {
//         try {
//             const response = await axios.request(options)
//             setData(response.data.data);

//         }catch (error) {
//             setError(error);
//             alert('There is an error')

//         }
//     }

//     useEffect(() => {
//         fetchData();

//     })

//     return {data}
// }

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
